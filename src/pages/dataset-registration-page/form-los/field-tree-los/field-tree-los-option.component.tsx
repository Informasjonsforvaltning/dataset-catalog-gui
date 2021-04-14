import React, { memo, FC, useRef } from 'react';
import { compose } from 'redux';

interface ExternalProps {
  itemKey: number;
  value: string;
  label: string;
  onClick: (event: any) => void;
  activeNode: boolean;
  displayClass: string;
}

interface Props extends ExternalProps {}

const TreeLosOption: FC<Props> = ({
  itemKey,
  value,
  label,
  onClick,
  activeNode,
  displayClass
}) => {
  const inputElement = useRef<HTMLInputElement>(null);

  const id = encodeURIComponent(itemKey + value);

  return (
    <div
      className={`checkbox ${displayClass}`}
      onKeyPress={e => {
        inputElement.current?.click();
        e.preventDefault();
      }}
      tabIndex={0}
      role='button'
    >
      <label className='checkbox_label' htmlFor={id}>
        <input
          ref={inputElement}
          type='checkbox'
          id={id}
          tabIndex={-1}
          checked={activeNode}
          onChange={onClick}
          className='list-group-item fdk-label fdk-label-default'
          value={value}
        />
        <span className='checkbox-replacement' />
        {label}
      </label>
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(TreeLosOption);
