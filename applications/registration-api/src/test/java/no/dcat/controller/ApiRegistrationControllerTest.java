package no.dcat.controller;

import com.google.gson.Gson;
import no.dcat.model.ApiRegistration;
import no.dcat.model.Catalog;
import no.dcat.service.ApiCatService;
import no.dcat.service.ApiRegistrationRepository;
import no.dcat.service.CatalogRepository;
import no.dcat.service.InformationmodelCatService;
import no.fdk.test.testcategories.UnitTest;
import no.fdk.acat.common.model.apispecification.ApiSpecification;
import no.fdk.webutils.exceptions.BadRequestException;
import no.fdk.webutils.exceptions.NotFoundException;
import org.apache.commons.io.IOUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.experimental.categories.Category;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@Category(UnitTest.class)
@RunWith(SpringRunner.class)
public class ApiRegistrationControllerTest {

    private ApiRegistrationController apiRegistrationController;
    private String catalogId = "1234";
    private Resource apiResource;

    @Mock
    private CatalogRepository catalogRepository;

    @Mock
    private ApiRegistrationRepository apiRegistrationRepository;

    @Mock
    private ApiCatService apiCatMock;

    @Mock
    private InformationmodelCatService informationmodelCatMock;

    @Before
    public void setup() throws IOException {
        MockitoAnnotations.initMocks(this);

        Catalog catalog = new Catalog();
        catalog.setId(catalogId);
        apiResource = new ClassPathResource("raw-enhet-api.json");
        ApiSpecification apiSpecification =
            new Gson().fromJson(IOUtils.toString(apiResource.getInputStream(), "UTF-8"), ApiSpecification.class);

        when(catalogRepository.findById(anyString())).thenReturn(Optional.of(catalog));
        when(apiCatMock.convertSpecUrlToApiSpecification(apiResource.getURL().toString())).thenReturn(apiSpecification);

        ApiRegistration apiRegData = mock(ApiRegistration.class);
        when(apiRegData.getId()).thenReturn("id");
        when(apiRegistrationRepository.save(any(ApiRegistration.class))).thenAnswer((invocation) -> invocation.getArguments()[0]);

        apiRegistrationController =
            new ApiRegistrationController(apiRegistrationRepository, catalogRepository, apiCatMock, informationmodelCatMock);
    }

    @Test
    public void createApiRegistrationOK() throws Throwable {

        ApiRegistration apiRegData = new ApiRegistration();
        apiRegData.setApiSpecUrl(apiResource.getURL().toString());

        ApiRegistration saved = apiRegistrationController.createApiRegistration(catalogId, apiRegData);

        assertThat(
            saved.getApiSpecification().getInfo().getTitle(),
            is("Åpne Data fra Enhetsregisteret - API Dokumentasjon"));
    }

    @Test(expected = NotFoundException.class)
    public void checkIfCatalogIdNotMatchWillFailWithNotFound() throws NotFoundException, BadRequestException {

        String catalogId = "1234";
        String id = "1234";

        ApiRegistration apiRegistration = new ApiRegistration();
        apiRegistration.setCatalogId(catalogId + "0000");

        when(apiRegistrationRepository.findById(anyString())).thenReturn(Optional.of(apiRegistration));

        apiRegistrationController.deleteApiRegistration(catalogId, id);
    }

    @Test(expected = BadRequestException.class)
    public void checkDeleteApiRegistrationWithStatusPublishedBadRequest()
        throws NotFoundException, BadRequestException {

        String catalogId = "1234";
        String id = "1234";

        ApiRegistration apiRegistration = new ApiRegistration();
        apiRegistration.setCatalogId(catalogId);
        apiRegistration.setRegistrationStatus(ApiRegistration.REGISTRATION_STATUS_PUBLISH);

        when(apiRegistrationRepository.findById(id)).thenReturn(Optional.of(apiRegistration));

        apiRegistrationController.deleteApiRegistration(catalogId, id);
    }

    @Test
    public void checkDeleteApiRegistrationWithStatusDraftOK()
        throws NotFoundException, BadRequestException {

        String catalogId = "1234";
        String id = "1234";

        ApiRegistration apiRegistration = new ApiRegistration();
        apiRegistration.setCatalogId(catalogId);
        apiRegistration.setRegistrationStatus(ApiRegistration.REGISTRATION_STATUS_DRAFT);

        when(apiRegistrationRepository.findById(id)).thenReturn(Optional.of(apiRegistration));

        apiRegistrationController.deleteApiRegistration(catalogId, id);
        doNothing().when(apiRegistrationRepository).delete(apiRegistration);

        verify(apiRegistrationRepository, times(1)).delete(apiRegistration);
        verify(apiCatMock, times(1)).triggerHarvestApiRegistration(id);
    }
}
