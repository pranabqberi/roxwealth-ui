const Logout = () => {
  const session = JSON.parse(localStorage.getItem('session'));
  if (session) {
    localStorage.removeItem('session');
  }
  return true;
};

export default Logout;
