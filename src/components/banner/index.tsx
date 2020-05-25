import React, { memo, FC, ComponentProps, PropsWithChildren } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

import SC from './styled';

import { Variant } from './enums';

interface Props extends ComponentProps<'div'> {
  variant: Variant;
}

const Banner: FC<PropsWithChildren<Props>> = ({
  variant = Variant.NORMAL,
  className,
  children
}) => (
  <SC.Banner variant={variant} className={className}>
    {variant === Variant.WARNING && <ErrorIcon />}
    {variant === Variant.SUCCESS && <InfoIcon />}
    <SC.Body>{children}</SC.Body>
  </SC.Banner>
);

export default memo(Banner);
export { Variant } from './enums';
