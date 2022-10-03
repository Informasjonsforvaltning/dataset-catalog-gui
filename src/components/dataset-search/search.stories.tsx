import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Search from '.';

export default {
  title: 'Search',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = args => <Search {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {};
