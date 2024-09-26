const validateSession = () => {
  const session = JSON.parse(localStorage.getItem('session'));
  if (session) {
    return true;
  }
  return false;
};
export default validateSession;
