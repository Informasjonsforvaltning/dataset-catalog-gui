import React, { memo, FC, PropsWithChildren } from 'react';
import { compose } from 'redux';
import cx from 'classnames';

interface ExternalProps {
  type: 'success' | 'warning' | 'danger' | 'info';
}

interface Props extends ExternalProps {}

const AlertMessage: FC<PropsWithChildren<Props>> = ({ type, children }) => {
  const alertClassnames = cx('d-flex', 'alert', 'pt-3', 'pb-3', 'mt-3', {
    'alert-success': type === 'success',
    'alert-warning': type === 'warning',
    'alert-danger': type === 'danger',
    'alert-info fdk-color-neutral-darkest': type === 'info'
  });
  const iconClassnames = cx('fa', 'mr-2', 'mt-1', {
    'fa-exclamation-triangle': type === 'danger',
    'fa-info-circle fdk-color-link': type === 'info',
    'fa-check': type === 'success'
  });

  return type && children ? (
    <div className={alertClassnames}>
      <i className={iconClassnames} />
      <span>{children}</span>
    </div>
  ) : null;
};

export default compose<FC<ExternalProps>>(memo)(AlertMessage);
