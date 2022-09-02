import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import _ from 'lodash';
import includes from 'lodash/includes';
import { Field } from 'redux-form';
import Autocomplete from 'react-autocomplete';
import cx from 'classnames';

import { isNapPublish, isNapUnPublishTheme } from '../../lib/napPublish';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Translation from '../translation';
import Helptext from '../helptext/helptext.component';
import AlertMessage from '../alert-message/alert-message.component';
import FieldTreeLos from './field-tree-los/field-tree-los.component';
import FilterPillsLos from './filter-pills-los/filter-pills-los.component';

import { getLosItemParentsAndChildren } from '../../entrypoints/main/redux/modules/referenceData';

import {
  matchInputStateToLosTerm,
  onClearSearchInput,
  onChangeSearchInput,
  onSelectSearchedLosItem
} from './autocomplete-helper';
import { losValues } from '../dataset-registration-form/dataset-registration-page.logic';

import './form-los.scss';

import { CrossIcon } from '../../fdk-icons/icons';

interface ExternalProps {
  losItems: any[];
  datasetItem: any;
  datasetFormStatus: any;
  isReadOnly: boolean;
  themes: any;
}

interface Props extends ExternalProps, TranslationsProps {}

const FormLOS: FC<Props> = ({
  losItems,
  datasetItem,
  datasetFormStatus,
  isReadOnly,
  themes,
  translationsService
}) => {
  const [filterText, setFilterText] = useState('');
  const [searchedItem, setSearchedItem] = useState<any>(undefined);

  const handleSetFilterText = setFilterText;

  const handleSetSearchedItem = setSearchedItem;

  const losItemsToShow = _.uniqBy(
    getLosItemParentsAndChildren(losItems, searchedItem),
    ({ uri }: any) => uri
  );

  if (losItemsToShow) {
    return (
      <div className='form-group mb-0'>
        <Helptext
          title={translationsService.translate('schema.los.helptext.title')}
          term='themesLos'
          recommended
        />

        {!isReadOnly && (
          <>
            <Autocomplete
              wrapperProps={{ style: { width: '100%' } }}
              getItemValue={item => item.name.nb}
              items={losItems}
              renderInput={props => (
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    {...props}
                    placeholder={translationsService.translate(
                      'schema.los.losSearchPlaceholder'
                    )}
                  />
                  <span className='input-group-btn input-group-append'>
                    <button
                      type='button'
                      className='btn btn-default input-group-text'
                      onClick={() =>
                        onClearSearchInput(
                          handleSetFilterText,
                          handleSetSearchedItem
                        )
                      }
                    >
                      <CrossIcon />
                    </button>
                  </span>
                </div>
              )}
              renderItem={(item, isHighlighted) => {
                const itemClass = cx('px-2', {
                  'fdk-bg-color-neutral-lightest': isHighlighted
                });
                return (
                  <div key={item.uri} className={itemClass}>
                    {item.name.nb} [
                    <Translation id={item.isTheme ? 'category' : 'topic'} />]
                  </div>
                );
              }}
              renderMenu={(items, value, style) => (
                <div
                  key={value}
                  className='fdk-autocomplete-menu'
                  style={{ ...style }}
                >
                  {items.slice(0, 50)}
                </div>
              )}
              value={filterText}
              onChange={e =>
                onChangeSearchInput(
                  e,
                  handleSetFilterText,
                  handleSetSearchedItem
                )
              }
              onSelect={(val, item) =>
                onSelectSearchedLosItem(
                  val,
                  item,
                  handleSetFilterText,
                  handleSetSearchedItem
                )
              }
              menuStyle={{ zIndex: 1000 }}
              shouldItemRender={matchInputStateToLosTerm}
            />

            <form>
              <Field
                name='theme'
                component={FilterPillsLos}
                losItems={losItems}
              />
              <Field
                name='theme'
                component={FieldTreeLos}
                losItems={losItemsToShow}
                defaultOpenTree={typeof searchedItem !== 'undefined'}
                defaultShowTopic={
                  searchedItem && !_.get(searchedItem, 'isTheme')
                    ? searchedItem
                    : null
                }
              />
            </form>
          </>
        )}

        {isReadOnly && (
          <div className='pl-3'>{losValues(themes.values, losItems)}</div>
        )}

        {datasetFormStatus &&
          includes(datasetFormStatus.lastChangedFields, 'theme') &&
          isNapPublish(losItems, datasetItem) && (
            <AlertMessage type='info'>
              <span>
                <Translation id='formStatus.napPublish' />
              </span>
            </AlertMessage>
          )}

        {datasetFormStatus &&
          includes(datasetFormStatus.lastChangedFields, 'theme') &&
          isNapUnPublishTheme(losItems, datasetItem) && (
            <AlertMessage type='info'>
              <span>
                <Translation id='formStatus.napUnPublish' />
              </span>
            </AlertMessage>
          )}
      </div>
    );
  }
  return null;
};

export default compose<FC<ExternalProps>>(memo, withTranslations)(FormLOS);
