import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Dropzone from 'components/base/Dropzone';
import UploadToS3 from 'Actions/UploadToS3';

const CreateApp = () => {
  const [app, setApp] = useState({
    name: '' as string,
    description: '' as string,
    logo: '' as string,
    isPublished: false,
    organizationDetails: {
      id: '',
      name: '',
      logo: '',
      description: ''
    }
  });

  const id = useParams<{ id: string }>().id;
  useEffect(() => {
    const orgs = JSON.parse(localStorage.getItem('orgs') || '[]');
    const org = orgs.find((org: any) => org.id === id);
    if (org) {
      setApp({
        ...app,
        organizationDetails: {
          id: org.id,
          name: org.name,
          logo: org.logo,
          description: org.description
        }
      });
    }
  }, [id]);

  const handleDrop = async (files: File[]) => {
    const loc = await UploadToS3(files[0]);
    setApp({
      ...app,
      logo: loc as string
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApp({
      ...app,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log(app);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Create App</h1>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Dropzone className="mb-3 mt-3" onDrop={handleDrop} size="sm" />
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                type="text"
                placeholder="Enter description"
                name="description"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Published"
                name="isPublished"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateApp;
