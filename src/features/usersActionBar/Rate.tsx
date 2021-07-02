import React, { FC } from 'react';

interface RateProps {
  handleClick: (event: React.MouseEvent<SVGSVGElement>) => void;
  value: string;
}

const Rate: FC<RateProps> = ({ handleClick, value } : RateProps) => (
  <svg height="25" width="23" data-rating={value} onClick={handleClick}>
    <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" fill="currentColor">
      <title>{value}</title>
    </polygon>
  </svg>
);

export default Rate;
