import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';

interface ExternalProps {
  name: string;
  label: string;
  component: any;
  languages?: any[];
  showLabel?: boolean;
}

interface Props extends ExternalProps {}

const MultilingualField: FC<Props> = ({
  name,
  component,
  languages = [],
  label,
  showLabel
}) => {
  const isOnlyOneSelectedLanguage =
    languages.filter(l => l.selected).length === 1;

  return (
    <>
      {showLabel && label && (
        <label className='fdk-form-label w-100 pl-2 mb-2' htmlFor={name}>
          {label}
        </label>
      )}
      {languages.map(
        ({ code, selected }) =>
          selected && (
            <Field
              key={code}
              name={`${name}.${code}`}
              component={component}
              language={code}
              isOnlyOneSelectedLanguage={isOnlyOneSelectedLanguage}
            />
          )
      )}
    </>
  );
};

export default compose<FC<ExternalProps>>(memo)(MultilingualField);
