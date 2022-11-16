import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export function sentryInit() {
  Sentry.init({
    dsn: 'https://8c86d66ac28d4246836fc050b2f77ffc@o4504170448027648.ingest.sentry.io/4504170449862656',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}
