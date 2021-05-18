import React, { memo, FC } from 'react';
import { compose } from 'redux';
import TagsInput from 'react-tagsinput';
import cx from 'classnames';
import type { WrappedFieldProps } from 'redux-form';

import '../field-input-tags/field-input-tags.scss';

interface ExternalProps extends WrappedFieldProps {
  label?: string;
  showLabel?: boolean;
  fieldLabel?: string;
  language?: string;
  isOnlyOneSelectedLanguage?: boolean;
}

interface Props extends ExternalProps {}

const TagsInputFieldArray: FC<Props> = ({
  input: { name, value, onChange },
  label,
  fieldLabel,
  showLabel,
  language,
  isOnlyOneSelectedLanguage
}) => {
  const tagNodes = Array.isArray(value)
    ? (fieldLabel ? value.map(item => item[fieldLabel]) : value).filter(Boolean)
    : [];

  const handleChange = (tags: any) =>
    onChange(
      (fieldLabel
        ? tags.map((item: any) => ({ [fieldLabel]: item }))
        : tags
      ).filter(Boolean)
    );

  return (
    <div className={cx('pl-2', { 'multilingual-field': !!language })}>
      <label className='fdk-form-label w-100' htmlFor={name}>
        {showLabel ? label : null}
        {language && !isOnlyOneSelectedLanguage && (
          <span className='language-indicator'>{language}</span>
        )}
        <TagsInput
          value={tagNodes}
          className='fdk-reg-input-tags'
          inputProps={{ placeholder: '' }}
          onChange={handleChange}
          addOnBlur
        />
      </label>
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(TagsInputFieldArray);
