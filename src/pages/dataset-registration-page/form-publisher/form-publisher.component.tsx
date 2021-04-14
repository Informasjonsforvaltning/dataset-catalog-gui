import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import Translation from '../../../components/translation';
import Helptext from '../../../components/helptext/helptext.component';
import { SearchPublisher } from './search-publisher/search-publisher.component';
import PublisherField from './field-publisher/field-publisher.component';

interface ExternalProps {
  datasetItem: any;
}

interface Props extends ExternalProps, TranslationsProps {}

const FormPublisher: FC<Props> = ({
  datasetItem: { publisher },
  translationsService
}) => {
  const [chosenPublisher, setChosenPublisher] = useState({});

  return (
    <>
      <div className='form-group'>
        <div className='mb-5'>
          <span>
            <Translation id='schema.publisher.registerBehalfOf' />{' '}
            {translationsService.translate(publisher.prefLabel) ||
              publisher.name}
          </span>
        </div>
        <Helptext
          title={translationsService.translate(
            'schema.publisher.helptext.title'
          )}
        />
        <label className='fdk-form-label mb-2' htmlFor='publisher'>
          {translationsService.translate('schema.publisher.searchOrgNr')}
        </label>
        <div className='d-flex'>
          <SearchPublisher onChosenPublisher={setChosenPublisher} />
          <form>
            <Field
              name='publisher'
              component={PublisherField}
              publisher={chosenPublisher}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(FormPublisher);
