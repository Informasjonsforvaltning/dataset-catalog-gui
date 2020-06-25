import React, { useState } from 'react';
import { Field } from 'redux-form';
import ReactTags from 'react-tag-autocomplete';

import { resolve } from 'react-resolver';
import { memoizedGetOrganizationList } from '../../../services/api/organization-api/host';
import localization from '../../../services/localization';
import { Helptext } from '../../../components/helptext/helptext.component';
import { getTranslateText } from '../../../services/translateText';

const FormQualifiedAttributionsPure = ({
  datasetItem,
  organizations = [],
  isReadOnly
}) => {
  const [qualifiedAttributions, setQualifiedAttributions] = useState(
    organizations
      .filter(({ organizationId }) =>
        datasetItem.qualifiedAttributions?.includes(organizationId)
      )
      .map(({ organizationId: id, prefLabel, name }) => ({
        id,
        label: getTranslateText(prefLabel) ?? name
      }))
  );

  return (
    <div className="form-group">
      <Helptext
        title={localization.schema.qualifiedAttributions.helptext.title}
      />
      {!isReadOnly && (
        <label className="fdk-form-label mb-2" htmlFor="publisher">
          {localization.schema.qualifiedAttributions.searchOrgNr}
        </label>
      )}
      <div className="d-flex">
        {isReadOnly ? (
          qualifiedAttributions.map(({ label }) => label).join(', ')
        ) : (
          <Field
            name="qualifiedAttributions"
            component={({ input: { onChange } }) => {
              const addQualifiedAttribution = (qualifiedAttribution: any) => {
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
                  suggestionsFilter={(suggestion, query) =>
                    suggestion.id.startsWith(query)
                  }
                  suggestions={organizations
                    .filter(
                      ({ organizationId }) =>
                        !datasetItem.qualifiedAttributions.includes(
                          organizationId
                        )
                    )
                    .map(({ organizationId, prefLabel, name }) => ({
                      id: organizationId,
                      name: `${getTranslateText(prefLabel) ??
                        name} (${organizationId})`,
                      label: getTranslateText(prefLabel) ?? name
                    }))}
                  handleDelete={deleteQualifiedAttribution}
                  handleAddition={addQualifiedAttribution}
                  minQueryLength={1}
                  placeholder=""
                />
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

const mapProps = {
  organizations: memoizedGetOrganizationList
};

export const FormQualifiedAttributions = resolve(mapProps)(
  FormQualifiedAttributionsPure
);
