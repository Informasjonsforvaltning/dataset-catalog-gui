import React, { FC } from 'react';

import TableRow, { Props as RowProps } from '../table-row';
import { Props as RowCellProps } from '../table-row/row-cell';
import SC from './styled';

interface Props {
  rows: RowProps<RowCellProps>[];
}

const TableBody: FC<Props> = ({ rows }) => {
  return (
    <SC.TableBody>
      {rows.map((row, i) => (
        <TableRow key={i} {...row} />
      ))}
    </SC.TableBody>
  );
};

export default TableBody;
