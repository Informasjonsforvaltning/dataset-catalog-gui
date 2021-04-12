import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import moment from 'moment';

import Translation from '../../translation';

import RegistrationStatus from '../../registration-status/registration-status.component';

import './list-item.scss';

interface ExternalProps {
  title?: string;
  status?: 'DRAFT' | 'APPROVE' | 'PUBLISH';
  path: string;
  statusNew?: boolean;
  lastModified?: string;
}

interface Props extends ExternalProps {}

const ListItem: FC<Props> = ({
  title,
  status,
  path,
  statusNew,
  lastModified
}) =>
  status ? (
    <div className='fdk-list-item d-flex'>
      <Link className='w-100' to={path}>
        <div className='d-flex justify-content-between'>
          <span
            className={cx('w-50', 'fdk-text-size-small', {
              'fdk-color-neutral-darkest': !title
            })}
          >
            {title || <Translation id='listItems.missingTitle' />}
          </span>
          <div className='d-flex justify-content-end w-50'>
            <span className='d-flex justify-content-left w-25'>
              {moment(lastModified).format('L')}
            </span>
            <div className='d-flex justify-content-left w-25'>
              <RegistrationStatus registrationStatus={status} />
              {statusNew && (
                <span className='badge badge-pill badge-success'>
                  <Translation id='listItems.statusNew' />
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  ) : null;

export default compose<FC<ExternalProps>>(memo)(ListItem);
