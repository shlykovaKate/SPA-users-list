import React, {
  FC,
  useState,
  useEffect,
  Fragment,
} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Users: FC = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('https://randomuser.me/api/?results=100');
    const usersData = res.data.results.map((user:any) => ({
      id: user.login.uuid,
      avatar: user.picture.thumbnail,
      name: `${user.name.first} ${user.name.last}`,
      login: user.login.username,
      email: user.email,
      phone: user.phone,
    }));
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const DivGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  `;

  return (
    <DivGrid>
      {users.map((user:any) => (
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
  );
};

export default Users;
