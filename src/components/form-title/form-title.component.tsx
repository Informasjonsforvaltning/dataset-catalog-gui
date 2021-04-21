import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field, FieldArray } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Helptext from '../helptext/helptext.component';
import InputField from '../fields/field-input/field-input.component';
import LinkReadonlyField from '../fields/field-link-readonly/field-link-readonly.component';
import InputFieldReadonly from '../fields/field-input-readonly/field-input-readonly.component';
import MultilingualField from '../multilingual-field/multilingual-field.component';
import TextAreaField from '../fields/field-textarea/field-textarea.component';

interface ExternalProps {
  languages: any[];
  isReadOnly: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const FormTitle: FC<Props> = ({
  languages,
  isReadOnly,
  translationsService
}) => (
  <form>
    <div className='form-group'>
      <Helptext
        title={translationsService.translate('schema.title.helptext.title')}
        required
        term='Dataset_title'
      />
      <MultilingualField
        name='title'
        component={isReadOnly ? InputFieldReadonly : InputField}
        languages={languages}
        label={translationsService.translate('schema.title.titleLabel')}
      />
    </div>
    <div className='form-group'>
      <Helptext
        title={translationsService.translate(
          'schema.title.helptext.description'
        )}
        required
        term='Dataset_description'
      />
      <MultilingualField
        name='description'
        component={isReadOnly ? InputFieldReadonly : TextAreaField}
        languages={languages}
        label={translationsService.translate('schema.title.descriptionLabel')}
      />
    </div>

    <div className='form-group'>
      <Helptext
        title={translationsService.translate(
          'schema.title.helptext.landingPage'
        )}
        term='Dataset_landingpage'
      />
      <FieldArray
        name='landingPage'
        isReadOnly={isReadOnly}
        component={({ fields }: any) => (
          <div>
            {fields.map((item: any, index: number) => (
              <Field
                key={index}
                name={`${item}`}
                component={isReadOnly ? LinkReadonlyField : InputField}
                label='Landingsside'
              />
            ))}
          </div>
        )}
      />
    </div>
  </form>
);

export default compose<FC<ExternalProps>>(memo, withTranslations)(FormTitle);
