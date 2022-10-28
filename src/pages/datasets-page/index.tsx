import React, { FC, lazy, memo, Suspense } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import SC from './styled';
import { localization } from '../../utils/language/localization';
import Button from '../../components/inputs/button';
import Search from '../../components/dataset-search';
import { useDatasetsContext, useDatasetsDispatch } from '../../context/datasets-context';
import Spinner from '../../components/spinner';
import { ACTION_TYPE } from '../../context/actions';
import Icon from '../../components/icon';
import { Colour, theme } from '@fellesdatakatalog/theme';

const Table = lazy(() => delayForDemo(import('./populated-table')));

const DatasetsPage: FC = () => {
  const { catalogId } = useParams();
  if (catalogId) {
    const datasetsDispatch = useDatasetsDispatch();
    datasetsDispatch({ type: ACTION_TYPE.ADD_CATALOG_ID, payload: catalogId });
  }

  const datasetsState = useDatasetsContext();
  const pageSubtitle = datasetsState.datasets[0]?.publisher.name ?? '';

  return (
    <>
      <SC.Page>
        <SC.Title>{localization.catalogType}</SC.Title>
        <SC.SubTitle>{pageSubtitle}</SC.SubTitle>
        <SC.AddDiv>
          <Button
            type='filled'
            bg={theme.colour(Colour.BLUE, 'B60')}
            color={theme.colour(Colour.NEUTRAL, 'N0')}
            name={localization.button.addDataset}
            startIcon={<Icon name='circlePlusStroke' />}
          />
          <SC.HostButton
            type='filled'
            color={theme.colour(Colour.BLUE, 'B60')}
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

export default memo(DatasetsPage);

// fake delay
const delayForDemo = async (promise: Promise<typeof import('./populated-table')>) => {
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  return promise;
};
