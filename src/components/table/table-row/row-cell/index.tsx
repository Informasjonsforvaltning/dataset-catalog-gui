import React, { FC, ReactElement } from 'react';
import SC from './styled';

interface Props {
  text?: string;
  tag?: ReactElement;
  width: string;
  icon?: ReactElement;
}

const RowCell: FC<Props> = ({ icon, text, tag, width }) => {
  return <SC.RowCell width={width}>{text ? <SC.CellText>{text}</SC.CellText> : tag ? tag : icon ? icon : <></>}</SC.RowCell>;
};

export { Props };
export default RowCell;
