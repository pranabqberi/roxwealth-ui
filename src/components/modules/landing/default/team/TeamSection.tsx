import TeamMemberDefault from 'components/common/TeamMemberDefault';
import { defaultTeamMembers } from 'data/users';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import bgLeft17 from 'assets/img/bg/bg-left-17.png';
import bgRight17 from 'assets/img/bg/bg-right-17.png';

const paraGraph = `Our global dynamic team is a vibrant and intellectual assembly of talented individuals from around the world, each bringing unique skills, perspectives, and experiences to the table. Together, we collaborate seamlessly, leveraging our collective expertise to tackle challenges and innovate solutions. With a shared commitment to excellence and a spirit of camaraderie, we thrive in an environment that fosters creativity, agility, and continuous learning. Our team embodies resilience and adaptability, navigating the ever-evolving landscape of global markets and technologies with confidence and enthusiasm. We are united in our pursuit of excellence, driving forward as a cohesive force to achieve our collective goals and make a meaningful impact on a global scale.`;

const TeamSection = () => {
  return (
    <section id="team">
      <div
        className="position-absolute h-70 w-100 bg-soft"
        style={{ transform: 'skew(0,-10deg)', top: '10%' }}
      />
      <div
        className="bg-holder z-index-2"
        style={{
          backgroundImage: `url(${bgLeft17})`,
          backgroundSize: 'auto',
          backgroundPosition: 'left center'
        }}
      />
      <div
        className="bg-holder z-index-2"
        style={{
          backgroundImage: `url(${bgRight17})`,
          backgroundSize: 'auto',
          backgroundPosition: 'right center'
        }}
      />

      <div
        className="container-small position-relative py-1 px-lg-7 px-xxl-3"
        style={{ zIndex: 10 }}
      >
        <Row>
          <Col xs={12} className="mb-4 text-center text-sm-start">
            <h4 className="text-primary fw-bolder mb-3">Team</h4>
            <h2>Our Global Executive Team</h2>
          </Col>
          <Col md={12} className="text-justify text-sm-start">
            <p>{paraGraph}</p>
          </Col>
          {/* <Col md={6} className="text-center text-sm-start">
            <p>
              The team is ready to answer all your questions within minutes. The
              efficient team is always at your beck and call.
            </p>
          </Col> */}
        </Row>
        <Row className="align-items-center ps-lg-11 pe-lg-9">
          {defaultTeamMembers.map(member => (
            <Col key={member.name} sm={6} md={4} lg={3}>
              <TeamMemberDefault member={member} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default TeamSection;
