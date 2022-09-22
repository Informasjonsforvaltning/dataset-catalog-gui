import React, { FC } from 'react';
import SC from './styled';

interface Props {
  label: string;
}

const InputBox: FC<Props> = ({ label = '' }) => {
  return <SC.TextField fullWidth label={label} />;
};

export default InputBox;
