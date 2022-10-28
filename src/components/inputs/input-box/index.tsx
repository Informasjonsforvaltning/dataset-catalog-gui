import React, { FC } from 'react';
import SC from './styled';

interface Props {
  label: string;
  className?: string;
}

const InputBox: FC<Props> = ({ className, label = ' ' }) => {
  return (
    <SC.TextField className={className}>
      <SC.InputPlaceHolder>{label}</SC.InputPlaceHolder>
      <SC.Input aria-label='search for dataset description' />
    </SC.TextField>
  );
};

export default InputBox;
