import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Button, { Props as ButtonProps } from '.';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const AddDataset = Template.bind({});
AddDataset.args = {
  style: { backgroundColor: '#335380' },
  label: 'Legg til ny datasettbeskrivelse',
  startIcon: React.createElement(AddCircleOutlineIcon),
};

export const HostSpecification = Template.bind({});
HostSpecification.args = {
  style: { backgroundColor: '#D5E1F2', color: '#335380' },
  label: 'Høst spesifikasjon fra katalog',
  startIcon: React.createElement(ArrowDownwardIcon),
};

export const FilterOnPerson = Template.bind({});
FilterOnPerson.args = {
  style: { backgroundColor: '#D5E1F2', color: '#335380' },
  label: 'Filtrer på person',
  endIcon: React.createElement(KeyboardArrowDownIcon),
};

export const FilterOnStatus = Template.bind({});
FilterOnStatus.args = {
  style: { backgroundColor: '#D5E1F2', color: '#335380' },
  label: 'Filtrer på status',
  endIcon: React.createElement(KeyboardArrowDownIcon),
};
