import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputField from '.';
import Icon from '../../icon';

export default {
  title: 'Inputs/InputField',
  component: InputField,
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = args => <InputField {...args} />;

export const DatasetSearchField = Template.bind({});
DatasetSearchField.args = {};

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
  startIcon: <Icon name='circlePlusStroke' />,
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
  endIcon: <Icon name='magnifyingGlassStroke' />,
};

export const WithTextIcon = Template.bind({});
WithTextIcon.args = {
  startIcon: <Icon type='textIcon' text='nb' />,
};

export const WithError = Template.bind({});
WithError.args = {
  error: true,
};
