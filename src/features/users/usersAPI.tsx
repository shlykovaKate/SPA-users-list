import axios from 'axios';

const fetchUsers = () => axios.get('https://randomuser.me/api/?results=10');

export default fetchUsers;
