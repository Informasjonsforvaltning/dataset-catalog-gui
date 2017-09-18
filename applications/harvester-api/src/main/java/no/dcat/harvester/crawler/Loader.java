package no.dcat.harvester.crawler;

import com.google.common.cache.LoadingCache;
import no.dcat.harvester.HarvesterApplication;
import no.dcat.harvester.crawler.handlers.ElasticSearchResultHandler;
import no.dcat.harvester.crawler.handlers.ElasticSearchResultPubHandler;
import no.difi.dcat.datastore.domain.DcatSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

/**
 * Created by nodavsko on 29.09.2016.
 *
 * 2017.03.17 - Denne har vært midlertidig og har gått utenom fuseki. Det bør den ikke gjøre.
 * Se ny metode load på CrawlerRestController
 */

@Deprecated
public class Loader {

    private static Logger logger = LoggerFactory.getLogger(Loader.class);
  
    private final String hostname;
    private final int port;
    private final String elasticsearchCluster;
    private final String themesHostname;

    String httpUsername;
    String httpPassword;


  
    public Loader(String hostname, int port, String cluster , String themesHostname, String httpUsername, String httpPassword) {
        this.hostname = hostname;
        this.port = port;
        this.elasticsearchCluster = cluster;
        this.themesHostname = themesHostname;
        this.httpUsername = httpUsername;
        this.httpPassword = httpPassword;
    }


    /**
     * Load dataset from file into specified elasticsearch instance
     *
     * @param filename file to be loaded into elasticsearch. Must be a valid DCAT file
     * @return list of strings containing validation result for DCAT file
     */
    public List<String> loadDatasetFromFile(String filename) {
        URL url;
      
        try {

            logger.debug("loadDatasetFromFile: filename: " + filename);
            logger.debug("loadDatasetFromFile: elasticsearch host: " + hostname);
            logger.debug("loadDatasetFromFile: elasticsearch port: " + port);
            logger.debug("loadDatasetFromFile: elasticsearch cluster: " +elasticsearchCluster);

            url = new URL(filename);
            DcatSource dcatSource = new DcatSource("http//dcat.no/test", "Test", url.toString(), "admin_user", "123456789");

            // Load all codes.
            //harvestAllCodes(true);

            //FusekiResultHandler fshandler = new FusekiResultHandler(dcatDataStore, null);
            CrawlerResultHandler esHandler = new ElasticSearchResultHandler(hostname, port, elasticsearchCluster, themesHostname, httpUsername, httpPassword);
            CrawlerResultHandler publisherHandler = new ElasticSearchResultPubHandler(hostname,port, elasticsearchCluster);

            LoadingCache<URL, String> brregCach = HarvesterApplication.getBrregCache();
            CrawlerJob job = new CrawlerJob(dcatSource, null, brregCach, esHandler, publisherHandler);


            Thread crawlerThread = new Thread(job);
            crawlerThread.start();

            //job.run();
            // wait for the job to finish
            crawlerThread.join();

            return job.getValidationResult();

        } catch (MalformedURLException e) {
           logger.error("URL not valid: {} ", filename,e);
        } catch (InterruptedException e) {
            logger.error("Interrupted: {}",e.getMessage());
        Thread.currentThread().interrupt();
    }

        return null;
    }



}
