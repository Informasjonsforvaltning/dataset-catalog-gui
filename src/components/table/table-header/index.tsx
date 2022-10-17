import React, { FC } from 'react';
import SC from './styled';
import HeaderCell, { Props as CellProps } from './header-cell';

interface Props<T> {
  cols: T[];
}

const TableHeader: FC<Props<CellProps>> = ({ cols }) => {
  const headRow = (
    <SC.TableHeadRow>
      {cols.map((col, i) => (
        <HeaderCell key={i} title={col.title} icon={col.icon} width={col.width} />
      ))}
    </SC.TableHeadRow>
  );

  return <SC.TableHead>{headRow}</SC.TableHead>;
};

export { Props };
export default TableHeader;
