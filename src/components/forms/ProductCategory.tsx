import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from 'components/base/Button';
import { ToastContext } from 'providers/ToastProvider';
import { useParams } from 'react-router-dom';
import Dropzone from 'components/base/Dropzone';
import axios from 'axios';

type FieldType = {
  name: string;
  value: string;
};

type ApplicationMappedType = {
  id: string;
  name: string;
  logo: string;
  description: string;
};

export type TemplateInterface = {
  uniqueId: string;
  id?: string;
  title: string;
  description: string;
  vendor: string;
  type: string;
  tags?: string[];
  isPublished: boolean;
  imageUrl: string[];
  costPrice: number;
  quantity: number;
  specData: FieldType[];
  productSpecData: { [key: string]: string };
  applicationMapped?: ApplicationMappedType;
};

const AddProductcategory = () => {
  const [templateData, setTemplateData] = useState<TemplateInterface>({
    uniqueId: '',
    title: '',
    description: '',
    vendor: '',
    type: '',
    isPublished: false,
    tags: [],
    imageUrl: [],
    costPrice: 0,
    quantity: 0,
    specData: [],
    productSpecData: {},
    applicationMapped: {
      id: '',
      name: '',
      logo: '',
      description: ''
    }
  });

  const appID = useParams<{ appID: string }>().appID;
  useEffect(() => {
    const applications = JSON.parse(
      localStorage.getItem('applications') || '[]'
    );
    const application = applications.find((app: any) => app.id === appID) || {};

    if (!application) {
      return;
    }
    const applicationMapped = {
      id: application.id || '',
      name: application.name || '',
      logo: application.logo || '',
      description: application.description || ''
    };

    setTemplateData({
      ...templateData,
      applicationMapped
    });
  }, []);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTemplateData({
      ...templateData,
      [name]: value
    });
  };

  const handleSwitchChange = (e: any) => {
    const { name, checked } = e.target;
    setTemplateData({
      ...templateData,
      [name]: checked
    });
  };

  const { showToast } = useContext(ToastContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const productSpecData: { [key: string]: string } = {}; // Add index signature
    templateData.specData.forEach(spec => {
      productSpecData[spec.name] = spec.value;
    });
    console.log(productSpecData);
    templateData.productSpecData = productSpecData;
    console.log(templateData);

    const URL = 'https://engine.qberi.com/api/createTemplate';
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.sessionToken}`
    };

    axios
      .post(URL, templateData, { headers })
      .then(response => {
        console.log(response.data);
        showToast('Product category added successfully', 'success');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAddProductSpec = (e: any) => {
    e.preventDefault();
    const specData = [...templateData.specData];
    specData.push({
      name: '',
      value: ''
    });
    setTemplateData({
      ...templateData,
      specData
    });
  };

  const handleDeleteProductSpec = (index: number) => {
    const specData = [...templateData.specData];
    specData.splice(index, 1);
    setTemplateData({
      ...templateData,
      specData
    });
  };

  const handleProductSpecChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const specData = [...templateData.specData];
    specData[index] = {
      ...specData[index],
      [name]: value
    };
    setTemplateData({
      ...templateData,
      specData
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Add Product Template</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} lg={6}>
                <Form.Group controlId="uniqueId">
                  <Form.Label>Unique ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="uniqueId"
                    value={templateData.uniqueId}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={templateData.title}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={12}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={3}
                    name="description"
                    value={templateData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group controlId="vendor">
                  <Form.Label>Vendor</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendor"
                    value={templateData.vendor}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group controlId="type">
                  <Form.Label>Type (Unique)</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={templateData.type}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              {/* <Col md={6} lg={6}>
                <Form.Group controlId="tags">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    name="tags"
                    value={templateData.tags}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col> */}
              <Col md={6} lg={6}>
                <Form.Group controlId="isPublished">
                  <Form.Label>Is Published</Form.Label>
                  <Form.Check
                    type="switch"
                    name="isPublished"
                    label={templateData.isPublished ? 'Yes' : 'No'}
                    className="px-8"
                    checked={templateData.isPublished}
                    onChange={handleSwitchChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={12}>
                <Form.Group controlId="imageUrl">
                  <Form.Label>Images</Form.Label>
                  <Dropzone size="sm" />
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group controlId="costPrice">
                  <Form.Label>Cost Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="costPrice"
                    value={templateData.costPrice}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={templateData.quantity}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Row className="mt-4">
                <Col md={6} lg={3}>
                  <h3>Product Specs</h3>
                </Col>
                <Col md={6} lg={6}>
                  <Button
                    variant="phoenix-primary"
                    onClick={handleAddProductSpec}
                  >
                    Add Product Spec
                  </Button>
                </Col>
                <Col md={6} lg={12}>
                  {templateData.specData.map((field, index) => (
                    <Row key={index}>
                      <Col md={6} lg={4}>
                        <Form.Group controlId="name">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={field.name}
                            onChange={e => handleProductSpecChange(e, index)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} lg={4}>
                        <Form.Group controlId="value">
                          <Form.Label>Value</Form.Label>
                          <Form.Control
                            type="text"
                            name="value"
                            value={field.value}
                            onChange={e => handleProductSpecChange(e, index)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} lg={4} className="d-flex align-items-end">
                        <Button
                          variant="phoenix-danger"
                          onClick={() => handleDeleteProductSpec(index)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
              <Col md={6} lg={12} className="mt-4">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProductcategory;
