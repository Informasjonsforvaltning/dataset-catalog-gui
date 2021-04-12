import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import ErrorDialog from './error-dialog/error-dialog.component';
import ConfirmDialog from './confirm-dialog/confirm-dialog.component';
import ValidationErrorDialog from './validation-error-dialog/validation-error-dialog.component';
import DefaultDialog from './default-dialog/default-dialog.component';

import './status-bar.scss';

interface ExternalProps {
  type: 'dataset' | 'api';
  isSaving: boolean;
  lastSaved?: string;
  error: any;
  justPublishedOrUnPublished: boolean;
  onDelete: () => void;
  allowPublish: boolean;
  onChange: (status: string) => void;
  registrationStatus: string;
}

interface Props extends ExternalProps, TranslationsProps {}

const StatusBar: FC<Props> = ({
  type,
  isSaving,
  lastSaved,
  error,
  justPublishedOrUnPublished,
  onDelete,
  allowPublish,
  onChange,
  registrationStatus,
  translationsService
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmStatusDraft, setShowConfirmStatusDraft] = useState(false);
  const [showConfirmStatusApprove, setShowConfirmStatusApprove] = useState(
    false
  );
  const [showValidatonError, setShowValidationError] = useState(false);

  return (
    <>
      {error && <ErrorDialog error={error} lastSaved={lastSaved} />}
      {showConfirmDelete && (
        <ConfirmDialog
          onConfirm={onDelete}
          onCancel={() => setShowConfirmDelete(false)}
          confirmText={translationsService.translate(
            `formStatus.${type}.confirmDeleteMessage`
          )}
          confirmButtonText={translationsService.translate(
            'formStatus.confirmDelete'
          )}
        />
      )}
      {showConfirmStatusDraft && (
        <ConfirmDialog
          onConfirm={() => onChange('DRAFT')}
          onCancel={() => setShowConfirmStatusDraft(false)}
          confirmText={translationsService.translate(
            'formStatus.dataset.confirmSetStatusDraft'
          )}
          confirmButtonText={translationsService.translate(
            'formStatus.confirmChangeStatus'
          )}
        />
      )}
      {showConfirmStatusApprove && (
        <ConfirmDialog
          onConfirm={() => onChange('APPROVE')}
          onCancel={() => setShowConfirmStatusApprove(false)}
          confirmText={translationsService.translate(
            'formStatus.dataset.confirmSetStatusApprove'
          )}
          confirmButtonText={translationsService.translate(
            'formStatus.confirmChangeStatus'
          )}
        />
      )}
      {showValidatonError && (
        <ValidationErrorDialog
          type={type}
          onCancel={() => setShowValidationError(false)}
        />
      )}
      <DefaultDialog
        onShowValidationError={() => setShowValidationError(true)}
        onShowConfirmDelete={() => setShowConfirmDelete(true)}
        onShowConfirmDraft={() => setShowConfirmStatusDraft(true)}
        onShowConfirmApprove={() => setShowConfirmStatusApprove(true)}
        justPublishedOrUnPublished={justPublishedOrUnPublished}
        type={type}
        isSaving={isSaving}
        allowPublish={allowPublish}
        onChange={status => onChange(status)}
        registrationStatus={registrationStatus}
        lastSaved={lastSaved}
      />
    </>
  );
};

export default compose<FC<ExternalProps>>(memo, withTranslations)(StatusBar);
