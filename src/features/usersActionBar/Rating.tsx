import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectUser,
  changeUserRating,
  selectFilteredUsers,
  selectSorting,
  loadFilteredUsers,
  selectSearchRatingText,
} from '../users/usersSlice';
import { RatingProp } from '../../types/types';
import Rate from './Rate';

const Stars = styled.div`
  cursor: pointer;
  display: flex;
  margin: 0 auto;

  &:hover {
    svg polygon {
      fill: #ffd055 !important;
    }
  }

  &[data-stars] {
    svg polygon {
      fill: #ffd055;
    }
  }

  &[data-stars="-4"] {
    svg:nth-child(1) ~ svg polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="-3"] {
    svg:nth-child(2) ~ svg polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="-2"] {
    svg:nth-child(3) ~ svg polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="-1"] {
    svg:nth-child(4) ~ svg polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="0"] {
    svg:nth-child(5) ~ svg polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="1"] {
    svg:nth-child(6) ~ svg polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="2"] {
    svg:nth-child(7) ~ svg polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="3"] {
    svg:nth-child(8) ~ svg polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="4"] {
    svg:nth-child(9) ~ svg polygon {
      fill: #d8d8d8;
    }
  }

  svg:hover ~ svg {
    polygon {
      fill: #d8d8d8 !important;
    }
  }
`;

const Rating: FC<RatingProp> = ({ id, max, min }: RatingProp) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state, id));
  const filteredUsers = useAppSelector(selectFilteredUsers);
  const sorting = useAppSelector(selectSorting);
  const searchRatingText = useAppSelector(selectSearchRatingText);
  const range = [];

  for (let i = min; i <= max; i += 1) {
    range.push(i);
  }

  useEffect(() => {
    let sortedUsers = filteredUsers;
    if (sorting.columnName === 'rating') {
      switch (sorting.rule) {
        case 'ASC': {
          sortedUsers = filteredUsers.slice().sort((a, b) => (
            a.rating > b.rating ? 1 : -1
          ));
          dispatch(loadFilteredUsers(sortedUsers));
          break;
        }
        case 'DSC': {
          sortedUsers = filteredUsers.slice().sort((a, b) => (
            a.rating < b.rating ? 1 : -1
          ));
          dispatch(loadFilteredUsers(sortedUsers));
          break;
        }
        default:
      }
    }

    if (searchRatingText) {
      const newFilteredUsers = sortedUsers.filter((item) => (
        item.rating === searchRatingText
      ));
      dispatch(loadFilteredUsers(newFilteredUsers));
    } else {
      dispatch(loadFilteredUsers(sortedUsers));
    }
  }, [user]);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const starElement = event.currentTarget;
    starElement.parentElement.setAttribute('data-stars', starElement.dataset.rating);
    dispatch(changeUserRating({ id, rating: starElement.dataset.rating }));
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
