import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Breadcrumbs from '.';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = args => <Breadcrumbs {...args} />;

export const DatasetsCatalog = Template.bind({});
DatasetsCatalog.args = {};
DatasetsCatalog.decorators = [
  Story => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  ),
];
