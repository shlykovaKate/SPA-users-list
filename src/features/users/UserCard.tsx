import React, { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Params } from '../../types/types';
import {
  selectUser,
  changeUserRaiting,
  selectFilteredUsers,
  selectSorting,
  loadFilteredUsers,
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
  const { id } = useParams<Params>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state, id));
  const filteredUsers = useAppSelector(selectFilteredUsers);
  const sorting = useAppSelector(selectSorting);

  useEffect(() => {
    if (sorting.columnName === 'raiting') {
      switch (sorting.rule) {
        case 'ASC': {
          const sortedUsers = filteredUsers.slice().sort((a, b) => (
            a.raiting > b.raiting ? 1 : -1
          ));
          dispatch(loadFilteredUsers(sortedUsers));
          break;
        }
        case 'DSC': {
          const sortedUsers = filteredUsers.slice().sort((a, b) => (
            a.raiting < b.raiting ? 1 : -1
          ));
          dispatch(loadFilteredUsers(sortedUsers));
          break;
        }
        default:
      }
    }
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeUserRaiting({ id, raiting: Number(event.target.value) }));
  };

  return (
    <>
      <ul>
        <li>
          <Link to="/leaders">Leaders</Link>
        </li>
      </ul>
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
