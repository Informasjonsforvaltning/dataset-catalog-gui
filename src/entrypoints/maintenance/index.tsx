import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../../styles';

import React from 'react';
import { render } from 'react-dom';

import { initLocalization } from '../../services/localization';
import { authService } from '../../services/auth/auth-service';

import MaintenancePage from '../../pages/maintenance-page';

async function run() {
  const authenticated = await authService.init({ loginRequired: true });
  if (authenticated) {
    initLocalization();
    render(<MaintenancePage />, document.getElementById('root'));
  }
}

run();

if ((module as any).hot) {
  (module as any).hot.accept();
}
