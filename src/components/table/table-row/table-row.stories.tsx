import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TableRow from '.';
import * as TagStory from '../../tag/tag.stories';
import { Props as TagProps } from '../../tag';

export default {
  title: 'Table/TableRow',
  component: TableRow,
} as ComponentMeta<typeof TableRow>;

const Template: ComponentStory<typeof TableRow> = args => <TableRow {...args} />;

export const DatasetsTableRow1 = Template.bind({});
DatasetsTableRow1.args = {
  row: [
    { text: 'Enhetsregistret', width: '30%' },
    { text: 'Pippi Langstrømpe', width: '22%' },
    { text: 'For 2 timer siden', width: '22%' },
    { text: '1.0', width: '10%' },
    { tag: TagStory.Draft.args as TagProps, width: '16%' },
  ],
};
export const DatasetsTableRow2 = Template.bind({});
DatasetsTableRow2.args = {
  row: [
    { text: 'Foretaksregistret', width: '30%' },
    { text: 'Pippi Langstrømpe', width: '22%' },
    { text: 'I går kl 08:29', width: '22%' },
    { text: '1.1', width: '10%' },
    { tag: TagStory.Published.args as TagProps, width: '16%' },
  ],
};
export const DatasetsTableRow3 = Template.bind({});
DatasetsTableRow3.args = {
  row: [
    { text: 'Kommunalt rapporteringsregister', width: '30%' },
    { text: 'Pippi Langstrømpe', width: '22%' },
    { text: 'For 1 time siden', width: '22%' },
    { text: '1.3', width: '10%' },
    { tag: TagStory.ExPublished.args as TagProps, width: '16%' },
  ],
};
export const DatasetsTableRow4 = Template.bind({});
DatasetsTableRow4.args = {
  row: [
    { text: 'Kompensasjonsordningen for innreisekarantene', width: '30%' },
    { text: 'Pippi Langstrømpe', width: '22%' },
    { text: '23.05.2021 kl 11.08', width: '22%' },
    { text: '1.0', width: '10%' },
    { tag: TagStory.Approved.args as TagProps, width: '16%' },
  ],
};
export const DatasetsTableRow5 = Template.bind({});
DatasetsTableRow5.args = {
  row: [
    { text: 'Kompensasjonsordning for næringslivet - etter august 2020', width: '30%' },
    { text: 'Pippi Langstrømpe', width: '22%' },
    { text: '23.01.2022 kl 13.10', width: '22%' },
    { text: '1.0', width: '10%' },
    { tag: TagStory.NonEditable.args as TagProps, width: '16%' },
  ],
};
export const DatasetsTableRow6 = Template.bind({});
DatasetsTableRow6.args = {
  row: [
    { text: 'Regnskapsregistret', width: '30%' },
    { text: 'Pippi Langstrømpe', width: '22%' },
    { text: 'I går kl 13:29', width: '22%' },
    { text: '1.2', width: '10%' },
    { tag: TagStory.UnderReview.args as TagProps, width: '16%' },
  ],
};
