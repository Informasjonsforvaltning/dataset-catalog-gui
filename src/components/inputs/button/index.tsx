import { Colour, theme } from '@fellesdatakatalog/theme';
import React, { ButtonHTMLAttributes, FC } from 'react';

import { getStyledComponent, Text } from './styled';

type ButtonType = 'default' | 'filled' | 'link' | 'transparent';
type IconPoseType = 'left' | 'right' | undefined;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: ButtonType;
  name?: string;
  iconPos?: IconPoseType;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  btnColor?: (prop: any) => string;
  bg?: (prop: any) => string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  startIcon,
  endIcon,
  btnType = 'default',
  name = 'Button',
  btnColor = btnType === 'link' || btnType === 'transparent'
    ? theme.colour(Colour.BLUE, 'B60')
    : theme.colour(Colour.NEUTRAL, 'N0'),
  bg = theme.colour(Colour.BLUE, 'B60'),
  onClick,
}) => {
  const Component = getStyledComponent(btnType!);

  return (
    <Component
      btnColor={btnColor}
      bg={bg}
      iconPos={startIcon ? 'left' : endIcon ? 'right' : undefined}
      onClick={onClick}
    >
      {startIcon}
      <Text>{name}</Text>
      {endIcon}
    </Component>
  );
};

export default Button;
export { ButtonType, ButtonProps };
