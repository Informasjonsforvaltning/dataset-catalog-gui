import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TableHeader, { Props as HeaderProps } from '.';
import Icon from '../../icon';
import Button from '../../inputs/button';

export default {
  title: 'Table/TableHeader',
  component: TableHeader,
} as ComponentMeta<typeof TableHeader>;

const Template: ComponentStory<typeof TableHeader> = (args: HeaderProps) => <TableHeader {...args} />;

export const Header = Template.bind({});
Header.args = {
  cols: [
    {
      sortButton: (
        <Button name='Title' btnType='transparent' iconPos='right' endIcon={<Icon name='listUnsortedStroke' />} />
      ),
      width: '70%',
    },
    {
      sortButton: (
        <Button name='Sist endret' btnType='transparent' iconPos='right' endIcon={<Icon name='listUnsortedStroke' />} />
      ),
      width: '16%',
    },
    {
      sortButton: (
        <Button name='Status' btnType='transparent' iconPos='right' endIcon={<Icon name='listUnsortedStroke' />} />
      ),
      width: '14%',
    },
  ],
};
