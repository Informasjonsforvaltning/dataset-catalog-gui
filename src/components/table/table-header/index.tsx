import React, { FC } from 'react';
import SC from './styled';
import HeaderCell, { Props as CellProps } from './header-cell';

interface Props<T> {
  cols: T[];
}

const TableHeader: FC<Props<CellProps>> = ({ cols }) => {
  console.log(cols);
  const headRow = (
    <SC.TableHeadRow>
      {cols.map(col => (
        <HeaderCell title={col.title} icon={col.icon} />
      ))}
    </SC.TableHeadRow>
  );

  return <SC.TableHead>{headRow}</SC.TableHead>;
};

export { Props };
export default TableHeader;
