import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import Section from 'components/base/Section';
// import EcoimDefaultAddressCard from 'components/cards/EcoimDefaultAddressCard';
import EcomProfileCard from 'components/cards/EcomProfileCard';
// import PageBreadcrumb from 'components/common/PageBreadcrumb';
import ProfileDetailsTab from 'components/modules/e-commerce/profile/ProfileDetailsTab';
// import { defaultBreadcrumbItems } from 'data/commonData';
import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { SitemapContext } from 'providers/SitemapProvider';
import { OrganizationType } from 'sitemap2';

const setProfile = (response: any) => {
  localStorage.setItem('profile', JSON.stringify(response));
};

const Profile = () => {
  const [error, setError] = useState('');
  const { setRole, setOrganizations } = useContext(SitemapContext);

  const [profileDetail, setProfileDetails] = useState({
    email: 'Email Not Found',
    id: 'Not Found',
    mobile: 'XXXXXXXXXX',
    name: 'Not Found',
    profilePicture: 'Not Available'
  });
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const sessionToken = session.sessionToken;
    const email = session.email;

    const URL = 'https://engine.qberi.com/api/getProfile/' + email;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionToken
    };
    axios
      .get(URL, { headers: headers })
      .then(response => {
        const roles = response.data.roles;
        const qberi: string[] = roles.Qberi;
        if (qberi.includes('ADMIN')) {
          localStorage.setItem('role', 'admin');
          setRole('admin');
        } else if (qberi.includes('VERIFIED USERS')) {
          localStorage.setItem('role', 'verified');
          setRole('verified');
        } else {
          localStorage.setItem('role', 'user');
          setRole('user');
        }
        setProfileDetails(response.data);
        setProfile(response.data);
      })
      .catch(error => {
        setError('Error fetching profile data' + error);
      });

    const URL2 = 'https://engine.qberi.com/api/allOrganizations';
    axios
      .get(URL2, {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      })
      .then(res => {
        const orgs: OrganizationType[] = res.data;
        setOrganizations(orgs);
        localStorage.setItem('orgs', JSON.stringify(orgs));
      })
      .catch(err => {
        setError('Error fetching organizations' + err);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pt-5 mb-9">
      <Section small className="py-0">
        {/* <PageBreadcrumb items={defaultBreadcrumbItems} /> */}
        <Row className="align-items-center justify-content-between g-3 mb-4">
          <Col xs="auto">
            <h2 className="mb-0">Profile</h2>
          </Col>
          <Col xs="auto" className="d-flex flex-wrap gap-2 gap-sm-3">
            {/* <Button
              variant="phoenix-danger"
              startIcon={<FontAwesomeIcon className="me-2" icon={faTrashAlt} />}
            >
              Delete customer
            </Button> */}
            <Button
              variant="phoenix-secondary"
              startIcon={<FontAwesomeIcon className="me-2" icon={faKey} />}
            >
              Reset password
            </Button>
          </Col>
        </Row>
        <Row className="g-3 mb-6">
          <Col xs={18} lg={12}>
            <EcomProfileCard details={profileDetail} />
          </Col>
          {/* <Col xs={12} lg={4}>
            <EcoimDefaultAddressCard details={profileDetail} />
          </Col> */}
        </Row>
        <ProfileDetailsTab details={profileDetail} />
      </Section>
    </div>
  );
};

export default Profile;
