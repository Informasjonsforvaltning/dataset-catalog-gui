import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Icon from '../../components/icon';
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
    col_1: '30%',
    col_2: '22%',
    col_3: '22%',
    col_4: '10%',
    col_5: '16%',
  };

  const cols = [
    { title: 'Tittel', icon: <Icon name='listUnsortedStroke' />, width: colWidths.col_1 },
    { title: 'Sist endret av', icon: <Icon name='listUnsortedStroke' />, width: colWidths.col_2 },
    { title: 'Sist endret', icon: <Icon name='listUnsortedStroke' />, width: colWidths.col_3 },
    { title: 'Versjon', icon: <Icon name='listUnsortedStroke' />, width: colWidths.col_4 },
    { title: 'Status', icon: <Icon name='listUnsortedStroke' />, width: colWidths.col_5 },
  ];

  const rows: any[] = datasetsState.datasets.map(dataset => ({
    row: [
      { text: dataset.title?.nb, width: colWidths.col_1 },
      { text: 'Pippi Langstrømpe', width: colWidths.col_2 },
      { text: getDate(dataset._lastModified), width: colWidths.col_3 },
      { text: '1.0', width: colWidths.col_4 },
      { tag: getTag(dataset.registrationStatus), width: colWidths.col_5 },
    ],
    onRowClick: () => handleRowClick(dataset.id),
  }));

  return <Table rows={rows} cols={cols} />;
};

export default PopulatedTable;
