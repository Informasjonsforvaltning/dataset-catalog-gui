import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';

import StatusBar from '../status-bar/status-bar.component';

interface ExternalProps {
  isSaving: boolean;
  lastSaved?: string;
  error?: any;
  justPublishedOrUnPublished: boolean;
  onDelete: () => void;
  allowPublish: boolean;
  type: 'dataset' | 'api';
}

interface Props extends ExternalProps {}

const FormPublish: FC<Props> = ({
  isSaving,
  lastSaved,
  error,
  justPublishedOrUnPublished,
  onDelete,
  allowPublish,
  type
}) => (
  <form>
    <Field
      name='registrationStatus'
      component={({ input }: any) => (
        <StatusBar
          type={type}
          isSaving={isSaving}
          lastSaved={lastSaved}
          error={error}
          justPublishedOrUnPublished={justPublishedOrUnPublished}
          onDelete={onDelete}
          allowPublish={allowPublish}
          onChange={input.onChange}
          registrationStatus={input.value}
        />
      )}
    />
  </form>
);

export default compose<FC<ExternalProps>>(memo)(FormPublish);
