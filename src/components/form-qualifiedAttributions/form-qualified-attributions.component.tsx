import React, { memo, FC, useState, useEffect, useRef } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';
import { fromJS } from 'immutable';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import withEnhetsregisteret, {
  Props as EnhetsregisteretProps
} from '../with-enhetsregisteret';

import Helptext from '../helptext/helptext.component';
import QualifiedAttributionsTagsInput from './qualified-attributions-tags-input';

interface Props extends EnhetsregisteretProps, TranslationsProps {
  datasetItem: any;
  isReadOnly: boolean;
}

interface QualifiedAttribution {
  id: string;
  label: string;
}

const FormQualifiedAttributionsPure: FC<Props> = ({
  datasetItem,
  organizations,
  enhetsregisteretActions: { listOrganizationsRequested: listOrganizations },
  isReadOnly,
  translationsService
}) => {
  const previousOrganizations = useRef(organizations);

  const [qualifiedAttributions, setQualifiedAttributions] = useState<
    QualifiedAttribution[]
  >([]);

  useEffect(() => {
    if (datasetItem?.qualifiedAttributions?.length > 0) {
      listOrganizations(datasetItem.qualifiedAttributions);
    }
  }, []);

  useEffect(() => {
    const organizationsMap: any = fromJS(organizations);
    const previousOrganizationsMap: any = fromJS(previousOrganizations.current);
    if (
      datasetItem?.qualifiedAttributions?.length > 0 &&
      organizations.length > 0 &&
      !organizationsMap.equals(previousOrganizationsMap)
    ) {
      setQualifiedAttributions(
        datasetItem.qualifiedAttributions.map((id: string) => {
          const label = organizations.find(
            ({ organisasjonsnummer }) => organisasjonsnummer === id
          )?.navn;

          return { id, label };
        })
      );

      previousOrganizations.current = organizations;
    }
  }, [organizations]);

  return (
    <div className='form-group mb-0'>
      <Helptext
        title={translationsService.translate(
          'schema.qualifiedAttributions.helptext.title'
        )}
      />
      {!isReadOnly && (
        <label className='fdk-form-label mb-2' htmlFor='publisher'>
          {translationsService.translate(
            'schema.qualifiedAttributions.searchOrg'
          )}
        </label>
      )}
      <div className='d-flex'>
        {isReadOnly ? (
          qualifiedAttributions.map(({ label }) => label).join(', ')
        ) : (
          <Field
            name='qualifiedAttributions'
            component={QualifiedAttributionsTagsInput}
            qualifiedAttributions={qualifiedAttributions}
            setQualifiedAttributions={setQualifiedAttributions}
          />
        )}
      </div>
    </div>
  );
};

export const FormQualifiedAttributions = compose<FC>(
  memo,
  withTranslations,
  withEnhetsregisteret
)(FormQualifiedAttributionsPure);
