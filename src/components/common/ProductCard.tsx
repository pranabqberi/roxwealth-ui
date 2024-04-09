// import { faClock, faHeart } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
// import Badge from 'components/base/Badge';
// import Button from 'components/base/Button';
// import Rating from 'components/base/Rating';
import { Product as ProductType } from 'components/sliders/EcomTopElectronics';
// import { currencyFormat } from 'helpers/utils';
// import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="position-relative text-decoration-none product-card h-100">
      <div className="d-flex flex-column justify-content-between h-100">
        <div>
          <div className="border border-1 rounded-3 position-relative mb-3">
            {/* <Button
              variant={product.wishListed ? 'primary' : 'outline-primary'}
              className="rounded-circle p-0 d-flex flex-center btn-wish z-index-2 d-toggle-container"
            >
              {product.wishListed ? (
                <FontAwesomeIcon icon={faHeart} />
              ) : (
                <>
                  <FontAwesomeIcon icon={faHeart} className="d-block-hover" />
                  <FontAwesomeIcon icon={farHeart} className="d-none-hover" />
                </>
              )}
            </Button> */}
            <img
              src={product.pictureUrl[0] || 'https://via.placeholder.com/300'}
              alt="Image Not Available!"
              className="img-fluid"
            />
            {/* {product.verified && (
              <Badge bg="success" className="fs-10 product-verified-badge">
                Verified
                <FontAwesomeIcon icon={faClock} className="ms-1" />
              </Badge>
            )} */}
          </div>
          <Link to="#!" className="stretched-link text-decoration-none">
            <h6 className="mb-2 lh-sm line-clamp-3 product-name">
              {product.productName}
            </h6>
          </Link>
          {/* {product.rating && (
            <p className="fs-9">
              <Rating readonly initialValue={product.rating} />
              {product.rated && (
                <span className="text-500 fw-semi-bold ms-1">
                  ({product.rated} people rated)
                </span>
              )}
            </p>
          )} */}
        </div>
        <div className="mt-5">
          {product.medicalEquipmentName && (
            <p className="text-900 fw-bold fs-8 lh-1">
              {product.medicalEquipmentName}
            </p>
          )}
          {product.cellQuantity && (
            <p className="text-700 fw-semi-bold fs-9 lh-1">
              Cell Quantity: {product.cellQuantity}
            </p>
          )}
          {product.cellCapacity && (
            <p className="text-700 fw-semi-bold fs-9 lh-1">
              Capacity: {product.cellCapacity}
            </p>
          )}

          {/* {product.salePrice && (
            <>
              {product.price ? (
                <div className="d-flex align-items-center mb-1">
                  <p className="me-2 text-900 text-decoration-line-through mb-0">
                    {currencyFormat(product.price)}
                  </p>
                  <h3 className="text-1100 mb-0">
                    {currencyFormat(product.salePrice)}
                  </h3>
                </div>
              ) : (
                <h3 className="text-1100">
                  {currencyFormat(product.salePrice)}
                </h3>
              )}
            </>
          )} */}

          {product.colour && (
            <p
              className={classNames('text-700 fw-semi-bold fs-9 lh-1', {
                // 'mb-0': !product.dealEndTime
              })}
            >
              {product.colour} color
            </p>
          )}
          <div className="d-flex align-items-center mb-1">
            <h3 className="text-1100 mb-0">{product.price}</h3>
          </div>
          {/* {product.dealEndTime && (
            <p className="text-success fw-bold fs-9 lh-1 mb-0">
              Deal time ends in {product.dealEndTime}
            </p>
          )} */}

          {/* {product.offer && (
            <h6 className="text-success lh-1 mb-0">{product.offer} off</h6>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
