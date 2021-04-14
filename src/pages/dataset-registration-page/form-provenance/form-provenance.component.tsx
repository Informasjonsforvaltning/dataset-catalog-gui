import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import Translation from '../../../components/translation';
import Helptext from '../../../components/helptext/helptext.component';
import SelectField from '../../../components/fields/field-select/field-select.component';
import TextAreaField from '../../../components/fields/field-textarea/field-textarea.component';
import InputFieldReadonly from '../../../components/fields/field-input-readonly/field-input-readonly.component';
import DatepickerField from '../../../components/fields/field-datepicker/field-datepicker.component';
import MultilingualField from '../../../components/multilingual-field/multilingual-field.component';

interface ExternalProps {
  initialValues: any;
  languages: any[];
  isReadOnly: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const FormProvenance: FC<Props> = ({
  initialValues: { provenance, provenanceItems, frequencyItems },
  languages,
  isReadOnly,
  translationsService
}) => {
  const requenzyReadOnly = ({ input }: any) => (
    <div className='pl-3'>
      <Translation object={input.value.prefLabel} />
    </div>
  );

  const lastUpdateReadOnly = ({ input }: any) => (
    <div className='pl-3'>{input.value}</div>
  );

  const renderProvenanceReadOnly = ({ input }: any) => (
    <div className='pl-3'>
      <Translation object={input.value.prefLabel} />
    </div>
  );

  const handleProvenanceChange = (
    input: any,
    event: any,
    provenanceItem: any
  ) => {
    // Skal fjerne fra array
    if (!event.target.checked) {
      input.onChange(null);
    } else {
      // Skal legge til array
      input.onChange(provenanceItem);
    }
  };

  const renderProvenance = ({ input }: any) =>
    provenanceItems
      ?.filter(({ code }: any) => code)
      .map((item: any) => (
        <div key={item.code} className='form-check fdk-form-checkbox'>
          <input
            type='checkbox'
            name='provenance'
            id={item.code}
            value={item.code}
            checked={input?.value?.uri?.includes(`${item.uri}`)}
            onChange={e => handleProvenanceChange(input, e, item)}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            className='form-check-label fdk-form-check-label'
            htmlFor={item.code}
          />
          <span>
            {item.prefLabel[translationsService.getLanguage()] ||
              item.prefLabel.no ||
              item.prefLabel.nb}
          </span>
        </div>
      ));

  return provenance ? (
    <form>
      <div className='form-group'>
        <Helptext
          title={translationsService.translate(
            'schema.provenance.helptext.provenance'
          )}
          term='Dataset_provenance'
        />
        <Field
          name='provenance'
          component={isReadOnly ? renderProvenanceReadOnly : renderProvenance}
        />
      </div>
      <div className='form-group'>
        <Helptext
          title={translationsService.translate(
            'schema.provenance.helptext.accruralPeriodicity'
          )}
          term='Dataset_accruralPeriodicity'
        />
        <Field
          name='accrualPeriodicity'
          component={isReadOnly ? requenzyReadOnly : SelectField}
          items={frequencyItems}
        />
      </div>
      <div className='form-group'>
        <Helptext
          title={translationsService.translate(
            'schema.provenance.helptext.modified'
          )}
          term='Dataset_modified'
        />
        <Field
          name='modified'
          type='text'
          component={isReadOnly ? lastUpdateReadOnly : DatepickerField}
          label={translationsService.translate(
            'schema.provenance.modifiedLabel'
          )}
        />
      </div>
      <div className='form-group'>
        <Helptext
          title={translationsService.translate(
            'schema.provenance.helptext.currentness'
          )}
          term='Dataset_hasQualityAnnotation_currentness'
        />
        <MultilingualField
          name='hasCurrentnessAnnotation.hasBody'
          component={isReadOnly ? InputFieldReadonly : TextAreaField}
          label={translationsService.translate(
            'schema.provenance.hasCurrentnessAnnotationLabel'
          )}
          languages={languages}
        />
      </div>
    </form>
  ) : null;
};

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(FormProvenance);
