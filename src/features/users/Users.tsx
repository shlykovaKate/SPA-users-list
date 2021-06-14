import React, {
  FC,
  useEffect,
  Fragment,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import SearchInput from '../usersActionBar/SearchInput';
import Sorting from '../usersActionBar/Sorting';
import {
  fetchUsersAsync,
  selectFilteredUsers,
} from './usersSlice';

const Grid = styled.div`
display: grid;
grid-template-columns: 70px repeat(5, 1fr);

& div {
  margin: 10px;
  display: flex;
  align-items: center;
}
`;

const HeaderCell = styled.div`
display: flex;
justify-content: space-between;
`;

const Users: FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectFilteredUsers);

  useEffect(() => {
    if (users.length === 0) dispatch(fetchUsersAsync());
  }, []);

  return (
    <>
      <ul>
        <li>
          <Link to="/leaders">Leaders</Link>
        </li>
      </ul>
      <SearchInput />
      <Grid>
        <div>&nbsp;</div>
        <HeaderCell>
          NAME
          <Sorting columnName="name" />
        </HeaderCell>
        <HeaderCell>
          LOGIN
          <Sorting columnName="login" />
        </HeaderCell>
        <HeaderCell>
          EMAIL
          <Sorting columnName="email" />
        </HeaderCell>
        <HeaderCell>
          PHONE
          <Sorting columnName="phone" />
        </HeaderCell>
        <div>RAITING</div>
        {users.map((user) => (
          <Fragment key={user.id}>
            <div><img src={user.picture.avatar} alt={user.name} /></div>
            <div><Link to={`/users/:${user.id}`}>{user.name}</Link></div>
            <div>{user.login}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <div>{user.raiting}</div>
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

export default Users;
