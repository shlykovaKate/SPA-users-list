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

const Ul = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
`;

const Li = styled.li`
  padding: 5px 10px;
  border: 2px solid palevioletred;
  border-radius: 3px;
  margin-right: 10px;

  & a {
    color: palevioletred;
  }
`;

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  return (
    <Router>
      <Ul>
        <Li>
          <Link to="/users">Users</Link>
        </Li>
        <Li>
          <Link to="/leaders">Leaders</Link>
        </Li>
      </Ul>
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
