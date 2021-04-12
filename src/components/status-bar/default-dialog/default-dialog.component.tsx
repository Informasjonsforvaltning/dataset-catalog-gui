import React, { memo, FC } from 'react';
import { compose } from 'redux';
import cx from 'classnames';
import { Button } from 'reactstrap';
import moment from 'moment';

import {
  isApproved,
  isDraft,
  isPublished
} from '../../../lib/registration-status';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import Translation from '../../translation';

import ButtonRegistrationStatus from './button-registration-status/button-registration-status.component';

interface ExternalProps {
  onShowValidationError: () => void;
  onShowConfirmDelete: () => void;
  type: 'dataset' | 'api';
  isSaving: boolean;
  error?: any;
  justPublishedOrUnPublished: boolean;
  allowPublish: boolean;
  onChange: (status: string) => void;
  registrationStatus: string;
  onShowConfirmDraft: () => void;
  onShowConfirmApprove: () => void;
  lastSaved?: string;
}

interface Props extends ExternalProps, TranslationsProps {}

const DefaultDialog: FC<Props> = ({
  onShowValidationError,
  onShowConfirmDelete,
  justPublishedOrUnPublished,
  type,
  isSaving,
  allowPublish,
  error,
  onChange,
  registrationStatus,
  onShowConfirmDraft,
  onShowConfirmApprove,
  lastSaved,
  translationsService
}) => {
  let messageClass;
  let message;
  if (justPublishedOrUnPublished) {
    messageClass = 'alert-success';

    if (isPublished(registrationStatus)) {
      message = `${translationsService.translate(
        `formStatus.type.${type}`
      )} ${translationsService.translate('formStatus.published')}.`;
    } else if (isApproved(registrationStatus)) {
      message = `${translationsService.translate(
        `formStatus.type.${type}`
      )} ${translationsService.translate('formStatus.approved')}.`;
    } else {
      message = `${translationsService.translate(
        `formStatus.type.${type}`
      )} ${translationsService.translate('formStatus.isDraft')}.`;
    }
  }
  messageClass = 'alert-primary';
  message = isSaving
    ? `${translationsService.translate('formStatus.isSaving')}...`
    : `${translationsService.translate('formStatus.changesUpdated')} ${moment(
        lastSaved
      ).format('LLLL')}.`;

  return (
    <div
      className={cx(
        'form-status-bar',
        'd-flex',
        'align-items-center',
        'justify-content-between',
        messageClass
      )}
    >
      <div>{message}</div>
      <div className='d-flex'>
        {type === 'api' && (
          <ButtonRegistrationStatus
            onChange={onChange}
            published={isPublished(registrationStatus)}
            allowPublish={allowPublish}
            onShowValidationError={onShowValidationError}
          />
        )}
        {type === 'dataset' && (
          <>
            <Button
              id='dataset-setPublish-button'
              className='fdk-button'
              color={isDraft(registrationStatus) ? 'dark' : 'primary'}
              style={{ border: 0, borderRadius: 0 }}
              onClick={onShowConfirmDraft}
            >
              <i className='fa fa-pencil mr-2' />
              <Translation id='formStatus.draft' />
            </Button>
            <Button
              id='dataset-setPublish-button'
              className='fdk-button'
              color={isApproved(registrationStatus) ? 'dark' : 'primary'}
              style={{ border: 0, borderRadius: 0 }}
              onClick={
                isPublished(registrationStatus)
                  ? onShowConfirmApprove
                  : () => onChange('APPROVE')
              }
            >
              <i className='fa fa-check-square-o mr-2' />
              <Translation
                id={
                  isApproved(registrationStatus)
                    ? 'formStatus.approveChecked'
                    : 'formStatus.approve'
                }
              />
            </Button>
            <Button
              id='dataset-setPublish-button'
              className='fdk-button'
              color={isPublished(registrationStatus) ? 'dark' : 'primary'}
              style={{ border: 0, borderRadius: 0 }}
              onClick={
                allowPublish ? () => onChange('PUBLISH') : onShowValidationError
              }
            >
              <Translation
                id={
                  isPublished(registrationStatus)
                    ? 'formStatus.publishChecked'
                    : 'formStatus.publish'
                }
              />
            </Button>
          </>
        )}
        <button
          type='button'
          className='btn bg-transparent fdk-color-link'
          disabled={isPublished(registrationStatus) || isSaving || error}
          onClick={onShowConfirmDelete}
        >
          <Translation id='formStatus.delete' />
        </button>
      </div>
    </div>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(DefaultDialog);
