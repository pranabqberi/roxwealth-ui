const updateSession = () => {
  const appData = JSON.parse(localStorage.getItem('appData'));
  const session = appData.session;

  if (!session) {
    return false;
  }
  const now = new Date();
  session.updated_at = now;
  appData.session = session;
  localStorage.setItem('appData', JSON.stringify(appData));

  return true;
};

export default updateSession;
