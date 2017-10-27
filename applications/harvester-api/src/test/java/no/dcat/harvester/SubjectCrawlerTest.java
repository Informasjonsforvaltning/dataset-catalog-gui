package no.dcat.harvester;

import no.dcat.shared.Catalog;
import no.dcat.shared.Dataset;
import no.dcat.shared.Subject;
import no.difi.dcat.datastore.domain.dcat.builders.DcatBuilder;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.riot.RDFDataMgr;
import org.apache.jena.util.FileManager;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.util.Arrays;
import java.util.HashMap;

public class SubjectCrawlerTest {
    private static Logger logger = LoggerFactory.getLogger(SubjectCrawlerTest.class);

    private final String catalogUri = "http://dcat.no/catalog/1234";
    Catalog catalog;

    @Before
    public void setup() {
        Subject subject1 = new Subject();
        subject1.setUri("https://data-david.github.io/Begrep/begrep/Hovedenhet");

        Subject subject2 = new Subject();
        subject2.setUri("https://data-david.github.io/Begrep/begrep/Enhet");

        Subject subject3 = new Subject();
        subject3.setUri("https://data-david.github.io/Begrep/begrep/Organisasjonsnummer");
        subject3.setPrefLabel(new HashMap<>());
        subject3.getPrefLabel().put("no", "Orgid");
        subject3.setDefinition(new HashMap<>());
        subject3.getDefinition().put("no", "organisasjonsnr er et unikt nummer");

        Dataset dataset1 = new Dataset();
        dataset1.setId("1");
        dataset1.setUri(catalogUri+"/datasets/1");
        dataset1.setSubject(Arrays.asList(subject1, subject2));

        Dataset dataset2 = new Dataset();
        dataset2.setId("2");
        dataset2.setUri(catalogUri+"/datasets/2");
        dataset2.setSubject(Arrays.asList(subject3));

        catalog = new Catalog();
        catalog.setId("1234");
        catalog.setUri(catalogUri);
        catalog.setDataset(Arrays.asList(dataset1,dataset2));
    }

    @Test
    public void t1() throws Throwable {
        String modelAsString = DcatBuilder.transform(catalog, "TURTLE");

        Model model = ModelFactory.createDefaultModel();
        model.read(new ByteArrayInputStream(modelAsString.getBytes()), null, "TURTLE");

        SubjectCrawler subjectCrawler = new SubjectCrawler();
        Model actual = subjectCrawler.crawlSubjects(model);

        actual.write(System.out, "TURTLE");

    }
}
