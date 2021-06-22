import React, {
  FC,
  Fragment,
} from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import SearchInput from '../usersActionBar/SearchInput';
import Sorting from '../usersActionBar/Sorting';
import Rating from '../usersActionBar/Rating';
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
    padding: 5px;
    box-sizing: border-box;
  }
`;

const Div = styled.div`
  background-color: ${(props) => props.theme.main};
`;

const HeaderCell = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
`;

const Img = styled.div`
  justify-content: center;
  background-color: ${(props) => props.theme.main};
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

  const smallRating = {
    main: 'darkorange',
  };

  const normalRating = {
    main: 'white',
  };

  return (
    <>
      <SearchInput columnName="name" />
      <SearchInput columnName="login" />
      <SearchInput columnName="email" />
      <SearchInput columnName="phone" />
      <SearchInput columnName="rating" />
      <Grid data-testid="grid-element">
        <HeaderCell>&nbsp;</HeaderCell>
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
        <HeaderCell>&nbsp;</HeaderCell>
        {users.map((user) => (
          <Fragment key={user.id}>
            <ThemeProvider theme={Number(user.rating) < -3 ? smallRating : normalRating}>
              <Img><img src={user.picture.avatar} alt={user.name} /></Img>
              <Div><Link to={`/users/${user.id}`}>{user.name}</Link></Div>
              <Div>{user.login}</Div>
              <Div>{user.email}</Div>
              <Div>{user.phone}</Div>
              <Div><Rating id={user.id} /></Div>
              <Div><Button type="button" onClick={() => handleClick(user.id)}>Delete</Button></Div>
            </ThemeProvider>
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

export default Users;
