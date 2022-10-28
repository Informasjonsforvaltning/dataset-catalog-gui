import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Icon from '../../components/icon';
import Button from '../../components/inputs/button';
import Table from '../../components/table';
import { useDatasetsContext } from '../../context/datasets-context';
import getDate from '../../utils/helpers/date-and-time-formatter';
import getTag from '../../utils/helpers/tag-finder';

const PopulatedTable = () => {
  const datasetsState = useDatasetsContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRowClick = (id: string) => navigate(`${location.pathname}/${id}`);

  const colWidths = {
    col_1: '70%',
    col_2: '16%',
    col_3: '14%',
  };

  const cols = [
    {
      sortButton: (
        <Button name='Title' type='transparent' iconPos='right' endIcon={<Icon name='listUnsortedStroke' />} />
      ),
      width: colWidths.col_1,
    },
    {
      sortButton: (
        <Button name='Sist endret' type='transparent' iconPos='right' endIcon={<Icon name='listUnsortedStroke' />} />
      ),
      width: colWidths.col_2,
    },
    {
      sortButton: (
        <Button name='Status' type='transparent' iconPos='right' endIcon={<Icon name='listUnsortedStroke' />} />
      ),
      width: colWidths.col_3,
    },
  ];

  const rows: any[] = datasetsState.datasets.map(dataset => ({
    row: [
      { text: dataset.title?.nb, width: colWidths.col_1 },
      { text: getDate(dataset._lastModified), width: colWidths.col_2 },
      { tag: getTag(dataset.registrationStatus), width: colWidths.col_3 },
    ],
    onRowClick: () => handleRowClick(dataset.id),
  }));

  return <Table rows={rows} cols={cols} />;
};

export default PopulatedTable;
