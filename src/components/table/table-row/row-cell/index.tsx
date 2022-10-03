import React, { FC, ReactElement } from 'react';
import SC from './styled';

interface Props {
  text?: string;
  tag?: ReactElement;
  width: string;
}

const RowCell: FC<Props> = ({ text, tag, width }) => {
  return <SC.RowCell width={width}>{text ? <SC.CellText>{text}</SC.CellText> : tag ? tag : <></>}</SC.RowCell>;
};

export { Props };
export default RowCell;
