import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../../types/types';

const User: FC = () => {
  const id:IUser = useParams();

  return (
    <h3>
      Requested user ID:
      {id.id}
    </h3>
  );
};

export default User;
