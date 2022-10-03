import React, { FC, ReactElement } from 'react';

import SC from './styled';

interface Props {
  label: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  className?: string;
}

const Button: FC<Props> = ({ label, startIcon, endIcon, className }) => {
  return (
    <SC.ButtonContainer className={className}>
      {startIcon ? <SC.StartIcon>{startIcon}</SC.StartIcon> : <></>}
      <SC.Button>{label}</SC.Button>
      {endIcon ? <SC.EndIcon>{endIcon}</SC.EndIcon> : <></>}
    </SC.ButtonContainer>
  );
};

export { Props };
export default Button;
