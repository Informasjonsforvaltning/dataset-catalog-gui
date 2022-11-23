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
  btnType: 'default',
};

export const AddDataset = Template.bind({});
AddDataset.args = {
  btnType: 'filled',
  name: 'Legg til ny datasettbeskrivelse',
  startIcon: <Icon name='circlePlusStroke' />,
};

export const HostButton = Template.bind({});
HostButton.args = {
  btnType: 'filled',
  name: 'Høst spesifikasjon fra katalog',
  bg: theme.colour(Colour.BLUE, 'B30'),
  btnColor: theme.colour(Colour.BLUE, 'B60'),
  startIcon: <Icon name='arrowDownStroke' />,
};

export const LastModifiedSearchButton = Template.bind({});
LastModifiedSearchButton.args = {
  btnType: 'filled',
  name: 'Sist endret av',
  bg: theme.colour(Colour.BLUE, 'B30'),
  btnColor: theme.colour(Colour.BLUE, 'B60'),
  endIcon: <Icon name='chevronDownStroke' />,
};

export const StatusSearchButton = Template.bind({});
StatusSearchButton.args = {
  btnType: 'filled',
  name: 'Status',
  bg: theme.colour(Colour.BLUE, 'B30'),
  btnColor: theme.colour(Colour.BLUE, 'B60'),
  endIcon: <Icon name='chevronDownStroke' />,
};

export const DeleteButton = Template.bind({});
DeleteButton.args = {
  btnType: 'link',
  name: 'Slett',
  btnColor: theme.colour(Colour.RED, 'R60'),
  startIcon: <Icon name='circleMinusStroke' />,
};

export const ExpandAllButton = Template.bind({});
ExpandAllButton.args = {
  btnType: 'link',
  name: 'Vis alle felter',
  startIcon: <Icon name='chevronDoubleDownStroke' />,
};

export const TableUnsortedButton = Template.bind({});
TableUnsortedButton.args = {
  btnType: 'transparent',
  name: 'Title',
  endIcon: <Icon name='listUnsortedStroke' />,
};

export const LastModifiedSortByButton = Template.bind({});
LastModifiedSortByButton.args = {
  btnType: 'transparent',
  name: 'Sist endret av',
  endIcon: <Icon name='listAscendingStroke' />,
};

export const LastModifiedSortButton = Template.bind({});
LastModifiedSortButton.args = {
  btnType: 'transparent',
  name: 'Sist endret',
  endIcon: <Icon name='listDescendingStroke' />,
};
