import { jwtDecode } from "jwt-decode"; 
import axios from "axios";

const createOrGetUser = async (response) => {
  try {
    const decoded = jwtDecode(response.credential); 
    const { name, picture, sub } = decoded;

    const user = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    };

    await axios.post('http://localhost:3001/api/auth', user);
    console.log('User created or fetched successfully');
  } catch (error) {
    console.error('Error creating or fetching user:', error);
  }
};

export default createOrGetUser;