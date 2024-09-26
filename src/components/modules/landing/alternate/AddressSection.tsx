import { Col, Row } from 'react-bootstrap';
// import HelpCenter from '../default/address/HelpCenter';
import QueryForm from '../default/address/QueryForm';

const AddressSection = () => {
  return (
    <section className="pb-10 pb-xl-14" id="contact">
      <div className="container-small px-lg-7 px-xxl-3">
        <div className="text-center mb-7">
          <h5 className="text-info mb-3 ">Contact</h5>
        </div>
        <Row className="g-5 g-lg-5">
          <center>
            <Col xs={12} md={8} className="text-center text-md-start">
              <QueryForm />
            </Col>
          </center>
        </Row>
      </div>
    </section>
  );
};

export default AddressSection;
