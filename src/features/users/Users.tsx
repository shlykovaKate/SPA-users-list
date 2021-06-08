import React, {
  FC,
  useState,
  useEffect,
  Fragment,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  incrementAsync,
  selectUsers,
} from './usersSlice';

const Users: FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  const fetchUsers = () => {
    console.log('dispatch(incrementAsync())', dispatch(incrementAsync()));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const DivGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  `;

  return (
    <DivGrid>
      {users.map((user:any) => (
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
  );
};

export default Users;
