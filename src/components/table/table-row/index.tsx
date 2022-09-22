import React, { FC } from 'react';
import SC from './styled';
import RowCell, { Props as CellProps } from './row-cell';

interface Props<T> {
  row: T[];
}

const TableRow: FC<Props<CellProps>> = ({ row }) => (
  <SC.TableRow>
    {row.map(cell => (
      <RowCell {...cell} />
    ))}
  </SC.TableRow>
);

export { Props };
export default TableRow;
