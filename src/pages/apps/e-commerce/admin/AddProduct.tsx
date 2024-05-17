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

type TemplateInterface = {
  uniqueID: string;
  title: string;
  description: string;
  vendor: string;
  type: string;
  tags: string[];
  isPublished: boolean;
  imageUrl: string[];
  costPrice: number;
  quantity: number;
  specData: FieldType[];
  productSpecData?: { [key: string]: string };
  applicationMapped?: ApplicationMappedType;
};

const AddProduct = () => {
  const [productData, setProductData] = useState<TemplateInterface>({
    uniqueID: '',
    title: '',
    description: '',
    vendor: '',
    type: '',
    tags: [],
    isPublished: false,
    imageUrl: [],
    costPrice: 0,
    quantity: 0,
    specData: [],
    applicationMapped: {
      id: '',
      name: '',
      logo: '',
      description: ''
    }
  });
  const [templateData, setTemplateData] = useState<TemplateInterface[]>([]);

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

    setProductData({
      ...productData,
      applicationMapped
    });
    const templates = JSON.parse(localStorage.getItem('templates') || '[]');
    setTemplateData(templates);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSwitchChange = (e: any) => {
    const { name, checked } = e.target;
    setProductData({
      ...productData,
      [name]: checked
    });
  };

  const { showToast } = useContext(ToastContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const productSpecData: { [key: string]: string } = {};
    productData.specData.forEach(spec => {
      productSpecData[spec.name] = spec.value;
    });
    console.log(productSpecData);
    productData.productSpecData = productSpecData;
    console.log(productData);
    return false;

    const URL = 'https://engine.qberi.com/api/createTemplate';
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.sessionToken}`
    };

    axios
      .post(URL, productData, { headers })
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
    const specData = [...productData.specData];
    specData.push({
      name: '',
      value: ''
    });
    setProductData({
      ...productData,
      specData
    });
  };

  const handleDeleteProductSpec = (index: number) => {
    const specData = [...productData.specData];
    specData.splice(index, 1);
    setProductData({
      ...productData,
      specData
    });
  };

  const handleProductSpecChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const specData = [...productData.specData];
    specData[index] = {
      ...specData[index],
      [name]: value
    };
    setProductData({
      ...productData,
      specData
    });
  };

  const handleTemplateChange = (e: any) => {
    const { name, value } = e.target;
    const template: TemplateInterface =
      templateData.find(template => template.type === value) || productData;

    if (!template) {
      return;
    }
    console.log(template);
    setProductData({
      ...productData,
      [name]: value || '',
      title: template.title || '',
      description: template.description || '',
      vendor: template.vendor || '',
      type: template.type || '',
      tags: template.tags || [],
      isPublished: template.isPublished || false,
      imageUrl: template.imageUrl || [],
      costPrice: template.costPrice || 0,
      quantity: template.quantity || 0,
      specData: template.specData || []
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Add Product</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} lg={6}>
                <Form.Group controlId="uniqueID">
                  <Form.Label>Unique ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="uniqueID"
                    value={productData.uniqueID}
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
                    value={productData.title}
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
                    value={productData.description}
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
                    value={productData.vendor}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group controlId="type">
                  <Form.Label>Type (Unique)</Form.Label>
                  {/* <Form.Control
                    type="text"
                    name="type"
                    value={productData.type}
                    onChange={handleChange}
                  /> */}
                  {/* option list, on select it will fill the data from templates */}
                  <Form.Control
                    as="select"
                    name="type"
                    value={productData.type}
                    onChange={handleTemplateChange}
                  >
                    <option value="">Select Type</option>
                    {templateData.map(template => (
                      <option key={template.uniqueID} value={template.uniqueID}>
                        {template.type}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group controlId="isPublished">
                  <Form.Label>Is Published</Form.Label>
                  <Form.Check
                    type="switch"
                    name="isPublished"
                    label={productData.isPublished ? 'Yes' : 'No'}
                    className="px-8"
                    checked={productData.isPublished}
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
                    value={productData.costPrice}
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
                    value={productData.quantity}
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
                  {productData.specData.map((field, index) => (
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

export default AddProduct;
