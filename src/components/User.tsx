import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

const User: FC = () => {
  const id:any = useParams();

  return (
    <h3>
      Requested user ID:
      {id.id}
    </h3>
  );
};

export default User;
