import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Button, { Props as ButtonProps } from '.';
import Icon from '../icon';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const AddDataset = Template.bind({});
AddDataset.args = {
  label: 'Legg til ny datasettbeskrivelse',
  startIcon: <Icon name='circlePlusStroke' />,
};

export const HostSpecification = Template.bind({});
HostSpecification.args = {
  label: 'Høst spesifikasjon fra katalog',
  startIcon: <Icon name='circlePlusStroke' />,
};

export const FilterOnPerson = Template.bind({});
FilterOnPerson.args = {
  label: 'Filtrer på person',
  endIcon: <Icon name='chevronDownStroke' />,
};

export const FilterOnStatus = Template.bind({});
FilterOnStatus.args = {
  label: 'Filtrer på status',
  endIcon: <Icon name='chevronDownStroke' />,
};
