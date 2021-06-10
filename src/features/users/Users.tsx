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

const DivGrid = styled.div`
display: grid;
grid-template-columns: 70px repeat(5, 1fr);

& div {
  margin: 10px;
  display: flex;
  align-items: center;
}
`;

const DivHeaderCell = styled.div`
display: flex;
justify-content: space-between;
`;

const Users: FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectFilteredUsers);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  return (
    <>
      <SearchInput />
      <DivGrid>
        <div>&nbsp;</div>
        <DivHeaderCell>
          NAME
          <Sorting columnName="name" />
        </DivHeaderCell>
        <DivHeaderCell>
          LOGIN
          <Sorting columnName="login" />
        </DivHeaderCell>
        <DivHeaderCell>
          EMAIL
          <Sorting columnName="email" />
        </DivHeaderCell>
        <DivHeaderCell>
          PHONE
          <Sorting columnName="phone" />
        </DivHeaderCell>
        <div>RAITING</div>
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
