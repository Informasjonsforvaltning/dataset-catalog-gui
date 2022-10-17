import React, { FC } from 'react';

import SC from './styled';
import TableBody from './table-body';
import TableHeader, { Props as HeaderProps } from './table-header';
import { Props as HeadCellProps } from './table-header/header-cell';
import { Props as RowProps } from './table-row';
import { Props as RowCellProps } from './table-row/row-cell';

interface Props extends HeaderProps<HeadCellProps> {
  rows: RowProps<RowCellProps>[];
}

const Table: FC<Props> = ({ cols, rows }) => {
  return (
    <SC.Table>
      <TableHeader cols={cols ?? []} />
      <TableBody rows={rows} />
    </SC.Table>
  );
};

export default Table;
