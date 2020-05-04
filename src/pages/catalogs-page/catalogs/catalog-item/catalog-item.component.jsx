import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import localization from '../../../../services/localization';
import './catalog-item.component.scss';

const isExternalLink = type =>
  ['concepts', 'protocol', 'dataServices'].includes(type);

const renderItemContent = ({ itemClass, iconClass, itemsCount, type }) => (
  <div className={itemClass}>
    <h3 className={iconClass}>{localization.catalogs[type]}</h3>
    <span className="fdk-text-size-small fdk-color-neutral-dark">
      {itemsCount || localization.none} {localization.catalogs.type[type]}
    </span>
  </div>
);

export const CatalogItem = ({ type, itemsCount, linkUri, isReadOnly }) => {
  const iconClass = cx('catalog-icon', {
    'catalog-icon--dataset': type === 'datasets',
    'catalog-icon--data-services': type === 'dataServices',
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
      beta: type === 'protocol',
      'h-100': !itemsCount
    }
  );

  return (
    <div className="col-md-4 pl-0 mb-4">
      {isExternalLink(type) && !isReadOnly && (
        <a className="catalog-item" href={linkUri}>
          {renderItemContent({ itemClass, iconClass, itemsCount, type })}
        </a>
      )}
      {!isExternalLink(type) && !isReadOnly && (
        <Link className="catalog-item" to={linkUri}>
          {renderItemContent({ itemClass, iconClass, itemsCount, type })}
        </Link>
      )}
      {isReadOnly && (
        <div className="catalog-item">
          {renderItemContent({ itemClass, iconClass, itemsCount, type })}
          <div className="overlay">
            <div className="text">{localization.noAccessCatalog}</div>
          </div>
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
  isReadOnly: false
};

CatalogItem.propTypes = {
  type: PropTypes.string.isRequired,
  itemsCount: PropTypes.number,
  linkUri: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool
};
