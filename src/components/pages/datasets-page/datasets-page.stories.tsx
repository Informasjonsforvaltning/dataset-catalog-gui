import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DatasetsPage from '.';

export default {
  title: 'Pages/DatasetsPage',
  component: DatasetsPage,
} as ComponentMeta<typeof DatasetsPage>;

const Template: ComponentStory<typeof DatasetsPage> = args => <DatasetsPage {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {};
