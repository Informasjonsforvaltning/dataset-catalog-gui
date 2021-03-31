import LocalizedStrings from 'react-localization';

import nb from '../../l10n/nb.json';

import type { ChangeLanguageCallback, Tokens } from './types';
import { Language } from './enums';

class TranslationsService {
  private language: Language;

  private changeLanguageCallback?: ChangeLanguageCallback;

  private readonly translations = new LocalizedStrings({
    [Language.NB]: nb
  });

  public async init(
    language: Language,
    callback?: ChangeLanguageCallback
  ): Promise<void> {
    this.language = language;
    this.changeLanguageCallback = callback;

    this.translations.setLanguage(this.language);
  }

  public getLanguage(): Language {
    return this.language;
  }

  public translate(
    object: string | Record<Language, string>,
    tokens?: Tokens
  ): string {
    if (typeof object === 'string') {
      return this.translateUsingKey(object, tokens);
    }

    if (typeof object === 'object') {
      return this.translateUsingObject(object);
    }

    return '';
  }

  public changeLanguage(language: Language): void {
    this.language = language;

    this.translations.setLanguage(this.language);

    this.changeLanguageCallback?.(this.language);
  }

  private format(str: string, tokens: Tokens): string {
    return Object.entries(tokens).reduce(
      (previous, [token, value]) =>
        previous.replace(new RegExp(`:${token}`, 'g'), value?.toString() ?? ''),
      str
    );
  }

  private translateUsingKey(key: string, tokens: Tokens = {}): string {
    const translation = key
      .split('.')
      .reduce(
        (previous, current) => (previous as any)?.[current],
        this.translations
      );

    return this.translations
      .formatString(
        this.format(typeof translation === 'string' ? translation : key, tokens)
      )
      .toString();
  }

  private translateUsingObject(object: Record<Language, string>): string {
    return (
      object[this.language] ??
      object[Language.NB] ??
      object[Language.NN] ??
      object[Language.EN] ??
      ''
    );
  }
}

export default new TranslationsService();
export { Language } from './enums';
export type { Tokens } from './types';
