import axios from 'axios';

const UpdateProfile = async () => {
  const session = JSON.parse(localStorage.getItem('session') || '{}');
  const sessionToken = session.sessionToken;
  const email = session.email;

  const URL = 'https://engine.qberi.com/api/getProfile/' + email;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + sessionToken
  };

  axios
    .get(URL, { headers: headers })
    .then(response => {
      console.log('Profile data: ', response.data);
      localStorage.setItem('profile', JSON.stringify(response.data));
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching profile data: ', error);
      return error;
    });
};

export default UpdateProfile;
