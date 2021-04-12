import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  InMemoryWebStorage,
  UserManager,
  WebStorageStateStore
} from 'oidc-client';

async function run(): Promise<void> {
  const manager: UserManager = new UserManager({
    response_mode: 'query',
    userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() })
  });

  let path = '/';

  const isInIframe = location !== parent.location;

  try {
    const user = await (isInIframe
      ? manager.signinSilentCallback()
      : manager.signinRedirectCallback());

    if (!isInIframe && user?.state?.path) {
      path = user.state.path.replace(location.origin, '');
    }
  } catch (e) {
    // TODO: handle errors and log them to Sentry
  } finally {
    if (!isInIframe) {
      location.replace(path);
    }
  }
}

run();
