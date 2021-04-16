import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Translation from '../translation';

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
  const iconClass = cx('catalog-icon', {
    'catalog-icon--dataset': type === 'datasets',
    'catalog-icon--api': type === 'dataservices',
    'catalog-icon--concepts': type === 'concepts',
    'catalog-icon--protokoll': type === 'protocol'
  });

  const itemClass = cx(
    'catalog-item__body',
    'd-flex',
    'flex-column',
    'align-items-center',
    {
      readOnly: isReadOnly,
      disabled,
      beta: false,
      'h-100': !itemsCount
    }
  );

  const isExternalLink = !(type === 'datasets');

  return (
    <div className='col-md-4 pl-0 mb-4'>
      {isExternalLink && !isReadOnly && !disabled && (
        <a className='catalog-item' href={linkUri}>
          <div className={itemClass}>
            <h3 className={iconClass}>
              <Translation id={`catalogs.${type}`} />
            </h3>
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
            <h3 className={iconClass}>
              <Translation id={`catalogs.${type}`} />
            </h3>
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
            <h3 className={iconClass}>
              <Translation id={`catalogs.${type}`} />
            </h3>
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
