import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TableHeader, { Props as HeaderProps } from '.';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Props as CellProps } from './header-cell';

export default {
  title: 'Table/TableHeader',
  component: TableHeader,
} as ComponentMeta<typeof TableHeader>;

const Template: ComponentStory<typeof TableHeader> = (args: HeaderProps<CellProps>) => <TableHeader {...args} />;

export const Header = Template.bind({});
Header.args = {
  cols: [
    { title: 'Tittel', icon: React.createElement(AcUnitIcon), width: '30%' },
    { title: 'Sist endret av', icon: React.createElement(AcUnitIcon), width: '22%' },
    { title: 'Sist endret', icon: React.createElement(AcUnitIcon), width: '22%' },
    { title: 'Versjon', icon: React.createElement(AcUnitIcon), width: '10%' },
    { title: 'Status', icon: React.createElement(AcUnitIcon), width: '16%' },
  ],
};
