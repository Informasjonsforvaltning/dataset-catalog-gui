import { ThemeProfile } from '@fellesdatakatalog/theme';
import { CellType } from '../components/table/table-header';
import { Dataset } from '../utils/types';
import { FILTER_TYPE, SORT_TYPE } from './table-context/reducer';
import { Props as ColumnProps } from '../components/table/table-row/row-cell';
import { Props as RowProps } from '../components/table/table-row';

enum STATUS {
  IDLE = 'idle',
  ERROR = 'error',
  LOADING = 'loading',
  FINISHED = 'finished',
}

enum ACTION_TYPE {
  IDLE,
  ERROR,
  LOADING,
  ADD_TABLE_ROWS,
  FINISHED,
  ADD_DATASET,
  GET_DATASET,
  GET_DATASETS,
  CREATE_DATASET,
  CHANGE_THEME,
  SORT_DATASETS,
  INIT_TABLE,
  REMOVE_DATASET,
  ADD_CATALOG_ID,
  FILTER_DATASETS,
  ADD_TABLE_HEADER,
  SEARCH_IN_DATASETS,
  UPDATE_TABLE,
}

type ACTION =
  | { type: ACTION_TYPE.IDLE }
  | { type: ACTION_TYPE.ERROR }
  | { type: ACTION_TYPE.LOADING }
  | { type: ACTION_TYPE.GET_DATASETS }
  | { type: ACTION_TYPE.FINISHED; payload: Dataset[] }
  | { type: ACTION_TYPE.ADD_CATALOG_ID; payload: string }
  | { type: ACTION_TYPE.SORT_DATASETS; payload: SORT_TYPE }
  | { type: ACTION_TYPE.FILTER_DATASETS; payload: FILTER_TYPE }
  | { type: ACTION_TYPE.CREATE_DATASET; payload: { catalogId: string } }
  | { type: ACTION_TYPE.ADD_DATASET; payload: { dataset: Dataset } }
  | { type: ACTION_TYPE.GET_DATASET; payload: { datasetId: string } }
  | { type: ACTION_TYPE.CHANGE_THEME; payload: { theme: ThemeProfile } }
  | { type: ACTION_TYPE.REMOVE_DATASET; payload: { catalogId: string } }
  | { type: ACTION_TYPE.INIT_TABLE; payload: { datasets: Dataset[] } }
  | { type: ACTION_TYPE.UPDATE_TABLE; payload: { datasets: Dataset[] } }
  | { type: ACTION_TYPE.ADD_TABLE_HEADER; payload: { headerColumns: CellType[] } }
  | { type: ACTION_TYPE.ADD_TABLE_ROWS; payload: { rows: RowProps<ColumnProps>[] } };

export { ACTION, ACTION_TYPE, STATUS };
