import React, { FC, lazy, Suspense, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import SC from './styled';
import { localization } from '../../utils/language/localization';
import Button from '../../components/inputs/button';
import Search from '../../components/dataset-search';
import { useDatasetsContext, useDatasetsDispatch } from '../../context/datasets-context';
import Spinner from '../../components/spinner';
import Icon from '../../components/icon';
import { Colour, theme } from '@fellesdatakatalog/theme';
import { ACTION_TYPE } from '../../context/actions';

const Table = lazy(() => delayForDemo(import('./populated-table')));

const DatasetsPage: FC = () => {
  const datasetsContext = useDatasetsContext();
  const pageSubtitle = datasetsContext.datasets[0]?.publisher.name ?? '';

  const { catalogId } = useParams();
  const datasetsDispatch = useDatasetsDispatch();

  useEffect(() => {
    if (catalogId) {
      datasetsDispatch({ type: ACTION_TYPE.ADD_CATALOG_ID, payload: catalogId });
    }
  }, [catalogId]);

  return (
    <>
      <SC.Page>
        <SC.Title>{localization.catalogType}</SC.Title>
        <SC.SubTitle>{pageSubtitle}</SC.SubTitle>
        <SC.AddDiv>
          <Button
            btnType='filled'
            bg={theme.colour(Colour.BLUE, 'B60')}
            btnColor={theme.colour(Colour.NEUTRAL, 'N0')}
            name={localization.button.addDataset}
            startIcon={<Icon name='circlePlusStroke' />}
          />
          <SC.HostButton
            btnType='filled'
            btnColor={theme.colour(Colour.BLUE, 'B60')}
            bg={theme.colour(Colour.BLUE, 'B30')}
            name={localization.button.hostDataset}
            startIcon={<Icon name='arrowDownStroke' />}
          />
        </SC.AddDiv>
        <Search />
        <Suspense fallback={<Spinner />}>
          <Table />
        </Suspense>
      </SC.Page>
      <Outlet />
    </>
  );
};

export default DatasetsPage;

// fake delay
const delayForDemo = async (promise: Promise<typeof import('./populated-table')>) => {
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  return promise;
};
