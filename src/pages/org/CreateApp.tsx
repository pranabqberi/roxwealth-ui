import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Dropzone from 'components/base/Dropzone';
import UploadToS3 from 'Actions/UploadToS3';
import axios from 'axios';
import { ToastContext } from 'providers/ToastProvider';
import { UpdateOrgs } from 'Actions/UpdateOrgs';

const CreateApp = () => {
  const { id } = useParams<{ id: string }>();
  const [app, setApp] = useState({
    name: '',
    description: '',
    logo: '',
    isPublished: false,
    organizationDetails: {
      id: '',
      name: '',
      logo: '',
      description: ''
    }
  });
  const [uploaded, setUploaded] = useState(false);
  const { showToast } = useContext(ToastContext);

  const resetApp = () => {
    const orgs = JSON.parse(localStorage.getItem('orgs') || '[]');
    const org = orgs.find((org: any) => org.id === id);
    if (org) {
      setApp(prevState => ({
        ...prevState,
        organizationDetails: {
          id: org.id,
          name: org.name,
          logo: org.logo,
          description: org.description
        }
      }));
    }
  };

  useEffect(() => {
    resetApp();
  }, [id]);

  const handleDrop = async (files: File[]) => {
    setUploaded(false);
    const loc = await UploadToS3(files[0]);
    setApp(prevState => ({
      ...prevState,
      logo: loc as string
    }));
    setUploaded(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setApp(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = () => {
    setApp(prevState => ({
      ...prevState,
      isPublished: !prevState.isPublished
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(app);
    const URL = 'https://engine.qberi.com/api/createApplication';
    const session = JSON.parse(localStorage.getItem('session') || '{}');

    axios
      .post(URL, app, {
        headers: {
          Authorization: `Bearer ${session.sessionToken}`
        }
      })
      .then(res => {
        console.log(res);
        showToast('success', 'App created successfully');
      })
      .catch(err => {
        console.log(err);
        showToast('error', 'Failed to create app');
      });
    resetApp();
    UpdateOrgs();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Create App</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Organization</Form.Label>
              <Form.Control
                type="text"
                value={app.organizationDetails.name}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={app.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Dropzone className="mb-3 mt-3" onDrop={handleDrop} size="sm" />
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter description"
                name="description"
                value={app.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Published"
                name="isPublished"
                checked={app.isPublished}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!uploaded}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateApp;
