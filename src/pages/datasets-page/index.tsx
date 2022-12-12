import React, { FC, lazy, Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import SC from './styled';
import Button from '../../components/inputs/button';
import Search from '../../components/dataset-search';
import Spinner from '../../components/spinner';
import Icon from '../../components/icon';
import { localization } from '../../utils/language/localization';
import { useDatasetsContext, useDatasetsDispatch } from '../../context/datasets-context';
import { Colour, theme } from '@fellesdatakatalog/theme';
import { ACTION_TYPE } from '../../context/actions';

const Table = lazy(() => delayForDemo(import('./populated-table')));

const DatasetsPage: FC = () => {
  let pageSubtitle = 'Uten navn';
  const datasetsContext = useDatasetsContext();
  const navigate = useNavigate();
  const location = useLocation();

  if (datasetsContext.datasets?.length && datasetsContext.datasets?.length > 0)
    pageSubtitle = datasetsContext.datasets[0]?.publisher.name;

  const { catalogId } = useParams();
  const datasetsDispatch = useDatasetsDispatch();

  useEffect(() => {
    if (catalogId) datasetsDispatch({ type: ACTION_TYPE.ADD_CATALOG_ID, payload: catalogId });
  }, [catalogId]);

  const onCreateDatasetClick = () => {
    datasetsDispatch({ type: ACTION_TYPE.CREATE_DATASET, payload: { catalogId: catalogId ?? '' } });
  };

  if (datasetsContext.newlyCreatedDatasetPromise) {
    console.log('Its true');
    navigate(`${location}/${datasetsContext.newlyCreatedDataset.id}`);
  }

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
            onClick={onCreateDatasetClick}
          />
          <SC.HostButton
            disabled={true}
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
