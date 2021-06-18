import React, {
  FC,
  Fragment,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import SearchInput from '../usersActionBar/SearchInput';
import Sorting from '../usersActionBar/Sorting';
import {
  selectFilteredUsers,
  removeUser,
} from './usersSlice';

const Grid = styled.div`
display: grid;
grid-template-columns: 58px repeat(4, 1fr) 180px 80px;
grid-gap: 1px;
padding: 1px;
margin: 20px 0 0;
border-radius: 4px;
color: rgba(0, 0, 0, 0.87);
background: rgba(224, 224, 224, 1);

& > div {
  display: flex;
  align-items: center;
  background: white;
  padding: 5px;
  box-sizing: border-box;
}
`;

const HeaderCell = styled.div`
display: flex;
justify-content: space-between;
`;

const Img = styled.div`
display: flex;
justify-content: center;
`;

const Button = styled.button`
margin: 0 auto;
`;

const Users: FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectFilteredUsers);

  const handleClick = (id: string) => {
    dispatch(removeUser(id));
  };

  return (
    <>
      <SearchInput />
      <Grid data-testid="grid-element">
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
        <HeaderCell>
          RATING
          <Sorting columnName="rating" />
        </HeaderCell>
        <div>&nbsp;</div>
        {users.map((user) => (
          <Fragment key={user.id}>
            <Img><img src={user.picture.avatar} alt={user.name} /></Img>
            <div><Link to={`/users/${user.id}`}>{user.name}</Link></div>
            <div>{user.login}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <div>{user.rating}</div>
            <div><Button type="button" onClick={() => handleClick(user.id)}>Delete</Button></div>
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

export default Users;
