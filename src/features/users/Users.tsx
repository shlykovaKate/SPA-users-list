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

const Cell = styled.div`
  background-color: ${(props) => props.theme.main};
`;

const HeaderCell = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  font-weight: bolder;
`;

const Img = styled.div`
  justify-content: center;
  background-color: ${(props) => props.theme.main};

  img {
    border-radius: 50%;
  }
`;

const Button = styled.button`
  margin: 0 auto;
  color: #fff;
  background-color: rgb(4, 195, 142);
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  padding: 2px 8px;
  font-size: 12px;
  font-weight: bolder;
  line-height: 1.75;
  border-radius: 4px;
  border: none;
  text-transform: uppercase;

  &:hover {
    background-color: rgb(6, 136, 93);
  }
`;

const Filter = styled.div`
  box-shadow: 0px 1px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px -1px 3px 0px rgb(0 0 0 / 12%);
  margin: 10px 0;
  padding: 15px;
`;

const H2 = styled.h2`
  margin: 0 10px;
`;

const FilterItemsBlock = styled.div`
  display: flex;
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
      <Filter>
        <H2>Filter:</H2>
        <FilterItemsBlock>
          <SearchInput columnName="name" />
          <SearchInput columnName="login" />
          <SearchInput columnName="email" />
          <SearchInput columnName="phone" />
          <SearchInput columnName="rating" />
        </FilterItemsBlock>
      </Filter>
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
              <Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Cell>
              <Cell>{user.login}</Cell>
              <Cell>{user.email}</Cell>
              <Cell>{user.phone}</Cell>
              <Cell><Rating id={user.id} /></Cell>
              <Cell><Button type="button" onClick={() => handleClick(user.id)}>Delete</Button></Cell>
            </ThemeProvider>
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

export default Users;
