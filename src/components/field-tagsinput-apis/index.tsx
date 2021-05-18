import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import type { WrappedFieldProps } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import {
  extractSuggestions,
  getDataserviceSuggestions
} from '../../services/api/fulltext-search/suggestions';

interface Props extends WrappedFieldProps, TranslationsProps {}

const InputTagsAPIsField: FC<Props> = ({
  input: { value, onChange },
  translationsService
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [suggestions, setSuggestions] = useState<Tag[]>([]);

  const addTagToInput = (updates: any) =>
    onChange(
      (value || []).concat({
        id: updates.id,
        description: {
          [translationsService.getLanguage()]: updates.name
        },
        endpointDescription: [
          {
            uri: updates.id
          }
        ]
      })
    );

  const removeTagFromInput = (index: number) => {
    value.splice(index, 1);
    onChange(value);
  };

  const loadSuggestions = (q: string) =>
    getDataserviceSuggestions({ q })
      .then(extractSuggestions)
      .then(items =>
        setSuggestions(
          items.map(({ id, title }: any) => ({
            id,
            name: translationsService.translate(title)
          }))
        )
      )
      .catch(() => {});

  const handleDelete = (i: number) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
    removeTagFromInput(i);
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
    addTagToInput(tag);
  };

  useEffect(() => {
    if (value) {
      const accessServices = Array.isArray(value) ? value : [value];

      setTags(
        accessServices.filter(Boolean).map(({ id, description }) => ({
          id,
          name: translationsService.translate(description)
        }))
      );
    }
  }, []);

  return (
    <div className='pl-2'>
      <div className='d-flex align-items-center'>
        <ReactTags
          autofocus={false}
          placeholderText=''
          tags={tags}
          minQueryLength={1}
          suggestions={suggestions}
          onDelete={handleDelete}
          onAddition={handleAddition}
          onInput={loadSuggestions}
        />
      </div>
    </div>
  );
};

export default compose<FC>(memo, withTranslations)(InputTagsAPIsField);
