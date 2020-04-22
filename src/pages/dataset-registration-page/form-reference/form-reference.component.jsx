import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import localization from '../../../services/localization';
import { Helptext } from '../../../components/helptext/helptext.component';
import SelectField from '../../../components/fields/field-select/field-select.component';
import MultilingualField from '../../../components/multilingual-field/multilingual-field.component';
import InputField from '../../../components/fields/field-input/field-input.component';
import InputFieldReadonly from '../../../components/fields/field-input-readonly/field-input-readonly.component';
import { datasetFormPatchThunk } from '../formsLib/asyncValidateDatasetInvokePatch';
import { getTranslateText } from '../../../services/translateText';

const renderReadOnly = ({ input, referenceDatasetsItems }) => {
  const { referenceType } = input.value || {};
  const referenceTypeText = getTranslateText(
    referenceType && referenceType.prefLabel
  );

  const uri = input.value && input.value.source && input.value.source.uri;

  const dataset = referenceDatasetsItems.find(i => i.uri === uri);

  const datasetTitle = getTranslateText(dataset && dataset.title);

  return (
    <div className="pl-3">
      {referenceTypeText} {datasetTitle}
    </div>
  );
};
renderReadOnly.propTypes = {
  input: PropTypes.object.isRequired,
  referenceDatasetsItems: PropTypes.array.isRequired
};

const renderReferenceFields = ({
  item,
  index,
  fields,
  referenceTypesItems,
  referenceDatasetsItems,
  onDeleteFieldAtIndex,
  isReadOnly
}) => (
  <div key={item}>
    {isReadOnly && (
      <Field
        name={`${item}`}
        component={renderReadOnly}
        referenceDatasetsItems={referenceDatasetsItems}
      />
    )}
    {!isReadOnly && (
      <div className="d-flex mb-2" key={index}>
        <div className="w-50">
          <Field
            name={`${item}.referenceType`}
            component={SelectField}
            items={referenceTypesItems}
          />
        </div>
        <div className="w-50">
          <Field
            name={`${item}.source`}
            component={SelectField}
            items={referenceDatasetsItems}
            labelKey="title"
          />
        </div>
        <div className="d-flex align-items-end">
          <button
            className="fdk-btn-no-border"
            type="button"
            title="Remove reference"
            onClick={() => onDeleteFieldAtIndex(fields, index)}
          >
            <i className="fa fa-trash mr-2" />
          </button>
        </div>
      </div>
    )}
  </div>
);
renderReferenceFields.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  fields: PropTypes.object.isRequired,
  referenceTypesItems: PropTypes.array.isRequired,
  referenceDatasetsItems: PropTypes.array.isRequired,
  onDeleteFieldAtIndex: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool.isRequired
};

export const renderReference = ({
  fields,
  referenceTypesItems,
  referenceDatasetsItems,
  onDeleteFieldAtIndex,
  isReadOnly
}) => {
  return (
    <div>
      {fields &&
        fields.map((item, index) =>
          renderReferenceFields({
            item,
            index,
            fields,
            referenceTypesItems,
            referenceDatasetsItems,
            onDeleteFieldAtIndex,
            isReadOnly
          })
        )}
      {!isReadOnly && (
        <button
          className="fdk-btn-no-border"
          type="button"
          onClick={() => fields.push({})}
        >
          <i className="fa fa-plus mr-2" />
          {localization.schema.reference.addReferenceLabel}
        </button>
      )}
    </div>
  );
};
renderReference.propTypes = {
  fields: PropTypes.object.isRequired,
  referenceTypesItems: PropTypes.array.isRequired,
  referenceDatasetsItems: PropTypes.array.isRequired,
  onDeleteFieldAtIndex: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool.isRequired
};

const renderRelationFields = ({
  field,
  languages,
  onDeleteFieldAtIndex,
  isReadOnly
}) => (
  <div key={field}>
    {isReadOnly && (
      <div className="mb-4">
        <MultilingualField
          name={`${field}.prefLabel`}
          component={InputFieldReadonly}
          languages={languages}
          label="Title"
          showLabel
        />
        <div className="mt-4">
          <Field
            name={`${field}.uri`}
            component={InputFieldReadonly}
            label="Lenke"
            showLabel
          />
        </div>
      </div>
    )}
    {!isReadOnly && (
      <div className="mb-4" key={field}>
        <MultilingualField
          name={`${field}.prefLabel`}
          component={InputField}
          languages={languages}
          label="Title"
          showLabel
        />
        <div className="mt-4">
          <Field
            name={`${field}.uri`}
            component={InputField}
            label="Lenke"
            showLabel
          />
        </div>
        <div className="d-flex align-items-end my-2 mb-4">
          <button
            className="fdk-btn-no-border"
            type="button"
            title="Remove reference"
            onClick={onDeleteFieldAtIndex}
          >
            <i className="fa fa-trash mr-2" />
            {localization.schema.reference.removeRelationLabel}
          </button>
        </div>
      </div>
    )}
  </div>
);

const renderRelations = ({
  fields,
  languages,
  onDeleteFieldAtIndex,
  isReadOnly
}) => (
  <div>
    {fields.map((field, index) =>
      renderRelationFields({
        field,
        languages,
        onDeleteFieldAtIndex: () => onDeleteFieldAtIndex(fields, index),
        isReadOnly
      })
    )}
    {!isReadOnly && (
      <button
        className="fdk-btn-no-border"
        type="button"
        onClick={() => fields.push({})}
      >
        <i className="fa fa-plus mr-2" />
        {localization.schema.reference.addRelationLabel}
      </button>
    )}
  </div>
);

export const FormReference = ({
  initialValues,
  dispatch,
  catalogId,
  datasetId,
  languages,
  isReadOnly
}) => {
  const { referenceTypesItems, referenceDatasetsItems } = initialValues;
  const deleteFieldAtIndex = (fields, index) => {
    const values = fields.getAll();
    // use splice instead of skip, for changing the bound value
    values.splice(index, 1);
    const patch = { [fields.name]: values };
    const thunk = datasetFormPatchThunk({ catalogId, datasetId, patch });
    dispatch(thunk);
  };

  if (initialValues) {
    return (
      <form>
        <div className="form-group">
          <Helptext
            title={localization.schema.reference.helptext.reference}
            term="Dataset_relation"
          />
          <FieldArray
            name="references"
            component={renderReference}
            referenceTypesItems={referenceTypesItems}
            referenceDatasetsItems={referenceDatasetsItems}
            onDeleteFieldAtIndex={deleteFieldAtIndex}
            isReadOnly={isReadOnly}
          />
        </div>
        <div className="form-group">
          <Helptext
            title={localization.schema.reference.helptext.relatedResources}
            term="Dataset_relation_resource"
          />
          <FieldArray
            name="relations"
            component={renderRelations}
            languages={languages}
            onDeleteFieldAtIndex={deleteFieldAtIndex}
            isReadOnly={isReadOnly}
          />
        </div>
      </form>
    );
  }
  return null;
};

FormReference.defaultProps = {
  initialValues: null,
  dispatch: null,
  catalogId: null,
  datasetId: null,
  isReadOnly: false
};

FormReference.propTypes = {
  initialValues: PropTypes.object,
  dispatch: PropTypes.func,
  catalogId: PropTypes.string,
  datasetId: PropTypes.string,
  isReadOnly: PropTypes.bool
};
