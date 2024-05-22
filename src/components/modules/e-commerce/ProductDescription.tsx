import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
// import Rating from 'components/base/Rating';
// import ProductColorNav from 'components/navs/ProductColorNav';
import { productColorVariants } from 'data/e-commerce';
// import { currencyFormat } from 'helpers/utils';
import ProductGallery from 'components/modules/e-commerce/ProductGallery';
import { useMemo, useState } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import QuantityButtons from 'components/common/QuantityButtons';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faArchive,
  faShareAlt,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';

const ProductDescription = ({ data }: { data: any }) => {
  const [selectedVariantKey] = useState('blue');
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(() => {
    return productColorVariants.find(
      variant => variant.id === selectedVariantKey
    );
  }, [selectedVariantKey]);

  return (
    <Row className="g-5 mb-5 mb-lg-8">
      <Col xs={12} lg={6}>
        {selectedVariant && <ProductGallery images={data.imageUrl} />}
        <div className="d-flex">
          <Button
            variant="outline-warning"
            size="lg"
            className="rounded-pill w-100 me-3 px-2 px-sm-4 fs--1 fs-sm-0"
          >
            <FontAwesomeIcon icon={faArchive} className="me-2" />
            Buy Now
          </Button>
          <Button
            variant="warning"
            size="lg"
            className="rounded-pill w-100 px-2 px-sm-4 fs--1 fs-sm-0"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            Add to cart
          </Button>
        </div>
      </Col>
      <Col xs={12} lg={6}>
        <Stack className="justify-content-between h-100">
          <div className="mb-3">
            {/* Render if data.isDeleted is false and isPublished is true */}
            <div>
              {data.isDeleted === false && data.isPublished === true ? (
                <p className="text-success">Available</p>
              ) : (
                <p className="text-danger">Not Available</p>
              )}
            </div>
            <h3 className="mb-3 lh-sm">{data.title}</h3>
            <div className="d-flex flex-wrap align-items-center">
              <div>
                {/* render data using loop except keys [applicationMapped, createdAt, id, imageUrl, isDeleted, isPublished, lastModifiedAt, productDetailsTemplateId, productSpecData, uniqueId, userCreated, userModified] and also handle if inside value is array */}
                <div>
                  <strong className='text-1000'>Product Details :</strong>
                  <ul>
                    {Object.entries(data)
                      .slice(2)
                      .filter(
                        ([key, value]) =>
                          ![
                            'applicationMapped',
                            'title',
                            'createdAt',
                            'id',
                            'imageUrl',
                            'isDeleted',
                            'isPublished',
                            'lastModifiedAt',
                            'productDetailsTemplateId',
                            'productSpecData',
                            'uniqueId',
                            'userCreated',
                            'userModified'
                          ].includes(key)
                      )
                      .map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong>
                          {Array.isArray(value) ? (
                            <ul>
                              {value.map((item: any) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <span> {value as React.ReactNode}</span>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
                {/* data render data.productSpecData if length of the object not 0 and value is not object*/}
                <strong className='text-1000'>Product Specification :</strong>
                {Object.entries(data.productSpecData).length !== 0 ? (
                  <ul>
                    {Object.entries(data.productSpecData).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong>
                        {typeof value === 'object' && value !== null ? (
                          <ul>
                            {Object.entries(value).map(([subKey, subValue]) => (
                              <li key={subKey}>
                                <strong>{subKey}:</strong> {subValue as React.ReactNode}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span> {value as React.ReactNode}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No specification available</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="row g-3 g-sm-5 align-items-end">
              {/* <div className="col-12 col-sm">
                <p className="fw-semi-bold mb-2 text-900">Quantity : </p>
                <div className="d-flex justify-content-between align-items-end">
                  <QuantityButtons
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                  <Button variant="phoenix-primary" className="px-3 border-0">
                    <FontAwesomeIcon icon={faShareAlt} className="fs-7" />
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
        </Stack>
      </Col>
    </Row>
  );
};

export default ProductDescription;
