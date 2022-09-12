import React, { memo, FC } from 'react';
import { compose } from 'redux';
import {
  ChevronDownLightInlineIcon,
  ChevronUpLightInlineIcon
} from '../../fdk-icons/icons';

interface ExternalProps {
  field: string;
  sortField: string;
  sortType: string;
  onSortField: (field: string, type: string) => void;
}

interface Props extends ExternalProps {}

const SortButtons: FC<Props> = ({
  field,
  sortField,
  sortType,
  onSortField
}) => (
  <div className='d-flex flex-column'>
    <button
      type='button'
      name={`${field}asc`}
      className={`d-flex sortButton transparentButton ${
        sortField === `${field}` && sortType === 'asc' ? 'visibilityHidden' : ''
      }`}
      onClick={() => onSortField(`${field}`, 'asc')}
      title='Stigende'
    >
      <ChevronUpLightInlineIcon />
    </button>
    <button
      type='button'
      name={`${field}desc`}
      className={`d-flex sortButton transparentButton ${
        sortField === `${field}` && sortType === 'desc'
          ? 'visibilityHidden'
          : ''
      }`}
      onClick={() => onSortField(`${field}`, 'desc')}
      title='Synkende'
    >
      <ChevronDownLightInlineIcon />
    </button>
  </div>
);

export default compose<FC<ExternalProps>>(memo)(SortButtons);
