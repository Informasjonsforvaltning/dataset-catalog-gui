import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Tag from '.';
import DraftTag from './draft-tag';
import PublishedTag from './published-tag';
import ApprovedTag from './approved-tag';

export default {
  title: 'Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

export const Draft = () => <DraftTag />;

export const Published = () => <PublishedTag />;

export const Approved = () => <ApprovedTag />;
