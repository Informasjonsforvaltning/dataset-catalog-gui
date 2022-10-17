import React from 'react';

import ApprovedTag from '../../components/tag/approved-tag';
import DraftTag from '../../components/tag/draft-tag';
import PublishedTag from '../../components/tag/published-tag';
import { RegistrationStatus } from '../types/enums';

const getTag = (name: string) => {
  switch (name) {
    case RegistrationStatus.PUBLISH:
      return <PublishedTag />;
    case RegistrationStatus.DRAFT:
      return <DraftTag />;
    case RegistrationStatus.APPROVE:
      return <ApprovedTag />;
    default:
      return <></>;
  }
};

export default getTag;
