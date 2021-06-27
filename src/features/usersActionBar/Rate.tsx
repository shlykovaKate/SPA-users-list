import React, { FC } from 'react';
import styled from 'styled-components';
import { RateProp } from '../../types/types';

const Star = styled.svg`
  polygon {
    fill: #d8d8d8;
  }
`;

const Rate: FC<RateProp> = ({ handleClick, value } : RateProp) => (
  <Star height="25" width="23" data-rating={value} onClick={handleClick}>
    <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={{ fillRule: 'nonzero' }}>
      <title>{value}</title>
    </polygon>
  </Star>
);

export default Rate;
