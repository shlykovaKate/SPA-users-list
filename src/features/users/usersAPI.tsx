import axios from 'axios';

const fetchUsers = () => axios.get('https://randomuser.me/api/?results=100');

export default fetchUsers;
