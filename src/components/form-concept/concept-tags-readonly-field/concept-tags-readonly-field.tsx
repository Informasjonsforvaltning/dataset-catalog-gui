import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';

interface ExternalProps {
  languages?: any[];
}

interface Props extends ExternalProps, WrappedFieldProps {}

const ConceptTagReadOnlyField: FC<Props> = ({ input, languages }) => {
  const isOnlyOneSelectedLanguage =
    languages?.filter(({ selected }) => selected).length === 1;

  const concepts = input?.value;
  const langArray: any = [];

  langArray.nb = concepts
    .map((value: any) => {
      if (value.prefLabel.nb || value.prefLabel.no) {
        return value.prefLabel.nb || value.prefLabel.no;
      }
      return null;
    })
    .filter(Boolean)
    .join(', ');

  langArray.nn = concepts
    .map((value: any) => {
      if (value.prefLabel.nn) {
        return value.prefLabel.nn;
      }
      return null;
    })
    .filter(Boolean)
    .join(', ');

  langArray.en = concepts
    .map((value: any) => {
      if (value.prefLabel.en) {
        return value.prefLabel.en;
      }
      return null;
    })
    .filter(Boolean)
    .join(', ');

  return (
    <>
      {languages
        ?.filter(({ selected }) => selected)
        .map(l => (
          <div key={l.code} className='fdk-form-label w-100'>
            <div className='readonly-language-field'>
              {!isOnlyOneSelectedLanguage && (
                <div className='p-2'>
                  <div className='indicator'>{l.code}</div>
                </div>
              )}
              <div className='read-only-text'>{langArray[l.code]}</div>
            </div>
          </div>
        ))}
    </>
  );
};

export default compose<FC<ExternalProps>>(memo)(ConceptTagReadOnlyField);
