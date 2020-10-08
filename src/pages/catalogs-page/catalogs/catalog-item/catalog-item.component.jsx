import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import localization from '../../../../services/localization';
import './catalog-item.component.scss';

const isExternalLink = type => !(type === 'datasets');

const renderItemContent = ({ itemClass, iconClass, itemsCount, type }) => (
  <div className={itemClass}>
    <h3 className={iconClass}>{localization.catalogs[type]}</h3>
    <span className="fdk-text-size-small fdk-color-neutral-dark">
      {itemsCount || localization.none} {localization.catalogs.type[type]}
    </span>
  </div>
);

export const CatalogItem = ({
  type,
  itemsCount,
  linkUri,
  isReadOnly,
  disabled
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

  return (
    <div className="col-md-4 pl-0 mb-4">
      {isExternalLink(type) && !isReadOnly && !disabled && (
        <a className="catalog-item" href={linkUri}>
          {renderItemContent({ itemClass, iconClass, itemsCount, type })}
        </a>
      )}
      {!isExternalLink(type) && !isReadOnly && !disabled && (
        <Link className="catalog-item" to={linkUri}>
          {renderItemContent({ itemClass, iconClass, itemsCount, type })}
        </Link>
      )}
      {(isReadOnly || disabled) && (
        <div className="catalog-item">
          {renderItemContent({ itemClass, iconClass, itemsCount, type })}
          {isReadOnly && (
            <div className="overlay">
              <div className="text">{localization.noAccessCatalog}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
renderItemContent.propTypes = {
  itemClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  itemsCount: PropTypes.string,
  type: PropTypes.string.isRequired
};

renderItemContent.defaultProps = {
  itemsCount: null
};

CatalogItem.defaultProps = {
  itemsCount: null,
  isReadOnly: false,
  disabled: true
};

CatalogItem.propTypes = {
  type: PropTypes.string.isRequired,
  itemsCount: PropTypes.number,
  linkUri: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool,
  disabled: PropTypes.bool
};
