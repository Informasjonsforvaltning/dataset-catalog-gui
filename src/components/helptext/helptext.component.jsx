/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Collapse } from 'reactstrap';
import _ from 'lodash';
import { withStateHandlers } from 'recompose';

import localization from '../../services/localization';
import './helptext.scss';
import { convertToSanitizedHtml } from '../../lib/markdown-converter';

export const HelpTextPure = props => {
  const { title, term, required, recommended, toggleShowAll, showAll } = props;

  const collapseClass = cx('fa', 'fdk-fa-left', {
    'fa-angle-double-down': !showAll,
    'fa-angle-double-up': showAll
  });

  const abstract = _.get(localization.helptexts, [term, 'abstract']);
  const description = _.get(localization.helptexts, [term, 'description']);

  return (
    <div className="fdk-reg-helptext mb-3 p-3">
      <div className="d-flex align-items-center">
        <h3>{title}</h3>
        {required && (
          <span className="fdk-badge badge-pill fdk-bg-color-button-primary-2 fdk-color-button-text-primary ml-2 fdk-text-size-small">
            {localization.helptext.required}
          </span>
        )}
        {recommended && (
          <span className="fdk-badge badge-pill fdk-bg-color-link-lighter fdk-color-link-darker ml-2 fdk-text-size-small">
            {localization.helptext.recommended}
          </span>
        )}
      </div>
      <div className="d-md-flex">
        {abstract && (
          <div
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(abstract)
            }}
          />
        )}
        {description && (
          <button
            type="button"
            className="fdk-btn-no-border text-left p-0 ml-1 fdk-reg-helptext-more align-self-start"
            onClick={toggleShowAll}
          >
            <i className={collapseClass} />
            {showAll ? localization.helptext.less : localization.helptext.more}
          </button>
        )}
      </div>
      {description && (
        <Collapse className="mt-3" isOpen={showAll}>
          <div
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(description)
            }}
          />
        </Collapse>
      )}
    </div>
  );
};

HelpTextPure.defaultProps = {
  title: '',
  term: '',
  required: false,
  recommended: false,
  toggleShowAll: _.noop,
  showAll: false
};

HelpTextPure.propTypes = {
  title: PropTypes.string,
  term: PropTypes.string,
  required: PropTypes.bool,
  recommended: PropTypes.bool,
  toggleShowAll: PropTypes.func,
  showAll: PropTypes.bool
};

const enhance = withStateHandlers(
  ({ initialShowAll = false }) => ({
    showAll: initialShowAll
  }),
  {
    toggleShowAll: ({ showAll }) => e => {
      e.preventDefault();
      return { showAll: !showAll };
    }
  }
);

export const Helptext = enhance(HelpTextPure);
