import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import { CardGroup } from 'reactstrap';
import Link from '@fellesdatakatalog/link';
import Breadcrumbs, { Breadcrumb } from '@fellesdatakatalog/breadcrumbs';

import {
  Enum_Servicemessage_Channel,
  ServiceMessage,
  useGetServiceMessagesQuery
} from '../../../../../../services/api/strapi/generated/graphql';

import env from '../../../../../../env';

import { withAuth } from '../../../../../../providers/auth';
import { authService } from '../../../../../../services/auth/auth-service';

import withCatalogs, {
  Props as CatalogsProps
} from '../../../../../../components/with-catalogs';

import Translation from '../../../../../../components/translation';
import Catalog from '../../../../../../components/catalog';
import { Variant } from '../../../../../../components/banner';
import ServiceMessages from '../../../../../../components/service-messages';

import SC from './styled';

const { FDK_REGISTRATION_BASE_URI } = env;

interface Props extends CatalogsProps {}

const OverviewPage: FC<Props> = ({
  catalogs,
  isLoadingCatalogs,
  catalogsActions: { listCatalogsRequested: listCatalogs }
}) => {
  const { data } = useGetServiceMessagesQuery({
    variables: {
      channel: Enum_Servicemessage_Channel.Registreringsportal,
      today: new Date(new Date().toUTCString())
    }
  });
  const serviceMessages = data?.serviceMessages as ServiceMessage[];

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    listCatalogs(1000);

    setIsMounted(true);

    return function cleanup() {
      setIsMounted(false);
    };
  }, []);

  const isLoading = !isMounted || isLoadingCatalogs;

  const hasAcceptedTerms = (id: string) =>
    authService.hasAcceptedLatestTermsAndConditions(id);

  return (
    <>
      {serviceMessages?.length > 0 && (
        <ServiceMessages serviceMessages={serviceMessages} />
      )}
      <Breadcrumbs as={SC.Breadcrumbs}>
        <Breadcrumb>
          <a href={FDK_REGISTRATION_BASE_URI}>
            <Translation id='breadcrumbs.home' />
          </a>
        </Breadcrumb>
        <Breadcrumb active>
          <Translation id='catalogs.title' />
        </Breadcrumb>
      </Breadcrumbs>
      <SC.Page>
        {catalogs?.map(({ id, publisher }) => (
          <div key={id} className='row mb-2 mb-md-5'>
            <div className='col-12'>
              <div className='mb-3'>
                <SC.CatalogTitle>
                  {publisher?.prefLabel ? (
                    <Translation object={publisher?.prefLabel} />
                  ) : (
                    publisher?.name || (
                      <Translation id='catalogs.missingTitle' />
                    )
                  )}
                </SC.CatalogTitle>
                {authService.hasOrganizationReadPermission(id) &&
                  hasAcceptedTerms(id) && (
                    <SC.TermsLink href={`/terms-and-conditions/${id}`} external>
                      Bruksvilkår
                    </SC.TermsLink>
                  )}
              </div>
              {authService.hasOrganizationReadPermission(id) &&
                !hasAcceptedTerms(id) && (
                  <SC.Banner variant={Variant.WARNING}>
                    Alle virksomheter må godta bruksvilkår før de kan registrere
                    data i Felles datakatalog. Les mer om bruksvilkårene og
                    aksepter her:{' '}
                    <Link href={`/terms-and-conditions/${id}`} external>
                      Bruksvilkår
                    </Link>
                  </SC.Banner>
                )}
              <CardGroup>
                <Catalog
                  key={`datasets-${id}`}
                  catalogId={id}
                  type='datasets'
                  disabled={
                    !authService.hasSystemAdminPermission() &&
                    !hasAcceptedTerms(id)
                  }
                />
              </CardGroup>
            </div>
          </div>
        ))}
        {!isLoading && catalogs.length === 0 && (
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
      </SC.Page>
    </>
  );
};

export default compose<FC>(memo, withAuth, withCatalogs)(OverviewPage);
