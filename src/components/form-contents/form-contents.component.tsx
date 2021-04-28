import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { FieldArray } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Helptext from '../helptext/helptext.component';
import TextAreaField from '../fields/field-textarea/field-textarea.component';
import MultilingualField from '../multilingual-field/multilingual-field.component';
import Standard from './standard/standard.component';
import InputFieldReadonly from '../fields/field-input-readonly/field-input-readonly.component';

interface ExternalProps {
  languages: any[];
  isReadOnly: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const FormContentsComponent: FC<Props> = ({
  languages,
  isReadOnly,
  translationsService
}) => (
  <form>
    <div className='form-group mb-0'>
      <div className='mt-4'>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.content.helptext.conformsTo'
            )}
            term='Dataset_conformsTo'
          />
          <FieldArray
            name='conformsTo'
            component={Standard}
            titleLabel={translationsService.translate(
              'schema.common.titleLabel'
            )}
            linkLabel={translationsService.translate('schema.common.linkLabel')}
            languages={languages}
            isReadOnly={isReadOnly}
          />
        </div>
      </div>
    </div>
    <div className='form-group mb-0'>
      <Helptext
        title={translationsService.translate(
          'schema.content.helptext.relevance'
        )}
        term='Dataset_hasQualityAnnotation_relevance'
      />
      <MultilingualField
        name='hasRelevanceAnnotation.hasBody'
        component={isReadOnly ? InputFieldReadonly : TextAreaField}
        label={translationsService.translate(
          'schema.content.hasRelevanceAnnotationLabel'
        )}
        languages={languages}
      />
    </div>
    <div className='form-group mb-0'>
      <Helptext
        title={translationsService.translate(
          'schema.content.helptext.completeness'
        )}
        term='Dataset_hasQualityAnnotation_completeness'
      />
      <MultilingualField
        name='hasCompletenessAnnotation.hasBody'
        component={isReadOnly ? InputFieldReadonly : TextAreaField}
        label={translationsService.translate(
          'schema.content.hasCompletenessAnnotationLabel'
        )}
        languages={languages}
      />
    </div>
    <div className='form-group mb-0'>
      <Helptext
        title={translationsService.translate(
          'schema.content.helptext.accuracy'
        )}
        term='Dataset_hasQualityAnnotation_accuracy'
      />
      <MultilingualField
        name='hasAccuracyAnnotation.hasBody'
        component={isReadOnly ? InputFieldReadonly : TextAreaField}
        label={translationsService.translate(
          'schema.content.hasAccuracyAnnotationLabel'
        )}
        languages={languages}
      />
    </div>
    <div className='form-group mb-0'>
      <Helptext
        title={translationsService.translate(
          'schema.content.helptext.availability'
        )}
        term='Dataset_hasQualityAnnotation_availability'
      />
      <MultilingualField
        name='hasAvailabilityAnnotation.hasBody'
        component={isReadOnly ? InputFieldReadonly : TextAreaField}
        label={translationsService.translate(
          'schema.content.hasAvailabilityAnnotationLabel'
        )}
        languages={languages}
      />
    </div>
  </form>
);

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(FormContentsComponent);
