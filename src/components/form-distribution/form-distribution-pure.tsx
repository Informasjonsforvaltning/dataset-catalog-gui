import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import { Field, FieldArray } from 'redux-form';
import Autocomplete from 'react-autocomplete';
import cx from 'classnames';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Translation from '../translation';
import Helptext from '../helptext/helptext.component';
import InputField from '../fields/field-input/field-input.component';
import TextAreaField from '../fields/field-textarea/field-textarea.component';
import SelectField from '../fields/field-select/field-select.component';
import InputTagsAPIsField from '../field-tagsinput-apis';
import { licenseType, textType } from '../../schemaTypes';
import { datasetFormPatchThunk } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';
import MultilingualField from '../multilingual-field/multilingual-field.component';
import LinkReadonlyField from '../fields/field-link-readonly/field-link-readonly.component';
import InputFieldReadonly from '../fields/field-input-readonly/field-input-readonly.component';

interface ExternalProps {
  dispatch: (arg: any) => void;
  catalogId: string;
  datasetId: string;
  datasetItem: any;
  openLicenseItems: any[];
  languages: any[];
  mediaTypes: any[];
  isReadOnly: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const renderDistributionLandingpage = ({
  fields,
  isReadOnly,
  translationsService
}: any) => (
  <div>
    {fields?.map((item: any, index: number) => (
      <Field
        key={index}
        name={`${item}.uri`}
        component={isReadOnly ? LinkReadonlyField : InputField}
        label={translationsService.translate(
          'schema.distribution.landingPageLabel'
        )}
      />
    ))}
  </div>
);

const renderAccessServiceReadOnly = ({ input: { value } }: any) =>
  (value || []).map(({ id, description }: any, index: number) => (
    <div key={id ?? `data-service-${index}`} className='pl-3'>
      <Translation object={description} />
    </div>
  ));

const renderLicence = ({ input }: any) => (
  <div className='pl-3'>
    <Translation object={input?.value?.prefLabel} />
  </div>
);

const Formats = ({
  input: { value: inputValue, onChange },
  mediaTypes,
  translationsService
}: any) => {
  const [filterText, setFilterText] = useState('');
  return (
    <>
      <Autocomplete
        wrapperProps={{ style: { width: '100%' } }}
        getItemValue={({ uri }) => uri}
        items={mediaTypes.filter(({ uri, name }: any) => {
          const match = inputValue?.find((mediaType: any) => uri === mediaType);
          return !match && name.toLowerCase().includes(filterText);
        })}
        renderInput={props => (
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              {...props}
              placeholder={translationsService.translate(
                'schema.distribution.formatPlaceholder'
              )}
            />
            <span className='input-group-btn input-group-append'>
              <button
                type='button'
                className='btn btn-default input-group-text'
                onClick={() => setFilterText('')}
              >
                <i className='fa fa-times-circle' />
              </button>
            </span>
          </div>
        )}
        renderItem={({ uri, name }, isHighlighted) => {
          const itemClass = cx('px-2', {
            'fdk-bg-color-neutral-lightest': isHighlighted
          });
          return (
            <div key={uri} className={itemClass}>
              {name}
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
        onChange={e => {
          e.preventDefault();
          setFilterText(e.target.value);
        }}
        onSelect={val => {
          setFilterText('');
          onChange([
            ...inputValue
              .filter((value: any) =>
                mediaTypes.find(({ uri }: any) => uri === value)
              )
              .filter(Boolean),
            val,
            ...inputValue
              .filter(
                (value: any) =>
                  !mediaTypes.find(({ uri }: any) => uri === value)
              )
              .filter(Boolean)
          ]);
        }}
        menuStyle={{ zIndex: 1000 }}
      />
      <div className='d-flex flex-wrap my-2'>
        {inputValue.filter(Boolean).map((value: any, index: number) => (
          <div key={`filter-${index}-${value}`}>
            <div
              role='button'
              tabIndex={0}
              className='mr-2 mb-1 fdk-badge badge badge-secondary fdk-text-size-15'
              onClick={e => {
                e.preventDefault();
                delete inputValue[index];
                onChange(inputValue.filter(Boolean));
              }}
              onKeyPress={e => {
                e.preventDefault();
                delete inputValue[index];
                onChange(inputValue.filter(Boolean));
              }}
            >
              <span className='fdk-filter-pill'>
                {mediaTypes.find(({ uri }: any) => uri === value)?.name ??
                  value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const renderFormat = ({ input, mediaTypes, translationsService }: any) => (
  <FieldArray
    name={input.name}
    component={Formats}
    input={input}
    mediaTypes={mediaTypes}
    translationsService={translationsService}
  />
);

const renderFomatsReadOnly = ({ input: { value }, mediaTypes }: any) => (
  <div className='pl-3'>
    {value
      .map(
        (item: any) =>
          mediaTypes.find(({ uri }: any) => uri === item)?.name ?? item
      )
      .join(', ')}
  </div>
);

const renderDistributions = ({
  fields,
  onDeleteFieldAtIndex,
  languages,
  mediaTypes,
  openLicenseItems,
  isReadOnly,
  translationsService
}: any) => (
  <div>
    {fields?.map((distribution: any, index: number) => (
      <div key={index}>
        <div className='d-flex'>
          <h4>Distribusjon #{index + 1}</h4>
          {!isReadOnly && (
            <button
              className='fdk-btn-no-border'
              type='button'
              title='Remove distribution'
              onClick={() => onDeleteFieldAtIndex(fields, index)}
            >
              <i className='fa fa-trash mr-2' />
              <Translation id='schema.distribution.deleteDistributionLabel' />
            </button>
          )}
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.distribution.helptext.title'
            )}
            recommended
          />
          <MultilingualField
            name={`${distribution}.title`}
            component={isReadOnly ? LinkReadonlyField : InputField}
            label={translationsService.translate('schema.common.titleLabel')}
            languages={languages}
            showLabel
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.distribution.helptext.accessURL'
            )}
            term='Distribution_accessURL'
            required
          />
          <Field
            name={`${distribution}.accessURL.0`}
            type='text'
            component={isReadOnly ? LinkReadonlyField : InputField}
            label={translationsService.translate(
              'schema.distribution.accessURLLabel'
            )}
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.distribution.helptext.downloadURL'
            )}
            term='Distribution_downloadURL'
          />
          <Field
            name={`${distribution}.downloadURL.0`}
            type='text'
            component={isReadOnly ? LinkReadonlyField : InputField}
            label={translationsService.translate(
              'schema.distribution.downloadURLLabel'
            )}
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.distribution.helptext.format'
            )}
            term='Distribution_format'
            recommended
          />
          <Field
            name={`${distribution}.format`}
            component={isReadOnly ? renderFomatsReadOnly : renderFormat}
            mediaTypes={mediaTypes}
            translationsService={translationsService}
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.distribution.helptext.accessService'
            )}
            term='Distribution_accessService'
          />
          <Field
            name={`${distribution}.accessService`}
            component={
              isReadOnly ? renderAccessServiceReadOnly : InputTagsAPIsField
            }
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.distribution.helptext.license'
            )}
            term='Distribution_modified'
          />
          <Field
            name={`${distribution}.license`}
            labelKey='label'
            component={isReadOnly ? renderLicence : SelectField}
            items={openLicenseItems}
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.distribution.helptext.description'
            )}
            term='Distribution_description'
          />
          <MultilingualField
            name={`${distribution}.description`}
            component={isReadOnly ? InputFieldReadonly : TextAreaField}
            label={translationsService.translate(
              'schema.distribution.descriptionLabel'
            )}
            languages={languages}
            showLabel
          />
        </div>

        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.distribution.helptext.documentation'
            )}
            term='Distribution_documentation'
          />
          <FieldArray
            name={`${distribution}.page` as string}
            component={renderDistributionLandingpage}
            isReadOnly={isReadOnly}
            translationsService={translationsService}
          />
        </div>

        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.distribution.helptext.conformsTo'
            )}
            term='Distribution_conformsTo'
          />
          <div className='d-flex flex-column'>
            <MultilingualField
              name={`${distribution}.conformsTo[0].prefLabel`}
              component={isReadOnly ? InputFieldReadonly : InputField}
              label={translationsService.translate('schema.common.titleLabel')}
              showLabel
              languages={languages}
            />
            <div className='mt-4'>
              <Field
                name={`${distribution}.conformsTo[0].uri`}
                component={isReadOnly ? LinkReadonlyField : InputField}
                showLabel
                label={translationsService.translate('schema.common.linkLabel')}
              />
            </div>
          </div>
        </div>
        <hr />
      </div>
    ))}
    {!isReadOnly && (
      <button
        className='fdk-btn-no-border'
        type='button'
        onClick={() =>
          fields.push({
            id: '',
            description: textType,
            accessURL: [],
            license: licenseType,
            conformsTo: [],
            page: [licenseType],
            format: [],
            type: ''
          })
        }
      >
        <i className='fa fa-plus mr-2' />
        <Translation id='schema.distribution.addDistributionLabel' />
      </button>
    )}
  </div>
);

const FormDistribution: FC<Props> = ({
  openLicenseItems,
  mediaTypes,
  dispatch,
  catalogId,
  datasetId,
  datasetItem,
  languages,
  isReadOnly,
  translationsService
}) => {
  const deleteFieldAtIndex = (fields: any, index: number) => {
    const values = fields.getAll();
    // use splice instead of skip, for changing the bound value
    values.splice(index, 1);
    const patch = { [fields.name]: values };
    const thunk = datasetFormPatchThunk({
      catalogId,
      datasetId,
      datasetItem,
      patch
    });
    dispatch(thunk);
  };

  return (
    <form>
      <FieldArray
        name='distribution'
        component={renderDistributions}
        openLicenseItems={openLicenseItems.filter(
          ({ isReplacedBy }) => !isReplacedBy
        )}
        mediaTypes={mediaTypes}
        onDeleteFieldAtIndex={deleteFieldAtIndex}
        languages={languages}
        isReadOnly={isReadOnly}
        translationsService={translationsService}
      />
    </form>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(FormDistribution);
