import React, { memo, FC } from 'react';
import { compose } from 'redux';
import cx from 'classnames';
import { Button } from 'reactstrap';

import Translation from '../translation';

import './language-picker.styles.scss';

interface Language {
  code: string;
  title: string;
  selected: boolean;
}

interface ExternalProps {
  languages: Language[];
  toggleInputLanguage: (language: string) => void;
}

interface Props extends ExternalProps {}

const LanguagePicker: FC<Props> = ({ languages, toggleInputLanguage }) => {
  const shouldDisableLanguage = (code: string) => {
    const selectedLanguages = languages.filter(({ selected }) => selected);
    return selectedLanguages.length === 1 && selectedLanguages[0].code === code;
  };

  return (
    <div className='language-picker'>
      <p>
        <Translation id='lang.choose' />:
      </p>
      <div className='language-button-group'>
        {languages.map(({ code, title, selected }) => (
          <Button
            key={code}
            className={cx('fdk-button border-0', {
              'fdk-bg-color-primary-lighter': !selected,
              'fdk-color-link-darker': !selected,
              'no-shadow': selected
            })}
            color={shouldDisableLanguage(code) ? 'secondary' : 'primary'}
            disabled={shouldDisableLanguage(code)}
            onClick={() => toggleInputLanguage(code)}
          >
            {selected && (
              <img src='/img/icon-checked-white-sm.svg' alt='icon' />
            )}
            {title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(LanguagePicker);
