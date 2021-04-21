import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Helptext from '../helptext/helptext.component';
import InputField from '../fields/field-input/field-input.component';
import InputFieldReadonly from '../fields/field-input-readonly/field-input-readonly.component';
import LinkReadonlyField from '../fields/field-link-readonly/field-link-readonly.component';

interface ExternalProps {
  isReadOnly: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const FormContactPoint: FC<Props> = ({ isReadOnly, translationsService }) => (
  <form>
    <div className='form-group'>
      <Helptext
        title={translationsService.translate(
          'schema.contactPoint.helptext.organizationalUnit'
        )}
        term='ContactPoint_organizational-unit'
        recommended
      />
      <Field
        name='contactPoint[0].organizationUnit'
        component={isReadOnly ? InputFieldReadonly : InputField}
        label={translationsService.translate(
          'schema.contactPoint.organizationUnitLabel'
        )}
        isOnlyOneSelectedLanguage
      />
    </div>
    <div className='form-group'>
      <Helptext
        title={translationsService.translate(
          'schema.contactPoint.helptext.hasURL'
        )}
        term='ContactPoint_hasURL'
      />
      <Field
        name='contactPoint[0].hasURL'
        component={isReadOnly ? LinkReadonlyField : InputField}
        label={translationsService.translate('schema.contactPoint.hasURLLabel')}
        isOnlyOneSelectedLanguage
      />
    </div>
    <div className='form-group'>
      <Helptext
        title={translationsService.translate(
          'schema.contactPoint.helptext.hasEmail'
        )}
        term='ContactPoint_hasEmail'
      />
      <Field
        name='contactPoint[0].email'
        component={isReadOnly ? InputFieldReadonly : InputField}
        label={translationsService.translate('schema.contactPoint.emailLabel')}
        isOnlyOneSelectedLanguage
      />
    </div>
    <div className='form-group'>
      <Helptext
        title={translationsService.translate(
          'schema.contactPoint.helptext.hasTelephone'
        )}
        term='ContactPoint_hasTelephone'
      />
      <div className='w-50'>
        <Field
          name='contactPoint[0].hasTelephone'
          component={isReadOnly ? InputFieldReadonly : InputField}
          label={translationsService.translate(
            'schema.contactPoint.hasTelephoneLabel'
          )}
          isOnlyOneSelectedLanguage
        />
      </div>
    </div>
  </form>
);

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(FormContactPoint);
