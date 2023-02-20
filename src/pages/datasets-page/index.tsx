import React, { FC, lazy, Suspense, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import SC from './styled';
import DropDown from '../../components/inputs/dropdown';
import Search from '../../components/dataset-search';
import Spinner from '../../components/spinner';
import { localization } from '../../utils/language/localization';
import { useDatasetsContext, useDatasetsDispatch } from '../../context/datasets-context';
import { Colour, theme } from '@fellesdatakatalog/theme';
import { ACTION_TYPE } from '../../context/actions';
import env from '../../utils/constants/env';

const { FDK_REGISTRATION_BASE_URI } = env;
const Table = lazy(() => delayTableLoad(import('./populated-table')));

const delayTableLoad = async (promise: Promise<typeof import('./populated-table')>) => {
  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });
  return promise;
};

const DatasetsPage: FC = () => {
  let pageSubtitle = 'Mangler tittel';
  const datasetsContext = useDatasetsContext();

  if (datasetsContext.datasets?.length && datasetsContext.datasets?.length > 0)
    pageSubtitle = datasetsContext.datasets[0]?.publisher.name;

  const { catalogId } = useParams();
  const datasetsDispatch = useDatasetsDispatch();

  useEffect(() => {
    if (catalogId) datasetsDispatch({ type: ACTION_TYPE.ADD_CATALOG_ID, payload: catalogId });
  }, [catalogId]);

  if (datasetsContext.newlyCreatedDatasetPromise) {
    datasetsContext.newlyCreatedDatasetPromise
      .then(dataset => {
        datasetsDispatch({ type: ACTION_TYPE.ADD_DATASET, payload: { dataset } });
        window.location.href = `${FDK_REGISTRATION_BASE_URI}/dataset-catalogs/${catalogId}/datasets/${dataset.id}`;
      })
      .catch(error => console.error('ADD_DATASET failed!', error));
  }

  const onCreateDatasetClick = () => {
    datasetsDispatch({ type: ACTION_TYPE.CREATE_DATASET, payload: { catalogId: catalogId ?? '' } });
  };

  const onCreateDatasetSeriesClick = () => {
    datasetsDispatch({ type: ACTION_TYPE.CREATE_DATASET_SERIES, payload: { catalogId: catalogId ?? '' } });
  };

  const options = [
    { name: localization.dropdown.descriptionDataset, value: 'dataset' },
    { name: localization.dropdown.descriptionDatasetSerie, value: 'datasetSeries' },
  ];

  const handleSelect = (chosenValue: any) => {
    chosenValue === 'datasetSeries' ? onCreateDatasetSeriesClick() : onCreateDatasetClick();
  };

  return (
    <>
      <SC.Page>
        <SC.Title>{localization.catalogType}</SC.Title>
        <SC.SubTitle>{pageSubtitle}</SC.SubTitle>
        <SC.AddDiv>
          <DropDown
            name={localization.dropdown.addNew}
            dropDownType='add'
            bg={theme.colour(Colour.BLUE, 'B60')}
            dropdownColor={theme.colour(Colour.NEUTRAL, 'N0')}
            options={options}
            onDropdownSelect={chosenValue => handleSelect(chosenValue)}
          />

          {/* Funksjonalitet, navn, og design av denne knappen skal diskuteres videre. kommenteres ut inntil videre. */}

          {/* <SC.HostButton
            disabled={true}
            btnType='filled'
            btnColor={theme.colour(Colour.BLUE, 'B60')}
            bg={theme.colour(Colour.BLUE, 'B30')}
            name={localization.button.hostDataset}
            startIcon={<Icon name='arrowDownStroke' />}
          /> */}
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
