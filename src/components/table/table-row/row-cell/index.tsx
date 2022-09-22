import React, { FC } from 'react';
import SC from './styled';
import Tag, { Props as TagProps } from '../../../tag';

interface Props {
  text?: string;
  tag?: TagProps;
  width: string;
}

const RowCell: FC<Props> = ({ text, tag, width }) => {
  return (
    <SC.RowCell width={width}>
      {text ? (
        <SC.CellText>{text}</SC.CellText>
      ) : tag ? (
        <Tag text={tag.text} icon={tag.icon} bgColor={tag.bgColor} />
      ) : (
        <></>
      )}
    </SC.RowCell>
  );
};

export { Props };
export default RowCell;
