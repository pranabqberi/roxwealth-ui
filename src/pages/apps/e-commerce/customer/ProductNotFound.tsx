import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductNotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        className="fs-3 mb-3 text-warning"
      />
      <h3 className="mb-3">Product not found</h3>
      <Link to="/hospitalmerch/products" className="btn btn-primary">
        Back to products
      </Link>
    </div>
  );
};

export default ProductNotFound;
