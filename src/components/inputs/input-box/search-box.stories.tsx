import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputBox from '.';

export default {
  title: 'Inputs/InputBox',
  component: InputBox,
} as ComponentMeta<typeof InputBox>;

const Template: ComponentStory<typeof InputBox> = args => <InputBox {...args} />;

export const DatasetSearchBox = Template.bind({});
DatasetSearchBox.args = {
  label: 'Søk etter datasettbeskrivelse',
};
