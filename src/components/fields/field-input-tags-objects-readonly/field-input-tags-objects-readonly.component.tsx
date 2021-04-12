import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';

interface ExternalProps extends WrappedFieldProps {}

interface Props extends ExternalProps {}

const TagsInputFieldArrayReadOnly: FC<Props> = ({ input: { value } }) => (
  <div className='pl-3'>{value.map(({ uri }: any) => uri).join(', ')}</div>
);

export default compose<FC<ExternalProps>>(memo)(TagsInputFieldArrayReadOnly);
