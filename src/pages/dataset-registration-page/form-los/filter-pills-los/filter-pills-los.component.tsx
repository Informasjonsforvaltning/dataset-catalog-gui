import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';

import Translation from '../../../../components/translation';

import { getLosItemsFromInput } from '../field-tree-los/field-tree-los-helper';
import { removeValueFromInputValueArray } from '../form-helper';

import './filter-pills-los.scss';

interface ExternalProps {
  losItems: any[];
}

interface Props extends ExternalProps, WrappedFieldProps {}

const FilterPillsLos: FC<Props> = ({ losItems, input }) => (
  <div className='d-flex flex-wrap my-2'>
    {getLosItemsFromInput(input, losItems)
      ?.filter(Boolean)
      .map(({ uri, name }: any, index: any) => (
        <div key={`filter-${index}-${uri}`}>
          <div
            role='button'
            tabIndex={0}
            className='mr-2 mb-1 fdk-badge badge badge-secondary fdk-text-size-15'
            onClick={() => removeValueFromInputValueArray(input, uri)}
            onKeyPress={e => {
              removeValueFromInputValueArray(input, uri);
              e.preventDefault();
            }}
          >
            <span className='fdk-filter-pill'>
              <Translation object={name} />
            </span>
          </div>
        </div>
      ))}
  </div>
);

export default compose<FC<ExternalProps>>(memo)(FilterPillsLos);
