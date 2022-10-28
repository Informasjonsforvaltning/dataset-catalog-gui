import { Colour, theme } from '@fellesdatakatalog/theme';
import React, { FC } from 'react';

import { getStyledComponent, Text } from './styled';

type ButtonType = 'default' | 'filled' | 'link' | 'transparent';
type IconPoseType = 'left' | 'right' | undefined;

interface ButtonProps {
  type?: ButtonType;
  name?: string;
  iconPos?: IconPoseType;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  color?: (prop: any) => string;
  bg?: (prop: any) => string;
}

const Button: FC<ButtonProps> = ({
  startIcon,
  endIcon,
  type = 'default',
  name = 'Button',
  color = type === 'link' || type === 'transparent'
    ? theme.colour(Colour.BLUE, 'B60')
    : theme.colour(Colour.NEUTRAL, 'N0'),
  bg = theme.colour(Colour.BLUE, 'B60'),
}) => {
  const Component = getStyledComponent(type!);

  return (
    <Component color={color} bg={bg} iconPos={startIcon ? 'left' : endIcon ? 'right' : undefined}>
      {startIcon}
      <Text>{name}</Text>
      {endIcon}
    </Component>
  );
};

export default Button;
export { ButtonType, ButtonProps };
