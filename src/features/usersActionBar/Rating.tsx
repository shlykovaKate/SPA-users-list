import React, { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectUser,
  changeUserRating,
} from '../users/usersSlice';
import Rate, { RateProps } from './Rate';

interface RatingProps {
  id: string;
  max: number;
  min: number;
}

const Stars = styled.div`
  cursor: pointer;
  display: flex;
  margin: 0 auto;

  &[data-stars] svg {
    color: #ffd055;
  }

  &:hover svg {
    color: #ffd055 !important;
  }

  &[data-stars="-4"] svg:nth-child(1) ~ svg,
  &[data-stars="-3"] svg:nth-child(2) ~ svg,
  &[data-stars="-2"] svg:nth-child(3) ~ svg,
  &[data-stars="-1"] svg:nth-child(4) ~ svg,
  &[data-stars="0"] svg:nth-child(5) ~ svg,
  &[data-stars="1"] svg:nth-child(6) ~ svg,
  &[data-stars="2"] svg:nth-child(7) ~ svg,
  &[data-stars="3"] svg:nth-child(8) ~ svg,
  &[data-stars="4"] svg:nth-child(9) ~ svg {
    color: #d8d8d8;
  }

  svg:hover ~ svg {
    color: #d8d8d8 !important;
  }
`;

const Rating: FC<RatingProps> = ({ id, max, min }: RatingProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state, id));
  const range = [];

  for (let i = min; i <= max; i += 1) {
    range.push(i);
  }

  const handleClick: RateProps['handleClick'] = (event) => {
    const starElement = event.currentTarget;
    starElement.parentElement!.setAttribute('data-stars', starElement.dataset.rating!);
    dispatch(changeUserRating({ id, rating: Number(starElement.dataset.rating)! }));
  };

  return (
    <Stars data-stars={user.rating} data-testid="stars">
      {range.map((item) => (
        <Rate
          key={item}
          value={String(item)}
          handleClick={handleClick}
        />
      ))}
    </Stars>
  );
};

export default Rating;
