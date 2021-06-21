import React, {
  FC,
  Fragment,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { selectUsers } from '../users/usersSlice';
import { User } from '../../types/types';

const Grid = styled.div`
display: grid;
grid-template-columns: 70px repeat(5, 1fr);

& div {
  margin: 10px;
  display: flex;
  align-items: center;
}
`;

const HeaderCell = styled.div`
display: flex;
justify-content: space-between;
`;

const Leaders: FC = () => {
  const users = useAppSelector(selectUsers);
  const leaders = users.slice().sort((a, b) => (
    b.rating - a.rating
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
      <h2>Leaders</h2>
      <Grid data-testid="grid-leaders">
        <div>&nbsp;</div>
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
        <div>RATING</div>
        {sortedLeaders.map((leader) => (
          <Fragment key={leader.id}>
            <div><img src={leader.picture.avatar} alt={leader.name} /></div>
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
