import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { ToastContext } from 'providers/ToastProvider';

const id = () => '_' + Math.random().toString(36).substr(2, 9);

type FieldType = {
  name: string;
  type: string;
  required: boolean;
};

const AddProductcategory = () => {
  const [productName, setProductName] = useState('');
  const [fields, setFields] = useState<FieldType[]>([]);
  const { showToast } = useContext(ToastContext);

  const [field, setField] = useState<FieldType>({
    name: '',
    type: '',
    required: false
  });

  const resetField = () => {
    setField({
      name: '',
      type: '',
      required: false
    });
  };

  const addField = () => {
    if (field.name && field.type) {
      setFields([...fields, field]);
      resetField();
    }
  };

  const removeField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const publishProduct = () => {
    const product = {
      id: id(),
      name: productName,
      specifications: fields
    };
    console.log(product);
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    categories.push(product);
    localStorage.setItem('categories', JSON.stringify(categories));

    setFields([]);
    setProductName('');

    showToast('Product published successfully', 'success');
  };

  return (
    <Container className="py-1">
      <Row>
        <Col>
          <h1>Add a Product Type</h1>
        </Col>
      </Row>
      <Row className="mb-3 mt-3">
        <Col xs={12} sm={6} className="mb-3">
          <Form.Group controlId="productName">
            <Form.Label
              className="required mb-0 mt-3 text-muted"
              visuallyHidden
            >
              Product Name
            </Form.Label>
            <h3 className="mb-3">Product Name</h3>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} className="mb-0 d-flex align-items-end">
          {/* Publish Product Button */}
          <Button
            variant="primary"
            type="button"
            className="mt-3 mb-3"
            onClick={publishProduct}
          >
            Publish Product
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h4>Fields</h4>
          {fields.length === 0 && <p>No fields added yet</p>}
          {fields.length > 0 && (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={index}>
                    <td>{field.name}</td>
                    <td>{field.type}</td>
                    <td>{field.required ? 'Yes' : 'No'}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => removeField(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <Row className="mb-3 d-flex justify-content-start">
        <Col>
          <h4>Add Fields</h4>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12} sm={3}>
          <Form.Group controlId="fieldName">
            <Form.Label>Field Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter field name"
              value={field.name}
              onChange={e => setField({ ...field, name: e.target.value })}
              required
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={3}>
          <Form.Group controlId="fieldType">
            <Form.Label>Field Type</Form.Label>
            <Form.Control
              as="select"
              value={field.type}
              onChange={e => setField({ ...field, type: e.target.value })}
              required
            >
              <option value="">Select type</option>
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
              <option value="date">date</option>
              <option value="enum">enum</option>
              <option value="array">array</option>
              <option value="object">object</option>
              <option value="image">image</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={3} className="d-flex align-items-end">
          <Form.Group controlId="fieldRequired">
            <Form.Check
              type="checkbox"
              label="Required"
              checked={field.required}
              onChange={e => setField({ ...field, required: e.target.checked })}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={3} className="d-flex align-items-end">
          <Button
            variant="primary-outline"
            type="button"
            onClick={addField}
            className="border border-primary"
          >
            Add Field
          </Button>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <Button
            variant="primary"
            type="button"
            className="mt-3 mb-3"
            onClick={publishProduct}
          >
            Publish Product
          </Button>
        </Col>
      </Row> */}
    </Container>
  );
};

export default AddProductcategory;
