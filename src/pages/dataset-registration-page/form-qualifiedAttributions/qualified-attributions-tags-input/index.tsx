import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { WrappedFieldProps } from 'redux-form';
import ReactTags from 'react-tag-autocomplete';

import withEnhetsregisteret, {
  Props as EnhetsregisteretProps
} from '../../../../components/with-enhetsregisteret';

import type { QualifiedAttribution } from '../form-qualified-attributions.component';

interface Props extends EnhetsregisteretProps, WrappedFieldProps {
  qualifiedAttributions: QualifiedAttribution[];
  setQualifiedAttributions: (ids: QualifiedAttribution[]) => void;
  searchOrganizations: any;
}

const QualifiedAttributionsTagsInput: FC<Props> = ({
  input: { onChange },
  organizationSuggestions,
  enhetsregisteretActions: {
    searchOrganizationsRequested: searchOrganizations
  },
  qualifiedAttributions,
  setQualifiedAttributions
}) => {
  const addQualifiedAttribution = (
    qualifiedAttribution: QualifiedAttribution
  ) => {
    const newQualifiedAttributions = [
      ...qualifiedAttributions,
      qualifiedAttribution
    ];
    setQualifiedAttributions(newQualifiedAttributions);
    onChange(newQualifiedAttributions.map(({ id }) => id));
  };

  const deleteQualifiedAttribution = (deleteIndex: number) => {
    const newQualifiedAttributions = qualifiedAttributions.filter(
      (_, index) => deleteIndex !== index
    );
    setQualifiedAttributions(newQualifiedAttributions);
    onChange(newQualifiedAttributions.map(({ id }) => id));
  };

  return (
    <ReactTags
      tags={qualifiedAttributions.map(({ id, label }) => ({
        id,
        name: label ?? id
      }))}
      suggestionsFilter={({ id = '', name = '' }, query) =>
        id.toLowerCase().startsWith(query) ||
        name.toLowerCase().startsWith(query)
      }
      suggestions={organizationSuggestions.map(
        ({ organisasjonsnummer, navn }) => ({
          id: organisasjonsnummer,
          name: `${navn} (${organisasjonsnummer})`,
          label: navn
        })
      )}
      handleInputChange={query => searchOrganizations(query, 5)}
      handleDelete={deleteQualifiedAttribution}
      handleAddition={addQualifiedAttribution}
      minQueryLength={1}
      placeholder=""
    />
  );
};

export default compose<FC>(
  memo,
  withEnhetsregisteret
)(QualifiedAttributionsTagsInput);
