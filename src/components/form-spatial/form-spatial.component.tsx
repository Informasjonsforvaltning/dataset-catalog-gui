import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field, FieldArray } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Translation from '../translation';
import Helptext from '../helptext/helptext.component';
import DatepickerField from '../fields/field-datepicker/field-datepicker.component';
import CheckboxField from '../fields/field-checkbox/field-checkbox.component';
import { datasetFormPatchThunk } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

import SpatialTagsInputField from './spatial-tags-input-field';

interface ExternalProps {
  initialValues: any;
  dispatch: (arg: any) => void;
  catalogId: string;
  datasetId: string;
  isReadOnly: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const renderTemporalFields = ({
  item,
  fields,
  onDeleteFieldAtIndex,
  index,
  translationsService
}: any) => (
  <div className='d-flex mb-2' key={index}>
    <div className='w-50'>
      <Field
        name={`${item}.startDate`}
        type='text'
        component={DatepickerField}
        label={translationsService.translate('schema.common.startDateLabel')}
        showLabel
      />
    </div>
    <div className='w-50'>
      <Field
        name={`${item}.endDate`}
        type='text'
        component={DatepickerField}
        label={translationsService.translate('schema.common.endDateLabel')}
        showLabel
      />
    </div>
    <div className='d-flex align-items-end'>
      <button
        className='fdk-btn-no-border'
        type='button'
        title='Remove temporal'
        onClick={() => onDeleteFieldAtIndex(fields, index)}
      >
        <i className='fa fa-trash mr-2' />
      </button>
    </div>
  </div>
);

const renderTemporal = ({
  fields,
  onDeleteFieldAtIndex,
  translationsService
}: any) => (
  <div>
    {fields?.map((item: any, index: number) =>
      renderTemporalFields({
        item,
        index,
        fields,
        onDeleteFieldAtIndex,
        translationsService
      })
    )}
    <button
      className='fdk-btn-no-border'
      type='button'
      onClick={() => fields.push({})}
    >
      <i className='fa fa-plus mr-2' />
      <Translation id='schema.common.addTime' />
    </button>
  </div>
);

const renderTemporalReadOnly = ({ fields, translationsService }: any) =>
  fields?.map((item: any) => (
    <div className='pl-3' key={item}>
      <Field
        name={`${item}.endDate`}
        type='text'
        component={({ input }: any) => <span>{input.value} - </span>}
        label={translationsService.translate('schema.common.endDateLabel')}
        showLabel
      />
      <Field
        name={`${item}.startDate`}
        type='text'
        component={({ input }: any) => <span>{input.value}</span>}
        label={translationsService.translate('schema.common.endDateLabel')}
        showLabel
      />
    </div>
  ));

const translateCode = (code: any) => {
  switch (code) {
    case 'NOR':
      return 'Norsk';
    case 'SMI':
      return 'Samisk';
    case 'ENG':
      return 'Engelsk';
    default:
      return '';
  }
};

const renderLanguageReadOnly = ({ input }: any) => (
  <div className='pl-3'>
    {input.value.map((item: any) => translateCode(item.code)).join(', ')}
  </div>
);

const FormSpatial: FC<Props> = ({
  initialValues,
  dispatch,
  catalogId,
  datasetId,
  isReadOnly,
  translationsService
}) => {
  const deleteFieldAtIndex = (fields: any, index: number) => {
    const values = fields.getAll();
    // use splice instead of skip, for changing the bound value
    values.splice(index, 1);
    const patch = { [fields.name]: values };
    const thunk = datasetFormPatchThunk({ catalogId, datasetId, patch });
    dispatch(thunk);
  };

  const onUpdateAdministrativeUnits =
    (name: any) => (administrativeUnits: any) =>
      dispatch(
        datasetFormPatchThunk({
          catalogId,
          datasetId,
          patch: { [name]: administrativeUnits }
        })
      );

  return initialValues ? (
    <form>
      <div className='form-group mb-0'>
        <Helptext
          title={translationsService.translate(
            'schema.spatial.helptext.spatial'
          )}
          term='Dataset_spatial'
          recommended
        />
        <Field
          name='spatial'
          type='text'
          component={SpatialTagsInputField}
          label={translationsService.translate('schema.spatial.spatialLabel')}
          isReadOnly={isReadOnly}
          onUpdateAdministrativeUnits={onUpdateAdministrativeUnits('spatial')}
        />
      </div>
      <div className='form-group mb-0'>
        <Helptext
          title={translationsService.translate(
            'schema.spatial.helptext.temporal'
          )}
          term='Dataset_temporal'
          recommended
        />
        {isReadOnly && (
          <FieldArray
            name='temporal'
            component={renderTemporalReadOnly}
            translationsService={translationsService}
          />
        )}
        {!isReadOnly && (
          <FieldArray
            name='temporal'
            component={renderTemporal}
            onDeleteFieldAtIndex={deleteFieldAtIndex}
            translationsService={translationsService}
          />
        )}
      </div>
      <div className='form-group mb-0'>
        <Helptext
          title={translationsService.translate(
            'schema.spatial.helptext.issued'
          )}
          term='Dataset_issued'
        />
        {isReadOnly && (
          <Field
            name='issued'
            type='text'
            component={({ input }: any) => (
              <div className='pl-3'>{input.value}</div>
            )}
            label={translationsService.translate('schema.spatial.issuedLabel')}
          />
        )}
        {!isReadOnly && (
          <Field
            name='issued'
            type='text'
            component={DatepickerField}
            label={translationsService.translate('schema.spatial.issuedLabel')}
          />
        )}
      </div>
      <div className='form-group mb-0'>
        <Helptext
          title={translationsService.translate(
            'schema.spatial.helptext.language'
          )}
          term='Dataset_language'
          recommended
        />

        {isReadOnly && (
          <Field name='language' component={renderLanguageReadOnly} />
        )}
        {!isReadOnly && <Field name='language' component={CheckboxField} />}
      </div>
    </form>
  ) : null;
};

export default compose<FC<ExternalProps>>(memo, withTranslations)(FormSpatial);
