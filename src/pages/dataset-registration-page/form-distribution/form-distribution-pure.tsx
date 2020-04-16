import React, { useState } from 'react';
import { Field, FieldArray } from 'redux-form';
import Autocomplete from 'react-autocomplete';
import TagsInput from 'react-tagsinput';
import _ from 'lodash';
import cx from 'classnames';

import localization from '../../../services/localization';
import { Helptext } from '../../../components/helptext/helptext.component';
import InputField from '../../../components/fields/field-input/field-input.component';
import TextAreaField from '../../../components/fields/field-textarea/field-textarea.component';
import RadioField from '../../../components/fields/field-radio/field-radio.component';
import SelectField from '../../../components/fields/field-select/field-select.component';
import { licenseType, textType } from '../../../schemaTypes';
import { datasetFormPatchThunk } from '../formsLib/asyncValidateDatasetInvokePatch';
import MultilingualField from '../../../components/multilingual-field/multilingual-field.component';
import LinkReadonlyField from '../../../components/fields/field-link-readonly/field-link-readonly.component';
import InputFieldReadonly from '../../../components/fields/field-input-readonly/field-input-readonly.component';
import { getTranslateText } from '../../../services/translateText';

export const renderDistributionLandingpage = ({ fields, isReadOnly }) => {
  return (
    <div>
      {fields &&
        fields.map((item, index) => (
          <Field
            key={index}
            name={`${item}.uri`}
            component={isReadOnly ? LinkReadonlyField : InputField}
            label={localization.schema.distribution.landingPageLabel}
          />
        ))}
    </div>
  );
};

const renderFomatsReadOnly = ({ input: { value }, mediaTypes }) => {
  return (
    <div className="pl-3">
      {value
        .map(item => mediaTypes.find(({ code }) => code === item)?.name ?? item)
        .join(', ')}
    </div>
  );
};

const renderLicence = ({ input }) => {
  return (
    <div className="pl-3">
      {getTranslateText(_.get(input, ['value', 'prefLabel']))}
    </div>
  );
};

const Formats = ({
  input: { name: fieldName, value: inputValue, onChange },
  mediaTypes
}) => {
  const [filterText, setFilterText] = useState('');

  return (
    <>
      <Autocomplete
        name={fieldName}
        wrapperProps={{ style: { width: '100%' } }}
        getItemValue={({ code }) => code}
        items={mediaTypes.filter(({ code, name }) => {
          const match = inputValue.find(mediaType => code === mediaType);
          return (
            !match &&
            (code.toLowerCase().includes(filterText) ||
              name.toLowerCase().includes(filterText))
          );
        })}
        renderInput={props => (
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              {...props}
              placeholder={localization.schema.distribution.formatPlaceholder}
            />
            <span className="input-group-btn input-group-append">
              <button
                type="button"
                className="btn btn-default input-group-text"
                onClick={() => setFilterText('')}
              >
                <i className="fa fa-times-circle" />
              </button>
            </span>
          </div>
        )}
        renderItem={({ code, name }, isHighlighted) => {
          const itemClass = cx('px-2', {
            'fdk-bg-color-neutral-lightest': isHighlighted
          });
          return (
            <div key={code} className={itemClass}>
              {name}
            </div>
          );
        }}
        renderMenu={(items, value, style) => (
          <div className="fdk-autocomplete-menu" style={{ ...style }}>
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
              .filter(value => mediaTypes.find(({ code }) => code === value))
              .filter(Boolean),
            val,
            ...inputValue
              .filter(value => !mediaTypes.find(({ code }) => code === value))
              .filter(Boolean)
          ]);
        }}
        menuStyle={{ zIndex: '1000' }}
      />
      <div className="d-flex flex-wrap my-2">
        {inputValue
          .filter(value => mediaTypes.find(({ code }) => code === value))
          .filter(Boolean)
          .map((value, index) => (
            <div key={`filter-${index}-${value}`}>
              <div
                role="button"
                tabIndex={0}
                className="mr-2 mb-1 fdk-badge badge badge-secondary fdk-text-size-15"
                onClick={() => {
                  inputValue.splice(index, 1);
                  onChange(inputValue);
                }}
                onKeyPress={e => {
                  e.preventDefault();
                  inputValue.splice(index, 1);
                  onChange(inputValue);
                }}
              >
                <span className="fdk-filter-pill">
                  {mediaTypes.find(({ code }) => code === value)?.name ?? value}
                </span>
              </div>
            </div>
          ))}
      </div>
      <TagsInput
        name={fieldName}
        className="fdk-reg-input-tags"
        inputProps={{
          placeholder: localization.schema.distribution.formatPlaceholderAlt
        }}
        value={inputValue
          .filter(value => !mediaTypes.find(({ code }) => code === value))
          .filter(Boolean)}
        onChange={tags =>
          onChange([
            ...inputValue
              .filter(value => mediaTypes.find(({ code }) => code === value))
              .filter(Boolean),
            ...tags
          ])
        }
        addOnBlur
      />
    </>
  );
};

const renderFormat = ({ input, mediaTypes }) => (
  <FieldArray
    name={name}
    component={Formats}
    input={input}
    mediaTypes={mediaTypes}
  />
);

export const Distributions = ({
  fields,
  openLicenseItems,
  mediaTypes,
  initialValues,
  onDeleteFieldAtIndex,
  languages,
  isReadOnly
}) => {
  return (
    <div>
      {fields &&
        fields.map((distribution, index) => {
          if (_.get(initialValues, ['distribution', index, 'accessService'])) {
            return null;
          }
          return (
            <div key={index}>
              <div className="d-flex">
                <h4>Distribusjon #{index + 1}</h4>
                {!isReadOnly && (
                  <button
                    className="fdk-btn-no-border"
                    type="button"
                    title="Remove distribution"
                    onClick={() => onDeleteFieldAtIndex(fields, index)}
                  >
                    <i className="fa fa-trash mr-2" />
                    {localization.schema.distribution.deleteDistributionLabel}
                  </button>
                )}
              </div>
              <div className="form-group">
                <Helptext
                  title={localization.schema.distribution.helptext.title}
                />
                <MultilingualField
                  name={`${distribution}.title`}
                  component={isReadOnly ? LinkReadonlyField : InputField}
                  label={localization.schema.common.titleLabel}
                  languages={languages}
                  showLabel
                />
              </div>
              <div className="form-group">
                <Helptext
                  title={localization.schema.distribution.helptext.type}
                  term="Distribution_type"
                />
                {isReadOnly && (
                  <>
                    <div className="pl-3">
                      {_.get(initialValues, ['distribution', index, 'type'])}
                    </div>
                  </>
                )}
                {!isReadOnly && (
                  <>
                    <Field
                      name={`${distribution}.type`}
                      radioId={`distribution-api-${index}`}
                      component={RadioField}
                      type="radio"
                      value="API"
                      label={localization.schema.distribution.apiLabel}
                    />
                    <Field
                      name={`${distribution}.type`}
                      radioId={`distribution-feed-${index}`}
                      component={RadioField}
                      type="radio"
                      value="Feed"
                      label={localization.schema.distribution.feedLabel}
                    />
                    <Field
                      name={`${distribution}.type`}
                      radioId={`distribution-file-${index}`}
                      component={RadioField}
                      type="radio"
                      value="Nedlastbar fil"
                      label={localization.schema.distribution.downloadLabel}
                    />
                  </>
                )}
              </div>
              <div className="form-group">
                <Helptext
                  title={localization.schema.distribution.helptext.accessURL}
                  term="Distribution_accessURL"
                />
                <Field
                  name={`${distribution}.accessURL.0`}
                  type="text"
                  component={isReadOnly ? LinkReadonlyField : InputField}
                  label={localization.schema.distribution.accessURLLabel}
                />
              </div>
              <div className="form-group">
                <Helptext
                  title={localization.schema.distribution.helptext.format}
                  term="Distribution_format"
                  required
                />
                <Field
                  name={`${distribution}.format`}
                  component={isReadOnly ? renderFomatsReadOnly : renderFormat}
                  mediaTypes={mediaTypes}
                />
              </div>
              <div className="form-group">
                <Helptext
                  title={localization.schema.distribution.helptext.license}
                  term="Distribution_modified"
                />
                <Field
                  name={`${distribution}.license`}
                  component={isReadOnly ? renderLicence : SelectField}
                  items={openLicenseItems}
                />
              </div>
              <div className="form-group">
                <Helptext
                  title={localization.schema.distribution.helptext.description}
                  term="Distribution_description"
                />
                <MultilingualField
                  name={`${distribution}.description`}
                  component={isReadOnly ? InputFieldReadonly : TextAreaField}
                  label={localization.schema.distribution.descriptionLabel}
                  languages={languages}
                  showLabel
                />
              </div>

              <div className="form-group">
                <Helptext
                  title={
                    localization.schema.distribution.helptext.documentation
                  }
                  term="Distribution_documentation"
                />
                <FieldArray
                  name={`${distribution}.page`}
                  component={renderDistributionLandingpage}
                  isReadOnly={isReadOnly}
                />
              </div>

              <div className="form-group">
                <Helptext
                  title={localization.schema.distribution.helptext.conformsTo}
                  term="Distribution_conformsTo"
                />
                <div className="d-flex flex-column">
                  <MultilingualField
                    name={`${distribution}.conformsTo[0].prefLabel`}
                    component={isReadOnly ? InputFieldReadonly : InputField}
                    label={localization.schema.common.titleLabel}
                    showLabel
                    languages={languages}
                  />
                  <div className="mt-4">
                    <Field
                      name={`${distribution}.conformsTo[0].uri`}
                      component={isReadOnly ? LinkReadonlyField : InputField}
                      showLabel
                      label={localization.schema.common.linkLabel}
                    />
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      {!isReadOnly && (
        <button
          className="fdk-btn-no-border"
          type="button"
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
          <i className="fa fa-plus mr-2" />
          {localization.schema.distribution.addDistributionLabel}
        </button>
      )}
    </div>
  );
};

export const FormDistributionPure = ({
  initialValues,
  openLicenseItems,
  mediaTypes,
  dispatch,
  catalogId,
  datasetId,
  languages,
  isReadOnly
}) => {
  const deleteFieldAtIndex = (fields, index) => {
    const values = fields.getAll();
    // use splice instead of skip, for changing the bound value
    values.splice(index, 1);
    const patch = { [fields.name]: values };
    const thunk = datasetFormPatchThunk({ catalogId, datasetId, patch });
    dispatch(thunk);
  };

  return (
    <form>
      <FieldArray
        name="distribution"
        component={Distributions}
        openLicenseItems={openLicenseItems}
        mediaTypes={mediaTypes}
        initialValues={initialValues}
        onDeleteFieldAtIndex={deleteFieldAtIndex}
        languages={languages}
        isReadOnly={isReadOnly}
      />
    </form>
  );
};

FormDistributionPure.defaultProps = {
  dispatch: null,
  catalogId: null,
  datasetId: null,
  openLicenseItems: [],
  languages: [],
  isReadOnly: false
};
