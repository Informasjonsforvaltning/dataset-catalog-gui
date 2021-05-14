import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import orderBy from 'lodash/orderBy';
import _ from 'lodash';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Translation from '../translation';
import SortButtons from '../sort-button/sort-button.component';
import ListItem from './list-item/list-item.component';

import './list-items.scss';

interface ExternalProps {
  catalogId: string;
  prefixPath?: string;
  items?: any[];
  itemTitleField?: string[];
  defaultEmptyListText?: string;
}

interface Props extends ExternalProps, TranslationsProps {}

const ListItems: FC<Props> = ({
  items,
  itemTitleField = ['title'],
  prefixPath,
  defaultEmptyListText,
  translationsService
}) => {
  const [sortField, setSortField] = useState('none');
  const [sortType, setSortType] = useState('');

  const onSortField = (field: string, type: string) => {
    setSortField(field);
    setSortType(type);
  };

  const renderItems = () => {
    if (items) {
      let sortedItems;
      if (sortField === 'title') {
        // order by title and ignore case
        sortedItems = orderBy(
          items,
          [
            item => {
              if (_.get(item, itemTitleField)) {
                const retTitle =
                  translationsService.translate(_.get(item, itemTitleField)) ||
                  _.get(item, itemTitleField);
                return typeof retTitle === 'string'
                  ? retTitle.toLowerCase()
                  : '';
              }
              return null;
            }
          ],
          [sortType as any]
        );
      } else if (sortField === 'registrationStatus') {
        sortedItems = orderBy(items, 'registrationStatus', [sortType as any]);
      } else if (sortField === 'lastModified') {
        sortedItems = orderBy(items, '_lastModified', [sortType as any]);
      } else if (sortField === 'none') {
        sortedItems = items;
      } else {
        sortedItems = orderBy(items, '_lastModified', ['desc']);
      }

      return sortedItems.map(item => {
        const title =
          translationsService.translate(_.get(item, itemTitleField)) ||
          _.get(item, itemTitleField);

        return (
          <ListItem
            key={item.id}
            title={typeof title === 'object' ? null : title}
            status={_.get(item, 'registrationStatus')}
            path={`${prefixPath}/${item.id}`}
            lastModified={item._lastModified}
          />
        );
      });
    }
    return (
      <div className='fdk-list-item d-flex'>
        <span className='fdk-text-size-small fdk-color-neutral-darkest'>
          {defaultEmptyListText}
        </span>
      </div>
    );
  };

  return (
    <div>
      <div className='fdk-list-header d-flex'>
        <div className='d-flex align-items-center w-50'>
          <span className='header-item mr-1'>
            <Translation id='title' />
          </span>
          <SortButtons
            field='title'
            sortField={sortField}
            sortType={sortType}
            onSortField={onSortField}
          />
        </div>
        <div className='d-flex align-items-center justify-content-end w-50'>
          <div className='d-flex align-items-center mr-5'>
            <span className='header-item mr-1'>
              <Translation id='listItems.header.lastModified' />
            </span>
            <SortButtons
              field='lastModified'
              sortField={sortField}
              sortType={sortType}
              onSortField={onSortField}
            />
          </div>
          <div className='d-flex align-items-center w-25 ml-3'>
            <span className='header-item mr-1'>
              <Translation id='listItems.header.status' />
            </span>
            <SortButtons
              field='registrationStatus'
              sortField={sortField}
              sortType={sortType}
              onSortField={onSortField}
            />
          </div>
        </div>
      </div>
      {renderItems()}
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo, withTranslations)(ListItems);
