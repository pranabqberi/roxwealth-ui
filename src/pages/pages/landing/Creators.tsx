import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { creators } from 'data/social/creators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faInstagram,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';
import ThemeToggler from 'components/common/ThemeToggler';

// If you are the developer looking into this file, you can add your details to the creators.ts file in the data/social folder.

const Creators = () => {
  return (
    <Container>
      <h1 className="my-4">Creators</h1>
      <p className="lead mb-4">
        Meet the creators of this awesome project and connect with them on
        social media.
      </p>
      <ThemeToggler className="position-absolute top-0 end-0 mt-4 me-4" />
      <Container className="d-flex flex-wrap justify-content-center">
        {creators.map(creator => (
          <Card
            key={creator.id}
            style={{ width: '18rem' }}
            className="mb-4 me-4 xs-12 sm-6 md-4 lg-3"
          >
            <Card.Img variant="top" src={creator.avatar} />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="mt-2 mb-3 fs-4 fw-bold">
                {creator.name}
              </Card.Title>
              <Card.Text className="mb-4 fs-6 text-muted">
                {creator.bio}
              </Card.Text>
              <Button
                variant="primary"
                href={creator.URL}
                target="_blank"
                className="mt-auto"
              >
                Visit Profile
              </Button>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center bg-white">
              <Button
                variant="outline-secondary"
                href={creator.github}
                target="_blank"
                className="me-2"
              >
                <FontAwesomeIcon icon={faGithub} size="2xl" />
              </Button>
              <Button
                variant="outline-secondary"
                href={creator.instagram}
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} size="2xl" />
              </Button>
              <Button
                variant="outline-secondary"
                href={creator.facebook}
                target="_blank"
                className="ms-2"
              >
                <FontAwesomeIcon icon={faFacebook} size="2xl" />
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </Container>
    </Container>
  );
};

export default Creators;
