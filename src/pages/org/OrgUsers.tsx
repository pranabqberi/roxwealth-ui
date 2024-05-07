import { useEffect, useState } from 'react';
import { UserType } from 'data/org';
import { OrgType } from 'data/org';
import { Table } from 'react-bootstrap';

const OrgUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const id = window.location.pathname.split('/')[2];
    const local = JSON.parse(localStorage.getItem('orgs') || '[]');
    const org = local.find((org: OrgType) => org.id === id);
    // console.log(org);
    setUsers(org.users || []);
  }, []);

  return (
    <div>
      <h1>List of Users</h1>
      {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Last Modified At</th>
                        <th>Is Deleted</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.lastModifiedAt}</td>
                                <td>{user.isDeleted ? "Yes" : "No"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table> */}
      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Last Modified At</th>
            <th>Is Deleted</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.createdAt}</td>
                <td>{user.lastModifiedAt}</td>
                <td>{user.isDeleted ? 'Yes' : 'No'}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default OrgUsers;
