package no.dcat.controller;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import no.dcat.model.ApiRegistration;
import no.dcat.model.ApiRegistrationFactory;
import no.dcat.service.ApiCatService;
import no.dcat.service.ApiRegistrationRepository;
import no.dcat.service.CatalogRepository;
import no.dcat.service.InformationmodelCatService;
import no.fdk.acat.bindings.ApiCatBindings;
import no.fdk.imcat.bindings.InformationmodelCatBindings;
import no.fdk.webutils.exceptions.BadRequestException;
import no.fdk.webutils.exceptions.NotFoundException;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping(value = "/catalogs/{catalogId}/apis")
public class ApiRegistrationController {

    private static Logger logger = LoggerFactory.getLogger(ApiRegistrationController.class);

    private ApiRegistrationRepository apiRegistrationRepository;
    private CatalogRepository catalogRepository;
    private ApiCatBindings apiCat;
    private InformationmodelCatBindings informationmodelCat;
    private ApiRegistrationFactory apiRegistrationFactory;

    @Autowired
    public ApiRegistrationController(
        ApiRegistrationRepository apiRegistrationRepository,
        CatalogRepository catalogRepository,
        ApiCatService apiCatService,
        InformationmodelCatService informationmodelCatService,
        ApiRegistrationFactory apiRegistrationFactory
    ) {
        this.apiRegistrationRepository = apiRegistrationRepository;
        this.catalogRepository = catalogRepository;
        this.apiCat = apiCatService;
        this.informationmodelCat = informationmodelCatService;
        this.apiRegistrationFactory = apiRegistrationFactory;
    }

    /**
     * Return list of all apiRegistrations in catalog.
     *
     * @param catalogId the id of the catalog
     * @param pageable
     * @return List of api registrations
     */
    @PreAuthorize("hasPermission(#catalogId, 'write')")
    @CrossOrigin
    @RequestMapping(value = "", method = GET, produces = APPLICATION_JSON_UTF8_VALUE)
    public PagedResources<ApiRegistration> listApiRegistrations(
        @PathVariable("catalogId") String catalogId,
        Pageable pageable,
        PagedResourcesAssembler assembler
    ) {
        Page<ApiRegistration> apiRegistrations = apiRegistrationRepository.findByCatalogId(catalogId, pageable);

        return assembler.toResource(apiRegistrations);
    }

    /**
     * Get apiRegistration by Id
     *
     * @param id Identifier of apiRegistration
     * @return complete apiRegistration
     */
    @PreAuthorize("hasPermission(#catalogId, 'write')")
    @CrossOrigin
    @RequestMapping(value = "/{id}", method = GET, produces = APPLICATION_JSON_UTF8_VALUE)
    public ApiRegistration getApiRegistration(
        @PathVariable("catalogId") String catalogId,
        @PathVariable("id") String id
    ) throws NotFoundException {
        return getApiRegistrationByIdAndCatalogId(id, catalogId);
    }

    /**
     * Create new apiRegistration in catalog. Id for the apiRegistration is created automatically.
     *
     * @param apiRegistrationData
     * @return ApiRegistration
     */
    @PreAuthorize("hasPermission(#catalogId, 'write')")
    @CrossOrigin
    @RequestMapping(
        value = "",
        method = POST,
        consumes = APPLICATION_JSON_VALUE,
        produces = APPLICATION_JSON_UTF8_VALUE)
    public ApiRegistration createApiRegistration(
        @PathVariable("catalogId") String catalogId,
        @RequestBody ApiRegistration apiRegistrationData
    ) throws NotFoundException, BadRequestException {

        logger.info("SAVE requestbody apiRegistration");

        catalogRepository.findById(catalogId).orElseThrow(NotFoundException::new);

        ApiRegistration apiRegistration = apiRegistrationFactory.createApiRegistration(catalogId);

        try {
            String apiSpecUrl = apiRegistrationData.getApiSpecUrl();
            String apiSpec = apiRegistrationData.getApiSpec();

            if (!StringUtils.isEmpty(apiSpecUrl)) {
                apiRegistrationFactory.setApiSpecificationFromSpecUrl(apiRegistration, apiSpecUrl);
            } else if (!StringUtils.isEmpty(apiSpec)) {
                apiRegistrationFactory.setApiSpecificationFromSpec(apiRegistration, apiSpec);
            }
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
        logger.debug("create apiRegistration {}", apiRegistration.getId());

        ApiRegistration savedApiRegistration = apiRegistrationRepository.save(apiRegistration);

        apiCat.triggerHarvestApiRegistration(savedApiRegistration.getId());
        informationmodelCat.triggerHarvestApiRegistration(savedApiRegistration.getId());

        return savedApiRegistration;
    }

    /**
     * Delete apiRegistration
     *
     * @param id Identifier of apiRegistration
     * @return HTTP status 204 NO CONTENT is returned if apiRegistration was successfully deleted. If
     * apiRegistration is not found, HTTP 404 Not found is returned
     */
    @PreAuthorize("hasPermission(#catalogId, 'write')")
    @CrossOrigin
    @RequestMapping(value = "/{id}", method = DELETE, produces = APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteApiRegistration(
        @PathVariable("catalogId") String catalogId,
        @PathVariable("id") String id
    ) throws NotFoundException, BadRequestException {
        logger.info("DELETE apiRegistration: " + id);

        ApiRegistration apiRegistration = getApiRegistrationByIdAndCatalogId(id, catalogId);

        if (apiRegistration.getRegistrationStatus().equals(ApiRegistration.REGISTRATION_STATUS_PUBLISH)) {
            throw new BadRequestException();
        }

        apiRegistrationRepository.delete(apiRegistration);

        apiCat.triggerHarvestApiRegistration(id);
        informationmodelCat.triggerHarvestApiRegistration(id);
    }

    /**
     * Modify apiRegistration in catalog.
     *
     * @param updates Objects in apiRegistration to be updated
     * @return apiRegistration
     */
    @PreAuthorize("hasPermission(#catalogId, 'write')")
    @CrossOrigin
    @RequestMapping(
        value = "/{id}",
        method = PATCH,
        consumes = APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ApiRegistration patchApiRegistration(
        @PathVariable("catalogId") String catalogId,
        @PathVariable("id") String id,
        @RequestBody Map<String, Object> updates)
        throws NotFoundException {
        logger.info("PATCH requestbody update apiRegistration: {}", updates.toString());

        Gson gson = new Gson();

        // get already saved apiRegistration
        ApiRegistration oldApiRegistration = getApiRegistrationByIdAndCatalogId(id, catalogId);

        JsonObject oldApiRegistrationJson = gson.toJsonTree(oldApiRegistration).getAsJsonObject();

        updates.forEach((key, newValue) -> {
            logger.debug("update key: {} value: ", key, newValue);
            JsonElement jsonValue = gson.toJsonTree(newValue);
            oldApiRegistrationJson.add(key, jsonValue); // JsonObject.add actually replaces value
        });

        logger.debug("Changed apiRegistration Json element: {}", oldApiRegistrationJson.toString());

        ApiRegistration apiRegistration =
            gson.fromJson(oldApiRegistrationJson.toString(), ApiRegistration.class);

        String apiSpecUrl = updates.get("apiSpecUrl") == null ? null : updates.get("apiSpecUrl").toString();
        String apiSpec = updates.get("apiSpec") == null ? null : updates.get("apiSpec").toString();

        if (!StringUtils.isEmpty(apiSpecUrl)) {
            apiRegistrationFactory.setApiSpecificationFromSpecUrl(apiRegistration, apiSpecUrl);
        } else if (!StringUtils.isEmpty(apiSpec)) {
            apiRegistrationFactory.setApiSpecificationFromSpec(apiRegistration, apiSpec);
        }

        apiRegistration.set_lastModified(new Date());

        ApiRegistration savedApiRegistration = apiRegistrationRepository.save(apiRegistration);

        apiCat.triggerHarvestApiRegistration(id);
        informationmodelCat.triggerHarvestApiRegistration(id);


        return savedApiRegistration;
    }

    ApiRegistration getApiRegistrationByIdAndCatalogId(String id, String catalogId) throws NotFoundException {
        return apiRegistrationRepository
            .findById(id)
            .filter(r -> catalogId.equals(r.getCatalogId()))
            .orElseThrow(NotFoundException::new);
    }
}
