import React, { FC, ReactElement } from 'react';

import SC from './styled';

interface Props {
  label: string;
  style?: {};
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  variant?: 'text' | 'contained' | 'outlined' | undefined;
}

const Button: FC<Props> = ({ label, startIcon, endIcon, style, variant = 'contained' }) => {
  return (
    <SC.Button startIcon={startIcon} endIcon={endIcon} variant={variant} sx={style}>
      {label}
    </SC.Button>
  );
};

export { Props };
export default Button;
