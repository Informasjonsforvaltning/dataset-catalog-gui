import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Translation from '../translation';

import SC from './styled';

import './catalog-item.component.scss';

interface ExternalProps {
  type: string;
  itemsCount?: number;
  linkUri: string;
  isReadOnly?: boolean;
  disabled: boolean;
}

interface Props extends ExternalProps {}

const CatalogItem: FC<Props> = ({
  type,
  itemsCount,
  linkUri,
  isReadOnly,
  disabled = true
}) => {
  const renderIcon = (dataType: string) => {
    switch (dataType) {
      case 'datasets':
        return <SC.DatasetIcon />;
      case 'dataservices':
        return <SC.DataServiceIcon />;
      case 'concepts':
        return <SC.ConceptIcon />;
      case 'protocol':
        return <SC.ProtocolIcon />;
      default:
        return null;
    }
  };

  const itemClass = cx(
    'catalog-item__body',
    'd-flex',
    'flex-column',
    'align-items-center',
    {
      readOnly: isReadOnly,
      disabled,
      'h-100': !itemsCount
    }
  );

  const isExternalLink = !(type === 'datasets');

  return (
    <div className='catalog-items col-md-4 pl-0 pr-0 mb-4'>
      {isExternalLink && !isReadOnly && !disabled && (
        <a className='catalog-item' href={linkUri}>
          <div className={itemClass}>
            {renderIcon(type)}
            <SC.Title>
              <Translation id={`catalogs.${type}`} />
            </SC.Title>
            <span className='fdk-text-size-small fdk-color-neutral-dark'>
              {itemsCount || <Translation id='none' />}{' '}
              <Translation id={`catalogs.type.${type}`} />
            </span>
          </div>
        </a>
      )}
      {!isExternalLink && !isReadOnly && !disabled && (
        <Link className='catalog-item' to={linkUri}>
          <div className={itemClass}>
            {renderIcon(type)}
            <SC.Title>
              <Translation id={`catalogs.${type}`} />
            </SC.Title>
            <span className='fdk-text-size-small fdk-color-neutral-dark'>
              {itemsCount || <Translation id='none' />}{' '}
              <Translation id={`catalogs.type.${type}`} />
            </span>
          </div>
        </Link>
      )}
      {(isReadOnly || disabled) && (
        <div className='catalog-item'>
          <div className={itemClass}>
            {renderIcon(type)}
            <SC.Title>
              <Translation id={`catalogs.${type}`} />
            </SC.Title>
            <span className='fdk-text-size-small fdk-color-neutral-dark'>
              {itemsCount || <Translation id='none' />}{' '}
              <Translation id={`catalogs.type.${type}`} />
            </span>
          </div>
          {isReadOnly && (
            <div className='overlay'>
              <div className='text'>
                <Translation id='noAccessCatalog' />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(CatalogItem);
