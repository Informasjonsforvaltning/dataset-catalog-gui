import React from 'react';
import { CardGroup } from 'reactstrap';

import AuthService from '../../services/auth';

import Translation from '../../components/translation';
import Catalog from './catalogs/catalog.component';
import { Variant } from '../../components/banner';
import { selectorForCatalogDatasetsFromDatasetsState } from '../../entrypoints/main/redux/modules/datasets';

import './catalogs-page.scss';

import SC from './styled';

interface Props {
  catalogItems: any[];
  isFetchingCatalogs: boolean;
  datasetsState: any;
  fetchCatalogsIfNeeded: () => void;
  fetchDatasetsIfNeeded: () => void;
}

export const CatalogsPagePure = ({
  isFetchingCatalogs = false,
  fetchCatalogsIfNeeded,
  catalogItems,
  datasetsState,
  fetchDatasetsIfNeeded
}: Props) => {
  fetchCatalogsIfNeeded && fetchCatalogsIfNeeded();

  if (isFetchingCatalogs) {
    return null;
  }

  return (
    <div className='container'>
      {catalogItems &&
        catalogItems.map(({ id, publisher }) => {
          const termsAccepted = AuthService.hasAcceptedLatestTermsAndConditions(
            id
          );
          return (
            <div key={id} className='row mb-2 mb-md-5'>
              <div className='col-12'>
                <div className='mb-3'>
                  <h2 className='fdk-text-strong mb-3'>
                    {publisher?.prefLabel ? (
                      <Translation object={publisher?.prefLabel} />
                    ) : (
                      publisher?.name || ''
                    )}
                  </h2>
                  {AuthService.hasOrganizationReadPermission(id) &&
                    termsAccepted && (
                      <a href={`/terms-and-conditions/${id}`}>
                        Bruksvilkår
                        <i className='fa fa-external-link fdk-fa-right' />
                      </a>
                    )}
                </div>
                {AuthService.hasOrganizationReadPermission(id) &&
                  !termsAccepted && (
                    <SC.Banner variant={Variant.WARNING}>
                      <a href={`/terms-and-conditions/${id}`}>Bruksvilkår</a>{' '}
                      for denne organisasjonen er ikke godkjent. Du har ikke
                      tilgang til katalogene før du eller en annen bemyndiget
                      person i din virksomhet har akseptert vilkårene.
                    </SC.Banner>
                  )}
                <CardGroup>
                  {datasetsState && (
                    <Catalog
                      key={`datasets-${id}`}
                      catalogId={id}
                      type='datasets'
                      fetchItems={fetchDatasetsIfNeeded}
                      itemsCount={
                        Object.keys(
                          selectorForCatalogDatasetsFromDatasetsState(id)(
                            datasetsState
                          )
                        ).length
                      }
                      disabled={
                        !AuthService.hasSystemAdminPermission() &&
                        !termsAccepted
                      }
                    />
                  )}
                  <Catalog
                    key={`dataservices-${id}`}
                    catalogId={id}
                    type='dataservices'
                    disabled={
                      !AuthService.hasSystemAdminPermission() && !termsAccepted
                    }
                  />
                  <Catalog
                    key={`concepts-${id}`}
                    catalogId={id}
                    type='concepts'
                    disabled={
                      !AuthService.hasSystemAdminPermission() && !termsAccepted
                    }
                  />
                  <Catalog
                    key={`protocol-${id}`}
                    catalogId={id}
                    type='protocol'
                    disabled={
                      !AuthService.hasSystemAdminPermission() && !termsAccepted
                    }
                  />
                </CardGroup>
              </div>
            </div>
          );
        })}
      {!catalogItems && (
        <div className='row mb-2 mb-md-5'>
          <div id='no-catalogs'>
            <h1 className='fdk-text-strong'>
              <Translation id='catalogs.missingCatalogs.title' />
            </h1>
            <div className='mt-2 mb-2'>
              <Translation id='catalogs.missingCatalogs.ingress' />
            </div>
            <div className='fdk-text-size-small'>
              <strong>
                <Translation id='catalogs.missingCatalogs.accessTitle' />
              </strong>
              <p>
                <a href='https://data.norge.no/about-registration'>
                  <Translation id='catalogs.missingCatalogs.accessText' />
                  <i className='fa fa-external-link fdk-fa-right' />
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
