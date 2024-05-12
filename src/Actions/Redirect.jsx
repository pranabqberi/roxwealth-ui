const redirect = () => {
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  const role = profile.roles || {};
  const QberiRoles = role.Qberi || [];

  if (QberiRoles.includes('ADMIN')) {
    return 'dashboard/roxwealth';
  }
  if (QberiRoles.includes('VERIFIED USERS')) {
    return 'org/view';
  }
  return '/profile';
};

export default redirect;
