import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TableHeader, { Props as HeaderProps } from '.';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Props as CellProps } from './header-cell';

export default {
  title: 'TableHeader',
  component: TableHeader,
} as ComponentMeta<typeof TableHeader>;

const Template: ComponentStory<typeof TableHeader> = (args: HeaderProps<CellProps>) => <TableHeader {...args} />;

export const Header = Template.bind({});
Header.args = {
  cols: [
    { title: 'Anbefalt term', icon: React.createElement(AcUnitIcon) },
    { title: 'Sist endret av', icon: React.createElement(AcUnitIcon) },
    { title: 'Versjon', icon: React.createElement(AcUnitIcon) },
    { title: 'Status', icon: React.createElement(AcUnitIcon) },
  ],
};
