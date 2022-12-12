import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TableRow from '.';

import ApprovedTag from '../../tag/approved-tag';
import DraftTag from '../../tag/draft-tag';
import PublishedTag from '../../tag/published-tag';

export default {
  title: 'Table/TableRow',
  component: TableRow,
} as ComponentMeta<typeof TableRow>;

const Template: ComponentStory<typeof TableRow> = args => <TableRow {...args} />;

const colWidths = {
  col_1: '70%',
  col_2: '16%',
  col_3: '14%',
};

export const DatasetsTableRow1 = Template.bind({});
DatasetsTableRow1.args = {
  row: [
    { text: 'Enhetsregistret', width: colWidths.col_1 },
    { text: 'For 2 timer siden', width: colWidths.col_2 },
    { tag: React.createElement(DraftTag), width: colWidths.col_3 },
  ],
};
export const DatasetsTableRow2 = Template.bind({});
DatasetsTableRow2.args = {
  row: [
    { text: 'Foretaksregistret', width: colWidths.col_1 },

    { text: 'I går kl 08:29', width: colWidths.col_2 },
    { tag: React.createElement(PublishedTag), width: colWidths.col_3 },
  ],
};
export const DatasetsTableRow4 = Template.bind({});
DatasetsTableRow4.args = {
  row: [
    { text: 'Kompensasjonsordningen for innreisekarantene', width: colWidths.col_1 },
    { text: '23.05.2021 kl 11.08', width: colWidths.col_2 },
    { tag: React.createElement(ApprovedTag), width: colWidths.col_3 },
  ],
};
