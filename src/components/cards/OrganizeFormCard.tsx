import { Card, Col, Form, Row } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const OrganizeFormCard = ({
  className,
  type,
  formData,
  setFormData
}: {
  className?: string;
  type?: string;
  formData?: any;
  setFormData?: any;
}) => {
  const [allEquipments, setAllEquipments] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState('');
  interface Equipment {
    id: string;
    name: string;
    enabled: boolean;
  }

  const changeHandler = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const fetchData = useCallback(async () => {
    const URL = 'https://engine.qberi.com/api/allMedicalEquipments';
    try {
      const sessionToken = localStorage.getItem('sessionToken');
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      });
      if (response.status === 200) {
        console.log('response', response.data);
        setAllEquipments(response.data);
        setLoading(false);
      }
    } catch (error) {
      setError('An error occurred while fetching data.');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {type === 'battery' ? (
        <Card className={className}>
          <Card.Body>
            <h4 className="mb-4">Add Specifications</h4>
            {
              <Row className="gx-3 gy-4">
                {/* <Col xs={12} sm={6} xl={12}>
            <div className="d-flex gap-2 mb-2">
              <h5 className="mb-0 text-1000">Category</h5>
              <Link className="fw-bold fs-9" to="#!">
                Add new category
              </Link>
            </div>
            <Form.Select aria-label="category">
              <option value="men-cloth">Men's Clothing</option>
              <option value="women-cloth">Womens's Clothing</option>
              <option value="kid-cloth">Kid's Clothing</option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={6} xl={12}>
            <div className="d-flex gap-2 mb-2">
              <h5 className="mb-0 text-1000">Vendor</h5>
              <Link className="fw-bold fs-9" to="#!">
                Add new vendor
              </Link>
            </div>
            <Form.Select aria-label="vendor">
              <option value="men-cloth">Men's Clothing</option>
              <option value="women-cloth">Womens's Clothing</option>
              <option value="kid-cloth">Kid's Clothing</option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={6} xl={12}>
            <h5 className="mb-2 text-1000">Collection</h5>
            <Form.Control placeholder="Collection" />
          </Col>
          <Col xs={12} sm={6} xl={12}>
            <div className="d-flex gap-2 mb-2">
              <h5 className="mb-0 text-1000">Tags</h5>
              <Link className="fw-bold fs-9 lh-sm" to="#!">
                View all tags
              </Link>
            </div>
            <Form.Select aria-label="vendor">
              <option value="men-cloth">Men's Clothing</option>
              <option value="women-cloth">Womens's Clothing</option>
              <option value="kid-cloth">Kid's Clothing</option>
            </Form.Select>
          </Col> */}
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Model</h5>
                  {/* <Form.Control placeholder="String" /> */}
                  <Form.Control
                    name="model"
                    value={formData.model}
                    onChange={changeHandler}
                    placeholder="String"
                  />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Color</h5>
                  {/* <Form.Control placeholder="String" /> */}
                  <Form.Control
                    name="color"
                    value={formData.color}
                    onChange={changeHandler}
                    placeholder="String"
                  />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Cell Quantity</h5>
                  {/* <Form.Control placeholder="Integer" /> */}
                  <Form.Control
                    name="cellQuantity"
                    value={formData.cellQuantity}
                    onChange={changeHandler}
                    placeholder="Integer"
                  />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Cell Capacity</h5>
                  {/* <Form.Control placeholder="String" /> */}
                  <Form.Control
                    name="cellCapacity"
                    value={formData.cellCapacity}
                    onChange={changeHandler}
                    placeholder="String"
                  />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Cell Type</h5>
                  {/* <Form.Control placeholder="String" /> */}
                  <Form.Control
                    name="cellType"
                    value={formData.cellType}
                    onChange={changeHandler}
                    placeholder="String"
                  />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Cell Brand</h5>
                  {/* <Form.Control placeholder="String" /> */}
                  <Form.Control
                    name="cellBrand"
                    value={formData.cellBrand}
                    onChange={changeHandler}
                    placeholder="String"
                  />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Voltage</h5>
                  {/* <Form.Control placeholder="String" /> */}
                  <Form.Control
                    name="voltage"
                    value={formData.voltage}
                    onChange={changeHandler}
                    placeholder="String"
                  />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Compatible Devices</h5>
                  {/* <Form.Control placeholder="Comma Seperated Values" /> */}
                  <Form.Control
                    name="compatibleDevices"
                    value={formData.compatibleDevices}
                    onChange={changeHandler}
                    placeholder="Comma Seperated Values"
                  />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Other Compatible Models</h5>
                  {/* <Form.Control placeholder="Comma Seperated Values" /> */}
                  <Form.Control
                    name="otherCompatibleModels"
                    value={formData.otherCompatibleModels}
                    onChange={changeHandler}
                    placeholder="Comma Seperated Values"
                  />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <div className="d-flex gap-2 mb-2">
                    <h5 className="mb-0 text-1000">Medical Equipment Name</h5>
                  </div>
                  <Form.Select aria-label="medicalEquipmentName">
                    {allEquipments.map((equipment: Equipment) => (
                      <option key={equipment.id} value={equipment.id}>
                        {equipment.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Weight</h5>
                  <Form.Control placeholder="String" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Dimensions</h5>
                  <Form.Control placeholder="String" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Price</h5>
                  <Form.Control placeholder="String" />
                </Col>
              </Row>
            }
          </Card.Body>
        </Card>
      ) : type === 'equipment' ? (
        <Card className={className}>
          <Card.Body>
            <h4 className="mb-4">No Specifications Required</h4>
          </Card.Body>
        </Card>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default OrganizeFormCard;
