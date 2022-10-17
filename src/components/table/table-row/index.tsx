import React, { FC } from 'react';
import SC from './styled';
import RowCell, { Props as CellProps } from './row-cell';

interface Props<T> {
  row: T[];
  onRowClick?: () => void;
}

const TableRow: FC<Props<CellProps>> = ({ row, onRowClick }) => (
  <SC.TableRow onClick={onRowClick}>
    {row.map((cell, i) => (
      <RowCell key={i} {...cell} />
    ))}
  </SC.TableRow>
);

export { Props };
export default TableRow;
