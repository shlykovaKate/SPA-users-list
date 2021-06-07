import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Users from './components/Users';
import Leaders from './components/Leaders';
import User from './components/User';

const App: FC = () => (
  <Router>
    <ul>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/leaders">Leaders</Link>
      </li>
    </ul>
    <Switch>
      <Route path="/leaders">
        <Leaders />
      </Route>
      <Route path="/users" exact>
        <Users />
      </Route>
      <Route path="/users/:id">
        <User />
      </Route>
    </Switch>
  </Router>
);

export default App;
