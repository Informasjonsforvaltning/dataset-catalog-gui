import React, { useEffect } from 'react';

import Icon from '../../components/icon';
import Button from '../../components/inputs/button';
import Table from '../../components/table';
import getDate from '../../utils/helpers/date-and-time-formatter';
import getTag from '../../utils/helpers/tag-finder';
import { CellType } from '../../components/table/table-header';
import { ACTION, ACTION_TYPE } from '../../context/actions';
import { useTableContext, useTableDispatch } from '../../context/table-context';
import { Dataset } from '../../utils/types';
import { Props as ColumnProps } from '../../components/table/table-row/row-cell';
import { Props as RowProps } from '../../components/table/table-row';
import { SORT_BY_TYPE, SORT_TYPE } from '../../context/table-context/reducer';
import env from '../../utils/constants/env';
import { useDatasetsContext } from '../../context/datasets-context';

const { FDK_REGISTRATION_BASE_URI } = env;

const PopulatedTable = () => {
  const datasetContext = useDatasetsContext();
  const tableContext = useTableContext();
  const tableDispatch = useTableDispatch();

  const tableUpdate = () => (
    tableDispatch({
      type: ACTION_TYPE.ADD_TABLE_HEADER,
      payload: { headerColumns: getHeaderColumns(tableContext.sort, tableDispatch) },
    }),
    tableDispatch({
      type: ACTION_TYPE.ADD_TABLE_ROWS,
      payload: { rows: getRows(tableContext.tableDatasets, datasetContext.catalogId) ?? [] },
    })
  );

  useEffect(tableUpdate, [tableContext.sort, tableContext.filter, tableContext.tableDatasets]);

  return <Table rows={tableContext.rows} cols={tableContext.headerColumns} />;
};

const colWidths = {
  col_1: '66.7%',
  col_2: '16%',
  col_3: '14%',
  col_4: '3.3%',
  col_5: '70%',
};

const getCorrectIcon = (sort: SORT_TYPE, columnName: SORT_BY_TYPE): JSX.Element => {
  if (sort.sortBy !== columnName) return <Icon name='listUnsortedStroke' />;
  return sort.sortOrder === 'ascending' ? <Icon name='listAscendingStroke' /> : <Icon name='listDescendingStroke' />;
};

const getHeaderColumns = (sort: SORT_TYPE, tableDispatcher: React.Dispatch<ACTION>): CellType[] => {
  return [
    {
      sortButton: (
        <Button
          name='Title'
          btnType='transparent'
          iconPos='right'
          endIcon={getCorrectIcon(sort, 'title')}
          onClick={() => tableDispatcher({ type: ACTION_TYPE.SORT_DATASETS, payload: { sortBy: 'title' } })}
        />
      ),
      width: colWidths.col_5,
    },
    {
      sortButton: (
        <Button
          name='Sist endret'
          btnType='transparent'
          iconPos='right'
          endIcon={getCorrectIcon(sort, 'last-modified')}
          onClick={() => tableDispatcher({ type: ACTION_TYPE.SORT_DATASETS, payload: { sortBy: 'last-modified' } })}
        />
      ),
      width: colWidths.col_2,
    },
    {
      sortButton: (
        <Button
          name='Status'
          btnType='transparent'
          iconPos='right'
          endIcon={getCorrectIcon(sort, 'status')}
          onClick={() => tableDispatcher({ type: ACTION_TYPE.SORT_DATASETS, payload: { sortBy: 'status' } })}
        />
      ),
      width: colWidths.col_3,
    },
  ];
};

const test = true;

const getRows = (datasets: Dataset[], catalogId: string): RowProps<ColumnProps>[] =>
  datasets.map(dataset => ({
    row: [
      // TODO: Sjekk hvilken type det er
      { icon: <Icon name={test ? 'squareTextStroke' : 'squareThreeStroke'} />, width: colWidths.col_4 },
      { text: dataset.title?.nb ?? 'Mangler tittel', width: colWidths.col_1 },
      { text: dataset?._lastModified && getDate(dataset?._lastModified), width: colWidths.col_2 },
      { tag: getTag(dataset?.registrationStatus), width: colWidths.col_3 },
    ],
    onRowClick: () =>
      (window.location.href = `${FDK_REGISTRATION_BASE_URI}/dataset-catalogs/${catalogId}/datasets/${dataset.id}`),
  }));

export default PopulatedTable;
