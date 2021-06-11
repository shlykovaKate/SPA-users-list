import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Params } from '../../types/types';
import {
  selectUser,
  changeUserRaiting,
} from './usersSlice';

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
  const { id: paramId } = useParams<Params>();
  const id = paramId.slice(1);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state, id));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeUserRaiting({ id, raiting: Number(event.target.value) }));
  };

  return (
    <>
      <div>
        <IMG src={user.picture.large} alt={user.name} />
      </div>
      <Grid>
        <div>{user.name}</div>
        <div>{user.login}</div>
        <div>{user.email}</div>
        <div>{user.phone}</div>
        <div>
          <input
            type="number"
            defaultValue={user.raiting}
            max="3"
            min="-3"
            onChange={handleChange}
          />
        </div>
      </Grid>
    </>
  );
};

export default UserCard;
