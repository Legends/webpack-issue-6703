import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import AsyncComponent from '~/components/AsyncComponent';
import '~/styles/bootstrap.scss';

const AsyncA = AsyncComponent(() => import('./containers/RouteA').then(module => module.default));
const AsyncB = AsyncComponent(() => import('./containers/RouteB').then(module => module.default));

const history = createBrowserHistory();
const routes = (
  <Switch>
    <Route
      render={(results) => {
        switch (results.location.search) {
          default:
            return (
              <div>
                <a href="?a" style={{display: 'block'}}>Go to async route A</a>
                <a href="?b" style={{display: 'block'}}>Go to async route b</a>
              </div>
            );

          case '?a':
            return <AsyncA />;

          case '?b':
            return <AsyncB />;
        }
      }}
      path="/"
    />
  </Switch>
);

ReactDOM.render(
  <Router
    children={routes}
    history={history}
  />,
  document.getElementById('app'),
);