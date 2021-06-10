import React, {
  FC,
  useEffect,
  Fragment,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import SearchInput from '../usersActionBar/SearchInput';
import {
  fetchUsersAsync,
  selectFilteredUsers,
} from './usersSlice';

const Users: FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectFilteredUsers);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  const DivGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  `;

  return (
    <>
      <SearchInput />
      <DivGrid>
        {users.map((user) => (
          <Fragment key={user.id}>
            <div><img src={user.avatar} alt={user.name} /></div>
            <div><Link to={`/users/:${user.id}`}>{user.name}</Link></div>
            <div>{user.login}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <div>Raiting</div>
          </Fragment>
        ))}
      </DivGrid>
    </>
  );
};

export default Users;
