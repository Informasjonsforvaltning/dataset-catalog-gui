import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tag from '.';
import TagFacesIcon from '@mui/icons-material/TagFaces';

export default {
  title: 'Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = args => <Tag {...args} />;

export const Draft = Template.bind({});
Draft.args = {
  text: 'Utkast',
  bgColor: '#F0F3F7',
  icon: React.createElement(TagFacesIcon),
};
export const Published = Template.bind({});
Published.args = {
  text: 'Publisert',
  bgColor: '#335380',
  icon: React.createElement(TagFacesIcon),
};
export const ExPublished = Template.bind({});
ExPublished.args = {
  text: 'EksPublisert',
  bgColor: '#F0F3F7',
  icon: React.createElement(TagFacesIcon),
};
export const Approved = Template.bind({});
Approved.args = {
  text: 'Godkjent',
  bgColor: '#D5E1F2',
  icon: React.createElement(TagFacesIcon),
};
export const NonEditable = Template.bind({});
NonEditable.args = {
  text: 'Ikke redigerbar',
  bgColor: '#F0F3F7',
  icon: React.createElement(TagFacesIcon),
};
export const UnderReview = Template.bind({});
UnderReview.args = {
  text: 'Til høring',
  bgColor: '#F0F3F7',
  icon: React.createElement(TagFacesIcon),
};
