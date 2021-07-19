import React, {
  FC,
  Fragment,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { selectUsers, User } from '../users/usersSlice';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 58px repeat(5, 1fr);
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
    background-color: white;
  }
`;

const HeaderCell = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  font-weight: bolder;
`;

const Img = styled.div`
  justify-content: center;

  img {
    border-radius: 50%;
  }
`;

const H2 = styled.h2`
  margin: 20px 25px 10px;
`;

const Leaders: FC = () => {
  const users = useAppSelector(selectUsers);
  const leaders = users.slice().sort((a, b) => (
    Number(b.rating) - Number(a.rating)
  )).splice(0, 5);

  const setOfRating = new Set();
  leaders.forEach((leader) => setOfRating.add(leader.rating));

  let sortedLeaders: User[] = [];
  setOfRating.forEach((value) => {
    sortedLeaders = sortedLeaders.concat(leaders
      .filter((leader) => leader.rating === value)
      .sort((a, b) => (a.name > b.name ? 1 : -1)));
  });

  return (
    <>
      <H2>Leaders:</H2>
      <Grid data-testid="grid-leaders">
        <HeaderCell>&nbsp;</HeaderCell>
        <HeaderCell>
          NAME
        </HeaderCell>
        <HeaderCell>
          LOGIN
        </HeaderCell>
        <HeaderCell>
          EMAIL
        </HeaderCell>
        <HeaderCell>
          PHONE
        </HeaderCell>
        <HeaderCell>RATING</HeaderCell>
        {sortedLeaders.map((leader) => (
          <Fragment key={leader.id}>
            <Img><img src={leader.picture.avatar} alt={leader.name} /></Img>
            <div><Link to={`/users/${leader.id}`}>{leader.name}</Link></div>
            <div>{leader.login}</div>
            <div>{leader.email}</div>
            <div>{leader.phone}</div>
            <div>{leader.rating}</div>
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

export default Leaders;
