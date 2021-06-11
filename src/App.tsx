import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Users from './features/users/Users';
import Leaders from './features/leaders/Leaders';
import UserCard from './features/users/UserCard';

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
        <UserCard />
      </Route>
    </Switch>
  </Router>
);

export default App;
