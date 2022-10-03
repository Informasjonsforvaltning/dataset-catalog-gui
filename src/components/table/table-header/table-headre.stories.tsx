import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TableHeader, { Props as HeaderProps } from '.';
import { Props as CellProps } from './header-cell';
import Icon from '../../icon';

export default {
  title: 'Table/TableHeader',
  component: TableHeader,
} as ComponentMeta<typeof TableHeader>;

const Template: ComponentStory<typeof TableHeader> = (args: HeaderProps<CellProps>) => <TableHeader {...args} />;

export const Header = Template.bind({});
Header.args = {
  cols: [
    { title: 'Tittel', icon: <Icon name='listUnsortedStroke' />, width: '30%' },
    { title: 'Sist endret av', icon: <Icon name='listUnsortedStroke' />, width: '22%' },
    { title: 'Sist endret', icon: <Icon name='listUnsortedStroke' />, width: '22%' },
    { title: 'Versjon', icon: <Icon name='listUnsortedStroke' />, width: '10%' },
    { title: 'Status', icon: <Icon name='listUnsortedStroke' />, width: '16%' },
  ],
};
