import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  ListGroup,
  InputGroup
} from 'react-bootstrap';
import { ToastContext } from 'providers/ToastProvider';

const session = JSON.parse(localStorage.getItem('session')) || {};
const token = session.sessionToken || '';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
};

const GroupsRoles = () => {
  const [groups, setGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState('');
  const [group, setGroup] = useState('');

  const { showToast } = useContext(ToastContext);

  const fetchGroups = async () => {
    axios
      .get('https://engine.qberi.com/api/allGroups', { headers })
      .then(res => {
        setGroups(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const fetchRoles = async () => {
    axios
      .get('https://engine.qberi.com/api/allRoles', { headers })
      .then(res => {
        setRoles(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const URLaddRole = 'https://engine.qberi.com/api/addRole';
  const URLaddGroup = 'https://engine.qberi.com/api/addGroup';

  const addRoles = () => {
    const body = { name: role };
    try {
      axios
        .post(URLaddRole, body, { headers })
        .then(res => {
          console.log('Response:', res);
          // alert('Role added successfully');
          showToast('Role added successfully', 'success');
          setRole('');
        })
        .catch(error => {
          console.log('Error:', error);
          // alert('Error adding role' + error);
          showToast('Error adding role', 'error');
        });
    } catch (error) {
      console.log('Error:', error);
      // alert('Error adding role' + error);
      showToast('Error adding role', 'error');
    }
  };

  const addGroup = () => {
    const body = { name: group };
    try {
      axios
        .post(URLaddGroup, body, { headers })
        .then(res => {
          console.log('Response:', res);
          showToast('Group added successfully');
        })
        .catch(error => {
          console.log('Error:', error);
          showToast('Error adding Group' + error);
        });
    } catch (error) {
      console.log('Error:', error);
      showToast('Error adding Group' + error);
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchRoles();
  }, [addRoles, addGroup]);
  return (
    <Container>
      <h1 className="my-4 text-center">Groups and Roles</h1>
      <Row>
        <Col md={6}>
          <h2>Groups</h2>
          <ListGroup>
            {groups.map(group => (
              <ListGroup.Item key={group.id}>{group.name}</ListGroup.Item>
            ))}
          </ListGroup>
          <Form.Group className="my-3">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter group name"
                onChange={e => setGroup(e.target.value)}
                required
              />
              <Button onClick={addGroup} variant="secondary">
                Add Group
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6}>
          <h2>Roles</h2>
          <ListGroup>
            {roles.map(role => (
              <ListGroup.Item key={role.id}>{role.name}</ListGroup.Item>
            ))}
          </ListGroup>
          <Form.Group className="my-3">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter role name"
                required
                value={role}
                onChange={e => setRole(e.target.value)}
              />
              <Button onClick={addRoles} variant="secondary">
                Add Role
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default GroupsRoles;
