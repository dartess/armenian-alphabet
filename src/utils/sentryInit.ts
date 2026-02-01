import * as Sentry from '@sentry/react';

export function sentryInit(): void {
  Sentry.init({
    dsn: 'https://8c86d66ac28d4246836fc050b2f77ffc@o4504170448027648.ingest.sentry.io/4504170449862656',
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
  });
}
