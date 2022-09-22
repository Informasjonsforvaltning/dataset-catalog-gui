import React, { FC, ReactElement } from 'react';
import SC from './styled';

interface Props {
  title: string;
  icon?: ReactElement;
  width: string;
}

const HeaderCell: FC<Props> = ({ title, icon, width }) => (
  <SC.Cell style={{ width: width }}>
    <SC.Title>{title}</SC.Title>
    <SC.Icon>{icon ?? undefined}</SC.Icon>
  </SC.Cell>
);

export { Props };
export default HeaderCell;
