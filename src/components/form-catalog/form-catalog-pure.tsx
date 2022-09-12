import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';
import cx from 'classnames';
import { Collapse } from 'reactstrap';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Translation from '../translation';
import Helptext from '../helptext/helptext.component';
import InputTitleField from '../fields/field-input-title/field-input-title.component';
import TextAreaField from '../fields/field-textarea/field-textarea.component';
import { PencilInlineIcon } from '../../fdk-icons/icons';

interface ExternalProps {
  initialValues?: any;
  values?: any;
  isReadOnly?: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const FormCatalog: FC<Props> = ({
  initialValues: { title, publisher },
  values,
  isReadOnly,
  translationsService
}) => {
  const [collapseTitle, setCollapseTitle] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const toggleTitle = () => setCollapseTitle(!collapseTitle);

  const toggleDescription = () => setCollapse(!collapse);

  const collapseClass = cx(
    'fdk-reg_collapse',
    'fdk-reg_backgroundDefault',
    'fdk-datasets-description',
    {
      'fdk-reg_collapse_open': collapse
    }
  );

  const fieldClass = cx('fdk-title-input', {
    'w-100': collapseTitle
  });

  return (
    <form className='mb-5 fdk-reg-catalogs'>
      <div className='d-flex align-items-center justify-content-between'>
        {title && title.nb && !collapseTitle && (
          <h1 className='w-75 fdk-text-strong'>
            <Translation object={title} />
          </h1>
        )}
        {!isReadOnly && (
          <div className={fieldClass}>
            <Field
              name={`title.${translationsService.getLanguage()}`}
              component={InputTitleField}
              hideInput={collapseTitle}
              onToggleTitle={toggleTitle}
            />
          </div>
        )}
      </div>

      {publisher && publisher.name && (
        <div className='fdk-reg-datasets-publisher mt-2 mb-4'>
          <Translation id='schema.catalog.ownedByLabel' /> {publisher.name}
        </div>
      )}

      <div className={collapseClass}>
        <div className='d-flex justify-content-between w-100'>
          <div className='d-flex fdk-color-neutral-darkest'>
            <Translation object={values.description} />
          </div>
          {!isReadOnly && (
            <button
              type='button'
              onClick={e => {
                e.preventDefault();
                toggleDescription();
              }}
            >
              <PencilInlineIcon />
              <Translation id='schema.catalog.editDescriptionLabel' />
            </button>
          )}
        </div>
        {!isReadOnly && (
          <Collapse className='mt-3' isOpen={collapse}>
            <div className='form-group'>
              <Helptext
                title={translationsService.translate(
                  'schema.catalog.helptext.title'
                )}
                required
                term='Catalog_title'
              />
              <Field
                name={`description.${translationsService.getLanguage()}`}
                component={TextAreaField}
                label={translationsService.translate(
                  'schema.common.descriptionLabel'
                )}
              />
            </div>
          </Collapse>
        )}
      </div>
    </form>
  );
};

export default compose<FC<ExternalProps>>(memo, withTranslations)(FormCatalog);
