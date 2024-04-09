import React, { useState, useEffect } from 'react';
import { Badge, Card, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import Button from 'components/base/Button';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { ColumnDef } from '@tanstack/react-table';
import useAdvanceTable from 'hooks/useAdvanceTable';
import SearchBox from 'components/common/SearchBox';

interface Equipment {
  id: string;
  name: string;
  enabled: boolean;
}

interface AddEquipmentProps {
  type: string; // Assuming type is required
}

const AddEquipment: React.FC<AddEquipmentProps> = ({ type }) => {
  const session = JSON.parse(localStorage.getItem('session') || '{}');
  const sessionToken = session.sessionToken;

  const headers = {
    Authorization: `Bearer ${sessionToken}`
  };

  const [isAddOrEdit, setIsAddOrEdit] = useState('Add');
  const [formData, setFormData] = useState<Equipment>({
    id: '',
    name: '',
    enabled: true
  });

  const [allEquipments, setAllEquipments] = useState<Equipment[]>([]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await axios.get(
        'https://engine.qberi.com/api/allMedicalEquipments',
        { headers }
      );
      if (response.status === 200) {
        setAllEquipments(response.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isAddOrEdit === 'Add') {
        addMedicalEquipment(formData);
      } else {
        editMedicalEquipment(formData.id, formData.enabled, formData.name);
      }

      handleDiscard();
    } catch (error) {
      console.log('Error:', error);
      alert(
        `Error ${
          isAddOrEdit === 'Add' ? 'adding' : 'editing'
        } equipment: ${error}`
      );
    }
  };

  const addMedicalEquipment = async (data: Equipment) => {
    try {
      const response = await axios.post(
        'https://engine.qberi.com/api/registerMedicalEquipment',
        data,
        { headers }
      );
      console.log('Response:', response);
      alert('Product added successfully');
    } catch (error) {
      console.log('Error:', error);
      alert('Error adding equipment: ' + error);
    }
  };

  const editMedicalEquipment = async (
    id: string,
    state: boolean,
    name: string
  ) => {
    try {
      const data = {
        [id]: {
          name: [name],
          isEnabled: [state]
        }
      };
      const response = await axios.post(
        'https://engine.qberi.com/api/editMedicalEquipmentDetails',
        data,
        { headers }
      );
      console.log('Response:', response);
      alert('Product updated successfully');
    } catch (error) {
      console.log('Error:', error);
      alert('Error updating equipment: ' + error);
    }
  };

  const handleFormDelete = async (equipment: Equipment) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      try {
        const URL = `https://engine.qberi.com/api/deleteMedicalEquipment/${equipment.id}`;
        const response = await axios.delete(URL, { headers });
        console.log('Response:', response);
        alert('Product deleted successfully');
        fetchEquipment();
      } catch (error) {
        console.log('Error:', error);
        alert('Error deleting equipment: ' + error);
      }
    }
  };

  const handleDiscard = () => {
    setFormData({
      id: '',
      name: '',
      enabled: true
    });
    setIsAddOrEdit('Add');
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: checked }));
  };

  const handleFormEdit = (equipment: Equipment) => {
    setFormData(equipment);
    setIsAddOrEdit('Edit');
    console.log('Edit Equipment: ', equipment);
  };

  const medicalTableColumns: ColumnDef<Equipment>[] = [
    {
      header: 'Equipment Name',
      accessorKey: 'name',
      cell: ({ row: { original } }) => {
        return <>{original.name || 'N/A'}</>;
      },
      meta: {
        headerProps: { style: { width: 300 } }
      }
    },
    {
      header: 'Enabled',
      accessorKey: 'enabled',
      cell: ({ row: { original } }) => {
        // return <>{original.enabled ? 'Yes' : 'No'}</>;
        return (
          <Badge bg={original.enabled ? 'success' : 'danger'}>
            {original.enabled ? 'Yes' : 'No'}
          </Badge>
        );
      }
    },
    {
      header: 'Action',
      cell: ({ row: { original } }) => {
        return (
          <Button
            variant="phoenix-secondary"
            className="btn-sm"
            onClick={() => handleFormEdit(original)}
          >
            Edit
          </Button>
        );
      }
    },
    {
      header: 'Delete',
      cell: ({ row: { original } }) => {
        return (
          <Button
            variant="phoenix-danger"
            className="btn-sm"
            onClick={() => handleFormDelete(original)}
          >
            Delete
          </Button>
        );
      }
    }
  ];

  const table = useAdvanceTable({
    data: allEquipments,
    columns: medicalTableColumns,
    pageSize: 6,
    pagination: true,
    sortable: true,
    selection: true
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(e.target.value || undefined);
  };

  return (
    <div>
      <div className="mb-9">
        <div className="d-flex flex-wrap gap-3 flex-between-end mb-5">
          <div>
            <h2 className="mb-2">List of {type}s</h2>
          </div>
        </div>
        <Row className="g-5 p-2">
          <div className="mb-4">
            <SearchBox
              placeholder="Search equipment"
              onChange={handleSearchInputChange}
            />
          </div>
          <Col xs={12} xl={7} className="m-2">
            <AdvanceTableProvider {...table}>
              <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
                <AdvanceTable
                  tableProps={{ className: 'phoenix-table fs-9' }}
                />
                <AdvanceTableFooter pagination />
              </div>
            </AdvanceTableProvider>
          </Col>
          <Col xs={12} xl={4} className="m-2">
            <Row className="g-2">
              <Form onSubmit={handleFormSubmit}>
                <Col xs={12} xl={12}>
                  <Card className="mb-3">
                    <Card.Body>
                      <h4 className="mb-4">{isAddOrEdit} Medical Equipment</h4>
                      <Row className="g-3">
                        <Col xs={12} xl={12}>
                          <Form.Group className="mb-3">
                            <h5 className="mb-2 text-1000">Equipment Name</h5>
                            <Form.Control
                              type="text"
                              placeholder="String"
                              name="name"
                              onChange={handleChanges}
                              value={formData.name || ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} xl={12}>
                          <Form.Group className="mb-3">
                            <h5 className="mb-2 text-1000">Enabled</h5>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              name="enabled"
                              label={formData.enabled ? 'Enabled' : 'Disabled'}
                              // its value is true or false
                              checked={formData.enabled}
                              onChange={handleSwitchChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <div className="d-flex flex-wrap gap-2">
                    <Button variant="primary" type="submit">
                      {isAddOrEdit} Equipment
                    </Button>
                    <Button variant="secondary" onClick={handleDiscard}>
                      Discard
                    </Button>
                  </div>
                </Col>
              </Form>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddEquipment;
