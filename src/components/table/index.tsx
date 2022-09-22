import React, { FC } from 'react';

import SC from './styled';
import TableHeader, { Props as HeaderProps } from './table-header';
import { Props as HeadCellProps } from './table-header/header-cell';
import TableRow, { Props as RowProps } from './table-row';
import { Props as RowCellProps } from './table-row/row-cell';

interface Props extends HeaderProps<HeadCellProps>, RowProps<RowCellProps> {
  rows: RowProps<RowCellProps>[];
}

const Table: FC<Props> = ({ cols, rows }) => {
  return (
    <SC.Table>
      <TableHeader cols={cols ?? []} />
      <SC.TableBody>
        <>
          {rows.map(row => (
            <TableRow {...row} />
          ))}
        </>
      </SC.TableBody>
    </SC.Table>
  );
};

export default Table;
