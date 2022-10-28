import React, { FC } from 'react';
import SC from './styled';

type CellType = {
  sortButton?: JSX.Element;
  width?: string;
};

interface Props {
  cols: CellType[];
}

const TableHeader: FC<Props> = ({ cols }) => {
  const headRow = (
    <SC.TableHeadRow>
      {cols.map((col, i) => (
        <SC.Cell key={i} width={col.width}>
          {col.sortButton}
        </SC.Cell>
      ))}
    </SC.TableHeadRow>
  );

  return <thead>{headRow}</thead>;
};

export { Props, CellType };
export default TableHeader;
