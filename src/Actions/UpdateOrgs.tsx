import { OrgType } from 'data/org';
import axios from 'axios';

export const UpdateOrgs = () => {
  const URL = 'https://engine.qberi.com/api/allOrganizations';
  const session = JSON.parse(localStorage.getItem('session') || '{}');
  const sessionToken = session.sessionToken;
  let orgs: OrgType[] = [];

  axios
    .get(URL, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    })
    .then(res => {
      orgs = res.data;
      localStorage.setItem('orgs', JSON.stringify(orgs));
    });

  return orgs;
};
