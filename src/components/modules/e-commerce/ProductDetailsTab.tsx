// import React, { useState } from 'react';
// import { Card, Col, Nav, Pagination, Row, Stack, Tab } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import product23 from 'assets/img/products/23.png';
// import ProductSpecificationTables from './ProductSpecificationTables';
// import Rating from 'components/base/Rating';
// import Button from 'components/base/Button';
// import { productReviews } from 'data/e-commerce';
// import ProductReview from 'components/list-items/ProductReview';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import ReviewModal from 'components/modals/ReviewModal';
// import UsuallyBoughtTogetherCard from 'components/cards/UsuallyBoughtTogetherCard';
// import { suggestedProducts } from 'hospitalmerch/data/products';
// import useLightbox from 'hooks/useLightbox';
// import Lightbox from 'components/base/LightBox';
// import {
//   faChevronLeft,
//   faChevronRight
// } from '@fortawesome/free-solid-svg-icons';

const ProductDetailsTab = ({ data }: { data: any }) => {
  // console.log(data);
  return (
    <>
      {/* <Tab.Container defaultActiveKey="description">
        <Nav variant="underline" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="description">Description</Nav.Link>
          </Nav.Item>
        </Nav>
        <Row className="gx-3 gy-7">
          <Col xs={12} lg={7} xl={8}>
            <Tab.Content>
              <Tab.Pane
                eventKey="description"
                className="text-1100 pe-lg-6 pe-xl-12"
              >
                <p className="mb-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus eveniet, minus, nesciunt totam magnam quidem,
                  veniam aliquid corporis assumenda maiores fugiat! Excepturi
                  placeat, provident ut officiis autem aliquam amet! At neque
                  quam ab vel, eveniet corporis dolore accusamus aliquid amet!
                </p>
                <Lightbox {...lightboxProps} />
                <Link to="#!">
                  <img
                    src={product23}
                    alt=""
                    className="img-fluid mb-5 rounded-3"
                    onClick={() => openLightbox(1)}
                  />
                </Link>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Distinctio veritatis est voluptate dolore? Incidunt, deserunt
                  eos facilis accusantium earum rerum sint tempora quo quas
                  commodi. Optio molestiae ea totam voluptatem!
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="specification" className="pe-lg-6 pe-xl-12">
                <ProductSpecificationTables />
              </Tab.Pane>
              <Tab.Pane eventKey="reviews">
                <Card>
                  <Card.Header className="pb-0 border-bottom-0">
                    <Stack
                      gap={3}
                      direction="horizontal"
                      className="flex-wrap justify-content-between"
                    >
                      <div className="d-flex align-items-center flex-wrap">
                        <h2 className="fw-bolder me-3">
                          4.9
                          <span className="fs-8 text-500 fw-bold">/5</span>
                        </h2>
                        <div className="me-3">
                          <Rating
                            initialValue={4.5}
                            readonly
                            iconClass="fs-6"
                          />
                        </div>
                        <p className="text-900 mb-0 fw-semi-bold fs-7">
                          6548 ratings and 567 reviews
                        </p>
                      </div>
                      <Button
                        variant="primary"
                        className="rounded-pill"
                        onClick={() => setOpenReviewModal(true)}
                      >
                        Rate this product
                      </Button>
                    </Stack>
                  </Card.Header>
                  <Card.Body>
                    {productReviews.map(review => (
                      <ProductReview key={review.id} review={review} />
                    ))}

                    <Pagination className="mb-0 justify-content-center">
                      <Pagination.Prev>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </Pagination.Prev>
                      <Pagination.Item>1</Pagination.Item>
                      <Pagination.Item>2</Pagination.Item>
                      <Pagination.Item>3</Pagination.Item>
                      <Pagination.Item active>4</Pagination.Item>
                      <Pagination.Item>5</Pagination.Item>
                      <Pagination.Next>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </Pagination.Next>
                    </Pagination>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col xs={12} lg={5} xl={4}>
            <UsuallyBoughtTogetherCard products={suggestedProducts} />
          </Col>
        </Row>
      </Tab.Container>
      <ReviewModal
        show={openReviewModal}
        handleClose={() => setOpenReviewModal(false)}
      /> */}
    </>
  );
};

export default ProductDetailsTab;
