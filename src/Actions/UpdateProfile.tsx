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
      localStorage.setItem('profile', JSON.stringify(response.data));
      const roles = response.data.roles;
      const qberi = roles.qberi;
      if (qberi.includes('ADMIN')) {
        return 'admin';
      }
      if (qberi.includes('VERIFIED USERS')) {
        return 'verified';
      }
      return 'user';
    })
    .catch(error => {
      console.error('Error fetching profile data: ', error);
      return 'user';
    });

  return 'user';
};

export default UpdateProfile;
