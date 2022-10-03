import React, { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import ApprovedTag from '../../tag/approved-tag';
import DraftTag from '../../tag/draft-tag';
import ExPublishedTag from '../../tag/ex-published-tag';
import NonEditableTag from '../../tag/non-editable-tag';
import PublishedTag from '../../tag/published-tag';
import UnderReviewTag from '../../tag/under-review-tag';

import SC from './styled';
import { localization } from '../../../utils/language/localization';
import Button from '../../button';
import Search from '../../dataset-search';
import Table from '../../table';
import Icon from '../../icon';

const DatasetsPage: FC = () => {
  const { catalogId } = useParams();

  // temporary test data
  const tempCols = [
    { title: 'Tittel', icon: <Icon name='listUnsortedStroke' />, width: '30%' },
    { title: 'Sist endret av', icon: <Icon name='listUnsortedStroke' />, width: '22%' },
    { title: 'Sist endret', icon: <Icon name='listUnsortedStroke' />, width: '22%' },
    { title: 'Versjon', icon: <Icon name='listUnsortedStroke' />, width: '10%' },
    { title: 'Status', icon: <Icon name='listUnsortedStroke' />, width: '16%' },
  ];

  // temporary test data
  const tempRows = [
    {
      row: [
        { text: 'Enhetsregistret', width: '30%' },
        { text: 'Pippi Langstrømpe', width: '22%' },
        { text: 'For 2 timer siden', width: '22%' },
        { text: '1.0', width: '10%' },
        { tag: React.createElement(DraftTag), width: '16%' },
      ],
    },

    {
      row: [
        { text: 'Foretaksregistret', width: '30%' },
        { text: 'Pippi Langstrømpe', width: '22%' },
        { text: 'I går kl 08:29', width: '22%' },
        { text: '1.1', width: '10%' },
        { tag: React.createElement(PublishedTag), width: '16%' },
      ],
    },

    {
      row: [
        { text: 'Kommunalt rapporteringsregister', width: '30%' },
        { text: 'Pippi Langstrømpe', width: '22%' },
        { text: 'For 1 time siden', width: '22%' },
        { text: '1.3', width: '10%' },
        { tag: React.createElement(ExPublishedTag), width: '16%' },
      ],
    },
    {
      row: [
        { text: 'Kompensasjonsordningen for innreisekarantene', width: '30%' },
        { text: 'Pippi Langstrømpe', width: '22%' },
        { text: '23.05.2021 kl 11.08', width: '22%' },
        { text: '1.0', width: '10%' },
        { tag: React.createElement(ApprovedTag), width: '16%' },
      ],
    },

    {
      row: [
        { text: 'Kompensasjonsordning for næringslivet - etter august 2020', width: '30%' },
        { text: 'Pippi Langstrømpe', width: '22%' },
        { text: '23.01.2022 kl 13.10', width: '22%' },
        { text: '1.0', width: '10%' },
        { tag: React.createElement(NonEditableTag), width: '16%' },
      ],
    },
    {
      row: [
        { text: 'Regnskapsregistret', width: '30%' },
        { text: 'Pippi Langstrømpe', width: '22%' },
        { text: 'I går kl 13:29', width: '22%' },
        { text: '1.2', width: '10%' },
        { tag: React.createElement(UnderReviewTag), width: '16%' },
      ],
    },
  ];

  return (
    <>
      <SC.Page>
        <SC.Title>{localization.catalogType}</SC.Title>
        <SC.SubTitle>{catalogId}</SC.SubTitle>
        <SC.AddDiv>
          <Button label={localization.btnAddNewDataset} startIcon={<Icon name='circlePlusStroke' />} />
          <SC.HostButton label={localization.btnHostSpecification} startIcon={<Icon name='arrowDownStroke' />} />
        </SC.AddDiv>
        <Search />
        <Table rows={tempRows} cols={tempCols} />
      </SC.Page>
      <Outlet />
    </>
  );
};

export default DatasetsPage;
