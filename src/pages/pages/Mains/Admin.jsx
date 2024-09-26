import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersList from 'components/Admins/UsersTable';
import GroupsRoles from 'components/Admins/GroupsRoles';

const admins = [
  'nitish2@qberi.com',
  'rohan2@qberi.com',
  'pranab@qberi.com',
  'jaco@qberi.com'
];

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log(profile);
    if (profile) {
      if (profile.role !== 'admin' && !admins.includes(profile.email)) {
        navigate('/dashboard/roxwealth');
      }
    }
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      <p>
        This is the Admin page. You can only see this if you're logged in as an
        admin.
      </p>
      <UsersList />
      <GroupsRoles />
    </div>
  );
};

export default Admin;
