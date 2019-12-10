import React from 'react';

import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import routes from './routes';

function App() {
  const { loading } = useSelector(state => state.loading);

  return (
    <BrowserRouter>
      <Spin tip="Loading..." spinning={loading} delay={500}>
        <React.Suspense fallback={<Spin tip="Loading..." />}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={true}
                  name={route.name}
                  render={props => <route.component {...props} />}
                />
              ) : null;
            })}
            <Redirect from="/" to="/home" />
          </Switch>
        </React.Suspense>
      </Spin>
    </BrowserRouter>
  );
}

export default App;
