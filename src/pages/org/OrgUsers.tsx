import { useEffect, useState } from 'react';
import { UserType } from 'data/org';
import { OrgType } from 'data/org';
// import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { ColumnDef } from '@tanstack/react-table';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';

const columns: ColumnDef<UserType>[] = [
  {
    header: 'Name',
    accessorKey: 'name'
  },
  {
    header: 'Email',
    accessorKey: 'email'
  },
  {
    header: 'Role',
    accessorKey: 'role'
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt'
  },
  {
    header: 'Last Modified At',
    accessorKey: 'lastModifiedAt'
  },
  {
    header: 'Is Deleted',
    accessorKey: 'isDeleted',
    cell: (row: any) => (row.value ? 'Yes' : 'No')
  }
];

const OrgUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const id = useParams<{ id: string }>().id;

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('orgs') || '[]');
    const org = local.find((org: OrgType) => org.id === id);
    // console.log(org);
    setUsers(org.users || []);
  }, []);

  const table = useAdvanceTable({
    columns: columns,
    data: users
  });

  return (
    <div>
      <h1>List of Users</h1>
      {users.length === 0 && <p>No users</p>}
      {users.length > 0 && (
        <AdvanceTableProvider {...table}>
          <AdvanceTable />
          <AdvanceTableFooter pagination />
        </AdvanceTableProvider>
      )}
    </div>
  );
};

export default OrgUsers;
