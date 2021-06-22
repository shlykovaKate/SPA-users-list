import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { Params } from '../../types/types';
import { selectUser } from './usersSlice';
import Rating from '../usersActionBar/Rating';

const IMG = styled.img`
margin: 0 auto;
display: block;
`;

const Grid = styled.div`
display: flex;
width: 50%;
justify-content: space-between;
margin: 10px auto 0;
`;

const UserCard: FC = () => {
  const { id } = useParams<Params>();
  const user = useAppSelector((state) => selectUser(state, id));

  return (
    <>
      <div>
        <IMG src={user.picture.large} alt={user.name} />
      </div>
      <Grid data-testid="user-card">
        <div>{user.name}</div>
        <div>{user.login}</div>
        <div>{user.email}</div>
        <div>{user.phone}</div>
        <div>
          <Rating id={id} />
        </div>
      </Grid>
    </>
  );
};

export default UserCard;
