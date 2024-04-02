import React, { useEffect } from 'react';
import { Button, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
// import axios from 'axios';

const ViewModal = ({ user }) => {
  const roles = user.roles || {};
  const hospitalMerchRoles = roles.HospitalMerch || [];
  const Qberi = roles.Qberi || [];
  const hroles = hospitalMerchRoles.join(', ');
  const qroles = Qberi.join(', ');
  return (
    <Modal.Body>
      <p>
        <strong>Name:</strong> {user.firstName + ' ' + user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.mobile}
      </p>
      <p>
        <strong>Share Percentage: </strong>
        {user.sharePercentage || 0}
      </p>
      <p>
        <strong>Hospital Merch Roles: </strong>
        {hroles}
      </p>
      <p>
        <strong>Qberi Roles: {''}</strong>
        {qroles}
      </p>
    </Modal.Body>
  );
};

ViewModal.propTypes = {
  user: PropTypes.object.isRequired
};

const allRoles = ['ADMIN', 'MODERATOR', 'VERIFIED USERS', 'USERS'];
const allGroups = ['HospitalMerch', 'Qberi', 'Bummel', 'MediaSpoor'];

const UserModal = ({ isOpen, handleClose, user, canEdit }) => {
  const [sharePercentage, setSharePercentage] = useState(
    user.sharePercentage || 0
  );
  const [userRoles, setUserRoles] = useState({});

  useEffect(() => {
    const roles = user.roles || {};
    const myRoles = {};
    allGroups.forEach(group => {
      myRoles[group] = roles[group] || [];
    });
    setUserRoles(myRoles);
  }, [user]);

  const handleSave = () => {
    const updatedUser = {
      userId: [user.id],
      sharePercentage: [sharePercentage],
      HospitalMerch: userRoles.HospitalMerch || [],
      Qberi: userRoles.Qberi || [],
      Bummel: userRoles.Bummel || [],
      MediaSpoor: userRoles.MediaSpoor || []
    };

    console.log(updatedUser);
    const session = JSON.parse(localStorage.getItem('session')) || {};
    const token = session.sessionToken || '';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    const URL = 'https:/engine.qberi.com/api/updateUser';

    axios
      .post(URL, updatedUser, { headers })
      .then(response => {
        console.log('Response:', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{canEdit ? 'Edit' : 'View'} User Information</Modal.Title>
      </Modal.Header>
      {canEdit ? (
        <>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={user.firstName + ' ' + user.lastName}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Share Percentage</Form.Label>
                <Form.Control
                  type="number"
                  name="sharePercentage"
                  value={sharePercentage}
                  onChange={e => setSharePercentage(e.target.value)}
                />
              </Form.Group>
              {/* <p>
                <h5>HospitalMerch Roles</h5>
                {allRoles.map(role => (
                  <Form.Check
                    key={role}
                    type="checkbox"
                    label={role}
                    name="HospitalMerch"
                    value={role}
                    checked={userRoles.HospitalMerch && userRoles.HospitalMerch.includes(role)}
                    onChange={e => {
                      const { value } = e.target;
                      setUserRoles(prevState => ({
                        ...prevState,
                        HospitalMerch: prevState.HospitalMerch && prevState.HospitalMerch.includes(value)
                          ? prevState.HospitalMerch.filter(role => role !== value)
                          : [...prevState.HospitalMerch, value]
                      }));
                    }}
                  />
                ))}
              </p> */}
              <Row>
                {allGroups.map(group => (
                  <Form.Group key={group}>
                    <Form.Label>{group} Roles</Form.Label>
                    {allRoles.map(role => (
                      <Form.Check
                        key={role}
                        type="checkbox"
                        label={role}
                        name={group}
                        value={role}
                        checked={
                          userRoles[group] && userRoles[group].includes(role)
                        }
                        onChange={e => {
                          const { value } = e.target;
                          setUserRoles(prevState => ({
                            ...prevState,
                            [group]:
                              prevState[group] &&
                              prevState[group].includes(value)
                                ? prevState[group].filter(
                                    role => role !== value
                                  )
                                : [...prevState[group], value]
                          }));
                        }}
                      />
                    ))}
                  </Form.Group>
                ))}
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <ViewModal user={user} />
      )}
    </Modal>
  );
};

UserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.any,
  canEdit: PropTypes.bool.isRequired
};

export default UserModal;
