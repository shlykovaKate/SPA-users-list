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
`;

const MenuItem = styled.li`
  padding: 5px 10px;
  border: 2px solid darkorange;
  border-radius: 3px;
  margin-right: 10px;

  a {
    color: darkorange;
    text-decoration: none;
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
