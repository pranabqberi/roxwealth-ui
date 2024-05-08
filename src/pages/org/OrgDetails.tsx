import { useEffect, useState } from 'react';
import { OrgType, ApplicationsType } from 'data/org';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { ColumnDef } from '@tanstack/react-table';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import Avatar from 'components/base/Avatar';

const columns: ColumnDef<ApplicationsType>[] = [
  {
    header: 'Name',
    accessorKey: 'name'
  },
  {
    header: 'Description',
    accessorKey: 'description'
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt'
  },
  {
    header: 'Last Modified At',
    accessorKey: 'lastModifiedAt'
  }
];

const OrgDetails = () => {
  const [org, setOrg] = useState<OrgType | null>(null);

  const id = useParams<{ id: string }>().id;
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('orgs') || '[]');
    const org = local.find((org: OrgType) => org.id === id);
    setOrg(org);
  }, [id]);

  const table = useAdvanceTable({
    columns: columns,
    data: org?.applications || [],
    pageSize: 5,
    pagination: true
  });

  return (
    <Container>
      <Row>
        <Col>
          <h1>Org Details</h1>
          {org && (
            <>
              <p>Name: {org.name}</p>
              <Avatar src={org.logo} size="l" />
              <p>Description: {org.description}</p>
              <p>Created At: {org.createdAt}</p>
              <p>Last Modified At: {org.lastModifiedAt}</p>
              <p>Is Deleted: {org.isDeleted ? 'Yes' : 'No'}</p>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mt-5">Applications</h2>
          {org && org.applications && (
            <AdvanceTableProvider {...table}>
              <AdvanceTable />
              <AdvanceTableFooter pagination />
            </AdvanceTableProvider>
          )}
          {org && !org.applications && <p>No Applications</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default OrgDetails;
