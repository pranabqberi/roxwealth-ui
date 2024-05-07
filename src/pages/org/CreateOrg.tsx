import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from 'components/base/Button';
import Dropzone from 'components/base/Dropzone';

type OrgRegistration = {
  name: string;
  logo: string;
  description: string;
  createdBy: {
    id: string;
  };
};

const CreateOrg: React.FC = () => {
  const [org, setOrg] = useState<OrgRegistration>({
    name: '',
    logo: '',
    description: '',
    createdBy: {
      id: ''
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrg({
      ...org,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(org);
  };

  const onDrop = (files: any) => {
    console.log(files);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Create Organization</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="mt-5" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={org.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicLogo">
              <Form.Label>Logo</Form.Label>
              <Dropzone className="dropzone" size="sm" onDrop={onDrop} />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter description"
                name="description"
                value={org.description}
                onChange={handleChange}
                className="mt-2 mb-2"
              />
            </Form.Group>

            <Button type="submit" variant="phoenix-primary" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateOrg;
