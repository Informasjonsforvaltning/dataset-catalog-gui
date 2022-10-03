import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Tag from '.';
import UnderReviewTag from './under-review-tag';
import NonEditableTag from './non-editable-tag';
import DraftTag from './draft-tag';
import PublishedTag from './published-tag';
import ExPublishedTag from './ex-published-tag';
import ApprovedTag from './approved-tag';

export default {
  title: 'Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

export const Draft = () => <DraftTag />;

export const Published = () => <PublishedTag />;

export const ExPublished = () => <ExPublishedTag />;

export const Approved = () => <ApprovedTag />;

export const NonEditable = () => <NonEditableTag />;

export const UnderReview = () => <UnderReviewTag />;
