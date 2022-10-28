import { Colour, theme } from '@fellesdatakatalog/theme';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Button from '.';
import Icon from '../../icon';

export default {
  title: 'Inputs/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'default',
};

export const AddDataset = Template.bind({});
AddDataset.args = {
  type: 'filled',
  name: 'Legg til ny datasettbeskrivelse',
  startIcon: <Icon name='circlePlusStroke' />,
};

export const HostButton = Template.bind({});
HostButton.args = {
  type: 'filled',
  name: 'Høst spesifikasjon fra katalog',
  bg: theme.colour(Colour.BLUE, 'B30'),
  color: theme.colour(Colour.BLUE, 'B60'),
  startIcon: <Icon name='arrowDownStroke' />,
};

export const LastModifiedSearchButton = Template.bind({});
LastModifiedSearchButton.args = {
  type: 'filled',
  name: 'Sist endret av',
  endIcon: <Icon name='chevronDownStroke' />,
};

export const StatusSearchButton = Template.bind({});
StatusSearchButton.args = {
  type: 'filled',
  name: 'Status',
  endIcon: <Icon name='chevronDownStroke' />,
};

export const DeleteButton = Template.bind({});
DeleteButton.args = {
  type: 'link',
  name: 'Slett',
  color: theme.colour(Colour.RED, 'R60'),
  startIcon: <Icon name='circleMinusStroke' />,
};

export const ExpandAllButton = Template.bind({});
ExpandAllButton.args = {
  type: 'link',
  name: 'Vis alle felter',
  startIcon: <Icon name='chevronDoubleDownStroke' />,
};

export const TableUnsortedButton = Template.bind({});
TableUnsortedButton.args = {
  type: 'transparent',
  name: 'Title',
  endIcon: <Icon name='listUnsortedStroke' />,
};

export const LastModifiedSortByButton = Template.bind({});
LastModifiedSortByButton.args = {
  type: 'transparent',
  name: 'Sist endret av',
  endIcon: <Icon name='listAscendingStroke' />,
};

export const LastModifiedSortButton = Template.bind({});
LastModifiedSortButton.args = {
  type: 'transparent',
  name: 'Sist endret',
  endIcon: <Icon name='listDescendingStroke' />,
};
