import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { UserItem } from '../../types/types';

const User: FC = () => {
  const id:UserItem = useParams();

  return (
    <h3>
      Requested user ID:
      {id.id}
    </h3>
  );
};

export default User;
