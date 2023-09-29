import { Redirect, Route, Switch, useLocation } from 'wouter';
import type { ComponentType } from 'react';
import { useUpdateEffect } from 'react-use';
import ym from 'react-yandex-metrika';

import type { PageValue } from '@/types/model';
import { Alphabet } from '@/pages/alphabet/Alphabet/Alphabet';
import { Quiz } from '@/pages/quiz/Quiz';
import { Drawing } from '@/pages/drawing/Drawing';
import { Settings } from '@/pages/settings/Settings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO
const routes: Record<PageValue, ComponentType<any>> = {
  alphabet: Alphabet,
  quiz: Quiz,
  drawing: Drawing,
  settings: Settings,
};

export function Router() {
  const [location] = useLocation();
  useUpdateEffect(
    () => {
      ym('hit', location);
    },
    [location],
  );

  return (
    <Switch>
      {Object.entries(routes).map(([page, component]) => <Route key={page} path={`/${page}`} component={component} />)}
      <Redirect to="/alphabet" replace />
    </Switch>
  );
}
