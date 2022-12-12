import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Table from './';
import * as TableHeaderStory from './table-header/table-headre.stories';
import * as TableRowStory from './table-row/table-row.stories';
import { Props as RowProps } from './table-row';
import { Props as RowCellProps } from './table-row/row-cell';

export default {
  title: 'Table/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = args => <Table {...args} />;

export const DatasetsTable = Template.bind({});
DatasetsTable.args = {
  ...TableHeaderStory.Header.args,
  rows: [
    TableRowStory.DatasetsTableRow1.args as RowProps<RowCellProps>,
    TableRowStory.DatasetsTableRow2.args as RowProps<RowCellProps>,
    TableRowStory.DatasetsTableRow4.args as RowProps<RowCellProps>,
  ],
};
