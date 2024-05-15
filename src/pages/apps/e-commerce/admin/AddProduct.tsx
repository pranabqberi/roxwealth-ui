import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import Button from 'components/base/Button';
import Dropzone from 'components/base/Dropzone';

interface SpecData {
  type: string;
  value: string;
}

interface Product {
  uniqueID: string;
  title: string;
  description: string;
  vendor: string;
  type: string;
  tags: string;
  isPublished: boolean;
  imageURL: string[];
  quantity: number;
  productSpecData?: { [key: string]: SpecData };
}

interface CustomField {
  name: string;
  type: string;
  value: string;
}

interface specifications {
  name: string;
  type: string;
}
interface Type {
  id: string;
  name: string;
  specifications: specifications[];
}

const sampleTypes: Type[] = [
  {
    id: '1',
    name: 'category-1',
    specifications: [
      {
        name: 'Spec 1 of category-1',
        type: 'text'
      }
    ]
  },
  {
    id: '2',
    name: 'category-2',
    specifications: [
      {
        name: 'Spec 1 of category-2',
        type: 'text'
      },
      {
        name: 'Spec 2',
        type: 'number'
      }
    ]
  },
  {
    id: '3',
    name: 'category-3',
    specifications: [
      {
        name: 'Spec 1 of category-3',
        type: 'text'
      },
      {
        name: 'Spec 2',
        type: 'number'
      },
      {
        name: 'Spec 3',
        type: 'date'
      }
    ]
  }
];

const AddProduct: React.FC = () => {
  const [types, setTypes] = useState<Type[]>(sampleTypes);

  useEffect(() => {
    const types = JSON.parse(localStorage.getItem('categories') || '[]');
    setTypes(types);
  }, []);

  const [product, setProduct] = useState<Product>({
    uniqueID: '',
    title: '',
    description: '',
    vendor: '',
    type: '',
    tags: '',
    isPublished: false,
    imageURL: [],
    quantity: 0
  });

  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      type: value
    }));
    // change custom fields based on type
    const selectedType = types.find(type => type.id === value);
    if (selectedType) {
      const newFields: CustomField[] = [];
      selectedType.specifications.forEach(spec => {
        newFields.push({
          name: spec.name,
          type: spec.type,
          value: ''
        });
      });
      setCustomFields(newFields);
    }
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      isPublished: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const specs: { [key: string]: SpecData } = {}; // Add index signature
    customFields.forEach(field => {
      specs[field.name] = {
        type: field.type,
        value: field.value
      };
    });
    product.productSpecData = specs;
    console.log(product);
  };

  const handleAddCustomField = () => {
    setCustomFields(prevFields => [
      ...prevFields,
      { name: '', type: 'text', value: '' }
    ]);
  };

  const handleRemoveCustomField = (index: number) => {
    setCustomFields(prevFields => {
      const newFields = [...prevFields];
      newFields.splice(index, 1);
      return newFields;
    });
  };

  const handleCustomFieldChange = (
    index: number,
    fieldName: keyof CustomField,
    value: string
  ) => {
    setCustomFields(prevFields => {
      const newFields = [...prevFields];
      newFields[index][fieldName] = value;
      return newFields;
    });
  };

  const handleImageUpload = (files: File[]) => {
    const fileNames: string[] = [];
    files.forEach(file => {
      fileNames.push(file.name);
    });
    setProduct(prevProduct => ({
      ...prevProduct,
      imageURL: fileNames
    }));
  };

  // const handleImageRemove = (index: number) => {
  //   setProduct(prevProduct => {
  //     const newImages = [...prevProduct.imageURL];
  //     newImages.splice(index, 1);
  //     return {
  //       ...prevProduct,
  //       imageURL: newImages
  //     };
  //   });
  // };

  return (
    <Container fluid className="p-3">
      <h2 className="text-center mb-4">Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                value={product.title}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Unique ID</Form.Label>
              <Form.Control
                type="text"
                name="uniqueID"
                placeholder="Enter unique ID"
                value={product.uniqueID}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Enter description"
                rows={3}
                value={product.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Vendor</Form.Label>
              <Form.Control
                type="text"
                name="vendor"
                placeholder="Enter vendor"
                value={product.vendor}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={product.type}
                onChange={onChangeType}
              >
                <option value="">Select Type</option>
                {types.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={product.tags}
                placeholder="Enter tags"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Is Published</Form.Label>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Published"
                checked={product.isPublished}
                onChange={handleSwitchChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={7}>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Dropzone size="sm" onDrop={handleImageUpload} />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                value={product.quantity}
                onChange={handleInputChange}
                max={9999}
                min={0}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12}>
            <h4 className="mb-3">Product Specifications</h4>
          </Col>
          {customFields.map((field, index) => (
            <Col xs={12} key={index}>
              <Row className="mt-1">
                <Col xs={3}>
                  <Form.Group>
                    <Form.Label>Field Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.name}
                      onChange={e =>
                        handleCustomFieldChange(index, 'name', e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.Label>Field Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={field.type}
                      onChange={e =>
                        handleCustomFieldChange(index, 'type', e.target.value)
                      }
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="date">Date</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.Label>Field Value</Form.Label>
                    <Form.Control
                      type={field.type}
                      placeholder={`Enter ${field.type} value`}
                      value={field.value}
                      onChange={e =>
                        handleCustomFieldChange(index, 'value', e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={3} className="d-flex align-items-end">
                  <Button
                    variant="phoenix-danger"
                    size="sm"
                    onClick={() => handleRemoveCustomField(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Col>
          ))}
          <Col xs={12} className="d-flex justify-content-end">
            <Button
              variant="phoenix-primary"
              size="sm"
              onClick={handleAddCustomField}
            >
              Add Specification
            </Button>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
