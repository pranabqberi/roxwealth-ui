import { useEffect, useState } from 'react';
import { OrgType } from 'data/org';
import { Container, Row, Col, Table } from 'react-bootstrap';

const OrgDetails = () => {
  const [org, setOrg] = useState<OrgType | null>(null);

  useEffect(() => {
    const id = window.location.pathname.split('/')[2];
    const local = JSON.parse(localStorage.getItem('orgs') || '[]');
    const org = local.find((org: OrgType) => org.id === id);
    setOrg(org);
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Org Details</h1>
          {org && (
            <>
              <p>Name: {org.name}</p>
              <p>Logo: {org.logo}</p>
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
            <Table className="mt-5" striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>Last Modified At</th>
                  <th>Is Deleted</th>
                </tr>
              </thead>
              <tbody>
                {org.applications.map(app => (
                  <tr key={app.id}>
                    <td>{app.name}</td>
                    <td>{app.description}</td>
                    <td>{app.createdAt}</td>
                    <td>{app.lastModifiedAt}</td>
                    <td>{app.isDeleted ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {org && !org.applications && <p>No Applications</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default OrgDetails;
