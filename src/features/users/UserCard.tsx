import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from './usersSlice';
import Rating from '../usersActionBar/Rating';

interface Params {
  id: string;
}

const IMG = styled.img`
  margin: 40px auto 50px;
  display: block;
  border-radius: 50%;
`;

const Grid = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin: 10px auto 0;
`;

const HeaderCell = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5px;
  text-align: center;
`;

const UserCard: FC = () => {
  const { id } = useParams<Params>();
  const user = useAppSelector((state) => selectUser(state, id));

  return (
    <>
      <IMG src={user.picture.large} alt={user.name} />
      <Grid data-testid="user-card">
        <div>
          <HeaderCell>Name: </HeaderCell>
          {user.name}
        </div>
        <div>
          <HeaderCell>Login: </HeaderCell>
          {user.login}
        </div>
        <div>
          <HeaderCell>Email: </HeaderCell>
          {user.email}
        </div>
        <div>
          <HeaderCell>Phone: </HeaderCell>
          {user.phone}
        </div>
        <div>
          <HeaderCell>Rating: </HeaderCell>
          <Rating id={id} min={-4} max={4} />
        </div>
      </Grid>
    </>
  );
};

export default UserCard;
