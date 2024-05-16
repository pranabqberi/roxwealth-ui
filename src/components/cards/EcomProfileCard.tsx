import { Badge, Card, Col, Row } from 'react-bootstrap';
import Avatar from 'components/base/Avatar';

interface EcomProfileCardProps {
  details: any;
}

const EcomProfileCard: React.FC<EcomProfileCardProps> = ({ details }) => {
  try {
    return (
      <Card className="h-100">
        <Card.Body>
          <div className="border-bottom border-dashed border-300 pb-4">
            <Row className="align-items-center g-3 g-sm-5 text-center text-sm-start">
              <Col xs={12} className="d-flex justify-content-center" sm="auto">
                <Avatar src={details.pictureUrl} size="5xl" />
              </Col>
              <Col xs={12} sm="auto" className="flex-1">
                <h4 className="mb-0">
                  {details.firstName} <span className="text-900"> </span>
                  {details.lastName}
                </h4>
                <br />
                <p className="text-800">
                  <strong>Email:</strong> {details.email}
                </p>
                <p className="text-800">
                  <strong>Mobile:</strong> {details.mobile}
                </p>
                <p className="text-800">
                  <strong>Share Percentage: </strong>
                  {details.sharePercentage ? details.sharePercentage : '0'}
                </p>
                <div className="text-800">
                  {Object.keys(details.roles || {}).map((role: any, index) => (
                    <Col key={index} xs={12} sm="auto" className="flex-1">
                      <strong>{role}: </strong>
                      {details.roles[role].map((item: any, itemIndex: any) => (
                        <Badge bg="info" key={itemIndex} className="me-1">
                          {item}
                        </Badge>
                      ))}
                    </Col>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    );
  } catch (error) {
    console.error('An error occurred:', error);
    return <div>Error:</div>;
  }
};

export default EcomProfileCard;
