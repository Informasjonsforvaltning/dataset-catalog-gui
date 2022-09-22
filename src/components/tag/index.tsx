import React, { FC, ReactElement } from 'react';
import SC from './styled';

type Props = {
  icon: ReactElement;
  text: string;
  bgColor: string;
};

const Tag: FC<Props> = ({ icon, text, bgColor = '#335380' }) => {
  return (
    <SC.Tag style={{ backgroundColor: bgColor }}>
      <SC.TagIcon>{icon}</SC.TagIcon>
      <SC.TagText>{text}</SC.TagText>
    </SC.Tag>
  );
};

export { Props };
export default Tag;
