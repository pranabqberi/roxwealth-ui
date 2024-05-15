import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { OrgType } from 'data/org';
import { UpdateOrgs } from 'Actions/UpdateOrgs';
import Avatar from 'components/base/Avatar';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/base/AdvanceTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { ColumnDef } from '@tanstack/react-table';

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const TableColumns: ColumnDef<OrgType>[] = [
  {
    header: 'Name',
    accessorKey: 'name'
  },
  {
    header: 'Logo',
    accessorKey: 'logo',
    cell: ({ row: { original } }) => {
      return <Avatar src={original.logo} size="m" />;
    }
  },
  {
    header: 'Description',
    accessorKey: 'description'
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: ({ row: { original } }) => {
      return formatDate(original.createdAt);
    }
  }
];

const ListOrg = () => {
  const [orgs, setOrgs] = useState<OrgType[]>([]);

  useEffect(() => {
    // setOrgs(UpdateOrgs());
    UpdateOrgs();
    const local = JSON.parse(localStorage.getItem('orgs') || '[]');
    console.log(local);
    setOrgs(local);
  }, []);

  const table = useAdvanceTable({
    columns: TableColumns,
    data: orgs,
    pageSize: 5,
    pagination: true,
    sortable: true
  });

  return (
    <Container fluid>
      <h1 className=" mt-2 text-center text-primary text-uppercase">
        Organizations
      </h1>
      <AdvanceTableProvider {...table}>
        <AdvanceTable tableProps={{ className: 'mt-7' }} />
        <AdvanceTableFooter pagination />
      </AdvanceTableProvider>
    </Container>
  );
};

export default ListOrg;