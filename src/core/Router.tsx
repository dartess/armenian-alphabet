import { Redirect, Route, Switch } from 'wouter';
import type { ComponentType } from 'react';

import type { PageValue } from '@/types/model';
import { Alphabet } from '@/pages/alphabet/Alphabet/Alphabet';
import { Quiz } from '@/pages/quiz/Quiz';
import { Drawing } from '@/pages/drawing/Drawing';
import { Settings } from '@/pages/settings/Settings';

const routes: Record<PageValue, ComponentType<any>> = {
  alphabet: Alphabet,
  quiz: Quiz,
  drawing: Drawing,
  settings: Settings,
};

export function Router() {
  return (
    <Switch>
      {Object.entries(routes).map(([page, component]) => <Route key={page} path={`/${page}`} component={component} />)}
      <Redirect to="/alphabet" />
    </Switch>
  );
}
