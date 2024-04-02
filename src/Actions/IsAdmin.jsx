const profile = JSON.parse(localStorage.getItem('profile') || '{}');
const roles = profile.roles || {};

const isQberiAdmin = () => {
  return roles.Qberi && roles.Qberi.includes('ADMIN');
};

const isHospitalMerchAdmin = () => {
  return roles.HospitalMerch && roles.HospitalMerch.includes('ADMIN');
};

const isBummelAdmin = () => {
  return roles.Bummel && roles.Bummel.includes('ADMIN');
};

const isMediaSpoorAdmin = () => {
  return roles.MediaSpoor && roles.MediaSpoor.includes('ADMIN');
};

export { isQberiAdmin, isHospitalMerchAdmin, isBummelAdmin, isMediaSpoorAdmin };
