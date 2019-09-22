import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import MainScreen from './components/MainScreen';
import AuditioneeScreen from './components/AuditioneeScreen';
import LoginScreen from './components/LoginScreen';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/main" component={MainScreen} />
        <Route
          exact
          path="/main/:search"
          component={({
            match,
            history,
          }: RouteComponentProps<{ search: string }>) => (
            <MainScreen history={history} search={match.params.search} />
          )}
        />
        <Route
          exact
          path="/auditionee/:id"
          component={({ match }: RouteComponentProps<{ id: string }>) => (
            <AuditioneeScreen id={match.params.id} />
          )}
        />
      </Switch>
      <Route exact path="/" render={redirectToMain} />
    </BrowserRouter>
  );
};

const redirectToMain = () => <Redirect to="/main" />;

export default App;
