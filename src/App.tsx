import React, { FC, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from './app/hooks';
import Users from './features/users/Users';
import Leaders from './features/leaders/Leaders';
import UserCard from './features/users/UserCard';
import { fetchUsersAsync } from './features/users/usersSlice';

const Menu = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  box-shadow: 0px 1px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px -1px 3px 0px rgb(0 0 0 / 12%);
`;

const MenuItem = styled.li`
  padding: 15px;

  a {
    color: #1976d2;
    text-decoration: none;
    padding: 10px;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  return (
    <Router>
      <Menu>
        <MenuItem>
          <Link to="/users">Users</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/leaders">Leaders</Link>
        </MenuItem>
      </Menu>
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
};

export default App;
