import React from 'react';
import { CardGroup } from 'reactstrap';
import localization from '../../services/localization';
import { Catalog } from './catalogs/catalog.component';
import { Variant } from '../../components/banner';
import { getTranslateText } from '../../services/translateText';
import { selectorForCatalogDatasetsFromDatasetsState } from '../../redux/modules/datasets';
import { getAPIItemsCount } from '../../redux/modules/apis';
import './catalogs-page.scss';
import { authService } from '../../services/auth/auth-service';
import { Namespace } from '../../enums';
import { getConfig } from '../../config';

import SC from './styled';

interface Props {
  catalogItems: any[];
  isFetchingCatalogs: boolean;
  datasetsState: any;
  apis: any;
  fetchCatalogsIfNeeded: () => void;
  fetchDatasetsIfNeeded: () => void;
  fetchApisIfNeeded: () => void;
}

export const CatalogsPagePure = ({
  isFetchingCatalogs = false,
  fetchCatalogsIfNeeded,
  catalogItems,
  datasetsState,
  apis,
  fetchDatasetsIfNeeded,
  fetchApisIfNeeded
}: Props) => {
  fetchCatalogsIfNeeded && fetchCatalogsIfNeeded();

  if (isFetchingCatalogs) {
    return null;
  }

  return (
    <div className="container">
      {catalogItems &&
        catalogItems.map(({ id, publisher }) => {
          const termsAccepted = authService.hasAcceptedLatestTermsAndConditions(
            id
          );
          return (
            <div key={id} className="row mb-2 mb-md-5">
              <div className="col-12">
                <div className="mb-3">
                  <h2 className="fdk-text-strong mb-3">
                    {getTranslateText(publisher?.prefLabel) ||
                      publisher?.name ||
                      ''}
                  </h2>
                  {termsAccepted && (
                    <a href={`/terms-and-conditions/${id}`}>
                      Bruksvilkår
                      <i className="fa fa-external-link fdk-fa-right" />
                    </a>
                  )}
                </div>
                {!termsAccepted && (
                  <SC.Banner variant={Variant.WARNING}>
                    <a href={`/terms-and-conditions/${id}`}>Bruksvilkår</a> for
                    denne organisasjonen er ikke godkjent. Du har ikke tilgang
                    til katalogene før en bemyndiget person hos
                    Digitaliseringsdirektoratet har akseptert vilkårene.
                  </SC.Banner>
                )}
                <CardGroup>
                  {datasetsState && (
                    <Catalog
                      key={`datasets-${id}`}
                      catalogId={id}
                      type="datasets"
                      fetchItems={fetchDatasetsIfNeeded}
                      itemsCount={
                        Object.keys(
                          selectorForCatalogDatasetsFromDatasetsState(id)(
                            datasetsState
                          )
                        ).length
                      }
                      disabled={!termsAccepted}
                    />
                  )}
                  {apis && (
                    <Catalog
                      key={`apis-${id}`}
                      catalogId={id}
                      fetchItems={fetchApisIfNeeded}
                      type="apis"
                      itemsCount={getAPIItemsCount(apis, id)}
                      isReadOnly={
                        !authService.hasOrganizationWritePermission(id)
                      }
                      disabled={!termsAccepted}
                    />
                  )}
                  <Catalog
                    key={`concepts-${id}`}
                    catalogId={id}
                    type="concepts"
                    disabled={!termsAccepted}
                  />
                  <Catalog
                    key={`protocol-${id}`}
                    catalogId={id}
                    type="protocol"
                    isReadOnly={
                      !authService.hasOrganizationWritePermission(id) ||
                      getConfig().namespace === Namespace.PRODUCTION
                    }
                    disabled={!termsAccepted}
                  />
                </CardGroup>
              </div>
            </div>
          );
        })}
      {!catalogItems && (
        <div className="row mb-2 mb-md-5">
          <div id="no-catalogs">
            <h1 className="fdk-text-strong">
              {localization.catalogs.missingCatalogs.title}
            </h1>
            <div className="mt-2 mb-2">
              {localization.catalogs.missingCatalogs.ingress}
            </div>
            <div className="fdk-text-size-small">
              <strong>
                {localization.catalogs.missingCatalogs.accessTitle}
              </strong>
              <p>
                <a href="https://fellesdatakatalog.brreg.no/about-registration">
                  {localization.catalogs.missingCatalogs.accessText}
                  <i className="fa fa-external-link fdk-fa-right" />
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
