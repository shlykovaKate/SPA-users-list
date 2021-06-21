import { UsersState } from '../types/types';

export const initialState = {
  users: {
    users: [
      {
        email: 'gun.alex@example.com',
        id: '589b4db1-0318-4d0d-8880-a1e2f01a09f4',
        login: 'orange714',
        name: 'Gun Alex',
        phone: '0900-60555555',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/men/14.jpg',
          large: 'https://randomuser.me/api/portraits/men/14.jpg',
        },
        rating: '0',
      },
      {
        email: 'gunther.ley@example.com',
        id: '589b4db1-0318-4d0d-8880-a1e2f01a09f3',
        login: 'orangebird714',
        name: 'Gunther Ley',
        phone: '0900-6069217',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/men/14.jpg',
          large: 'https://randomuser.me/api/portraits/men/14.jpg',
        },
        rating: '0',
      },
      {
        email: 'sjur.lastad@example.com',
        id: 'ad88c1d9-c3d8-4077-9842-061c14451571',
        login: 'beautifulfrog496',
        name: 'Sjur Låstad',
        phone: '51511522',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/men/79.jpg',
          large: 'https://randomuser.me/api/portraits/men/79.jpg',
        },
        rating: '0',
      },
      {
        email: 'alexander.martinez@example.com',
        id: '72811834-351c-455a-b428-3097ec0b7480',
        login: 'brownladybug555',
        name: 'Alexander Martinez',
        phone: '016974 21532',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/men/12.jpg',
          large: 'https://randomuser.me/api/portraits/men/12.jpg',
        },
        rating: '0',
      },
      {
        email: 'eva.aubert@example.com',
        id: '34b83789-22aa-43e3-9712-8a566661d7f6',
        login: 'tinybear697',
        name: 'Eva Aubert',
        phone: '05-69-79-44-84',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/women/18.jpg',
          large: 'https://randomuser.me/api/portraits/women/18.jpg',
        },
        rating: '0',
      },
      {
        email: 'leonard.perez@example.com',
        id: '2d049a1e-4935-4114-88b1-085aee6f6699',
        login: 'sadfrog342',
        name: 'Leonard Perez',
        phone: '013873 71565',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/men/35.jpg',
          large: 'https://randomuser.me/api/portraits/men/35.jpg',
        },
        rating: '0',
      },
    ],
    status: 'idle',
    searchText: {
      name: '',
      login: '',
      email: '',
      phone: '',
      rating: '',
    },
    filteredUsers: [
      {
        email: 'alexander.martinez@example.com',
        id: '72811834-351c-455a-b428-3097ec0b7480',
        login: 'brownladybug555',
        name: 'Alexander Martinez',
        phone: '016974 21532',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/men/12.jpg',
          large: 'https://randomuser.me/api/portraits/men/12.jpg',
        },
        rating: '0',
      },
      {
        email: 'eva.aubert@example.com',
        id: '34b83789-22aa-43e3-9712-8a566661d7f6',
        login: 'tinybear697',
        name: 'Eva Aubert',
        phone: '05-69-79-44-84',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/women/18.jpg',
          large: 'https://randomuser.me/api/portraits/women/18.jpg',
        },
        rating: '0',
      },
      {
        email: 'gun.alex@example.com',
        id: '589b4db1-0318-4d0d-8880-a1e2f01a09f4',
        login: 'orange714',
        name: 'Gun Alex',
        phone: '0900-60555555',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/men/14.jpg',
          large: 'https://randomuser.me/api/portraits/men/14.jpg',
        },
        rating: '0',
      },
      {
        email: 'gunther.ley@example.com',
        id: '589b4db1-0318-4d0d-8880-a1e2f01a09f3',
        login: 'orangebird714',
        name: 'Gunther Ley',
        phone: '0900-6669217',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/men/14.jpg',
          large: 'https://randomuser.me/api/portraits/men/14.jpg',
        },
        rating: '0',
      },
      {
        email: 'leonard.perez@example.com',
        id: '2d049a1e-4935-4114-88b1-085aee6f6699',
        login: 'sadfrog342',
        name: 'Leonard Perez',
        phone: '013873 71565',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/men/35.jpg',
          large: 'https://randomuser.me/api/portraits/men/35.jpg',
        },
        rating: '0',
      },
      {
        email: 'sjur.lastad@example.com',
        id: 'ad88c1d9-c3d8-4077-9842-061c14451571',
        login: 'beautifulfrog496',
        name: 'Sjur Låstad',
        phone: '51511522',
        picture: {
          avatar: 'https://randomuser.me/api/portraits/thumb/men/79.jpg',
          large: 'https://randomuser.me/api/portraits/men/79.jpg',
        },
        rating: '0',
      },
    ],
    sorting: {
      columnName: '',
      rule: '',
    },
  } as UsersState,
};

export const filteredUsers = [
  {
    email: 'alexander.martinez@example.com',
    id: '72811834-351c-455a-b428-3097ec0b7480',
    login: 'brownladybug555',
    name: 'Alexander Martinez',
    phone: '016974 21532',
    picture: {
      avatar: 'https://randomuser.me/api/portraits/thumb/men/12.jpg',
      large: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    rating: '0',
  },
];
