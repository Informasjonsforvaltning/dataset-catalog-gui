import React, { memo, FC } from 'react';
import { compose } from 'redux';

import Translation from '../translation';

import DraftStatusSVG from '../../images/icon-draft-circle-md.svg';
import ApprovedStatusSVG from '../../images/icon-approved-circle-md.svg';
import PublishedStatusSVG from '../../images/icon-published-circle-md.svg';

import './registration-status.scss';

interface ExternalProps {
  registrationStatus?: 'DRAFT' | 'APPROVE' | 'PUBLISH';
}

interface Props extends ExternalProps {}

const statusAndIcon = {
  DRAFT: {
    icon: <DraftStatusSVG />,
    label: 'formStatus.draft'
  },
  APPROVE: {
    icon: <ApprovedStatusSVG />,
    label: 'formStatus.approveChecked'
  },
  PUBLISH: {
    icon: <PublishedStatusSVG />,
    label: 'formStatus.publishChecked'
  }
};

const RegistrationStatus: FC<Props> = ({ registrationStatus = 'DRAFT' }) => {
  const { icon, label } = statusAndIcon[registrationStatus];

  return (
    <div className='fdk-registration-status'>
      {icon}
      <span>
        <Translation id={label} />
      </span>
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(RegistrationStatus);
