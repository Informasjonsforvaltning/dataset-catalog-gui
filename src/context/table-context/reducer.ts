import { produce } from 'immer';

import { Dataset } from '../../utils/types';
import { ACTION, ACTION_TYPE } from '../actions';
import { Props as ColumnProps } from '../../components/table/table-row/row-cell';
import { Props as RowProps } from '../../components/table/table-row';
import { CellType } from '../../components/table/table-header';

import { RegistrationStatus } from '../../utils/types/enums';
import { getTranslateText } from '../../utils/language/translateText';

type SORT_ORDER = 'ascending' | 'descending' | 'unsorted';
type FILTER_TYPE = { type: 'status'; value: RegistrationStatus } | { type: 'search' | 'status'; value: string };
type SORT_BY_TYPE = 'title' | 'last-modified' | 'status';
type SORT_TYPE = { sortBy: SORT_BY_TYPE; sortOrder?: SORT_ORDER };

type STATE = {
  datasets: Dataset[];
  tableDatasets: Dataset[];
  headerColumns: CellType[];
  rows: RowProps<ColumnProps>[];
  filter?: FILTER_TYPE;
  sort: SORT_TYPE;
};

const reducer = produce((state: STATE, action: ACTION) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_TABLE:
      state.tableDatasets = action.payload.datasets;
      return state;
    case ACTION_TYPE.ADD_TABLE_HEADER:
      state.headerColumns = action.payload.headerColumns;
      return state;
    case ACTION_TYPE.ADD_TABLE_ROWS:
      state.rows = action.payload.rows;
      return state;
    case ACTION_TYPE.FILTER_DATASETS:
      state.filter = action.payload;
      state.tableDatasets = getFilteredDatasets(state);
      return state;
    case ACTION_TYPE.SORT_DATASETS:
      if (action.payload.sortBy !== state.sort.sortBy) {
        state.sort.sortBy = action.payload.sortBy;
        state.sort.sortOrder = 'ascending';
      } else state.sort.sortOrder = state.sort.sortOrder === 'ascending' ? 'descending' : 'ascending';
      state.datasets = sortDatasetsView(state);
      return state;
    default:
      return state;
  }
});

const getFilteredDatasets = (state: STATE): Dataset[] => {
  switch (state.filter?.type) {
    case 'search':
      return state.datasets.filter(dataset => !state.filter?.value ||
        getTranslateText(dataset?.title).toLowerCase().includes(state.filter?.value.toString().toLocaleLowerCase())
      );
    case 'status':
      return state.datasets.filter(dataset => !state.filter?.value ||
        dataset.registrationStatus.toLowerCase() === state.filter?.value.toString().toLowerCase()
      );
    default:
      return state.tableDatasets;
  }
};

const sortDatasetsView = (state: STATE) => {
  switch (state.sort.sortBy) {
    case 'status':
      state.tableDatasets.sort((datasetA, datasetB) => {
        if (state.sort.sortOrder === 'ascending')
          return ascendSort(datasetA.registrationStatus, datasetB.registrationStatus);
        return descendSort(datasetA.registrationStatus, datasetB.registrationStatus);
      });
      break;
    case 'last-modified':
      state.tableDatasets.sort((datasetA, datasetB) => {
        if (state.sort.sortOrder === 'ascending') return ascendSort(datasetA._lastModified, datasetB._lastModified);
        return descendSort(datasetA._lastModified, datasetB._lastModified);
      });
      break;
    default:
      state.tableDatasets.sort((datasetA, datasetB) => {
        if (state.sort.sortOrder === 'ascending')
          return ascendSort(datasetA.title?.nb ?? 'Mangler tittel', datasetB.title?.nb ?? 'Mangler tittel');
        return descendSort(datasetA.title?.nb ?? 'Mangler tittel', datasetB.title?.nb ?? 'Mangler tittel');
      });
  }
  return state.tableDatasets;
};

const ascendSort = (A: string | Date, B: string | Date): number => {
  if (typeof A === typeof Date) {
    A = A.toString();
    B = B.toString();
  }
  if (A < B) return -1;
  if (A > B) return 1;
  return 0;
};

const descendSort = (A: string | Date, B: string | Date): number => {
  if (A > B) return -1;
  if (A < B) return 1;
  return 0;
};

export { STATE, SORT_TYPE, SORT_BY_TYPE, FILTER_TYPE, reducer };
