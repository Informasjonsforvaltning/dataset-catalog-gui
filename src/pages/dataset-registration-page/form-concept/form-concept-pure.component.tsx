import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import Helptext from '../../../components/helptext/helptext.component';
import ConceptTagsInputField from './concept-tags-input-field/concept-tags-input-field.component';
import ConceptTagReadOnlyField from './concept-tags-readonly-field/concept-tags-readonly-field';
import TagsInputFieldArray from '../../../components/fields/field-input-tags-objects/tags-input-field-array.component';
import MultilingualField from '../../../components/multilingual-field/multilingual-field.component';
import InputFieldReadonly from '../../../components/fields/field-input-readonly/field-input-readonly.component';

interface ExternalProps {
  errors: any;
  languages: any[];
  isReadOnly: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const FormConcept: FC<Props> = ({
  languages,
  errors,
  isReadOnly,
  translationsService
}) => (
  <form>
    <div className='form-group'>
      <Helptext
        title={translationsService.translate('schema.concept.helptext.content')}
        term='Dataset_content'
        recommended
      />
      {isReadOnly && (
        <Field
          name='concepts'
          component={ConceptTagReadOnlyField}
          languages={languages}
        />
      )}
      {!isReadOnly && (
        <Field name='concepts' component={ConceptTagsInputField} />
      )}
    </div>
    <div className='form-group'>
      <Helptext
        title={translationsService.translate('schema.concept.helptext.keyword')}
        term='Dataset_keyword'
      />
      {isReadOnly && (
        <MultilingualField
          name='keyword'
          languages={languages}
          component={InputFieldReadonly}
          label={translationsService.translate('schema.concept.keywordLabel')}
        />
      )}
      {!isReadOnly && (
        <MultilingualField
          name='keyword'
          languages={languages}
          component={TagsInputFieldArray}
          label={translationsService.translate('schema.concept.keywordLabel')}
        />
      )}

      {errors && errors.keyword && (
        <div className='alert alert-danger mt-3'>
          {errors.keyword[translationsService.getLanguage()]}
        </div>
      )}
    </div>
  </form>
);

export default compose<FC<ExternalProps>>(memo, withTranslations)(FormConcept);
