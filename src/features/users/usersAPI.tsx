import axios, { AxiosResponse } from 'axios';

const fetchUsers: () => Promise<AxiosResponse> = () => axios.get('https://randomuser.me/api/?results=10');

export default fetchUsers;
