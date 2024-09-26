import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Product } from 'hospitalmerch/data/products';
import ProductCard from 'components/common/ProductCard';
import Swiper from 'components/base/Swiper';
import { SwiperSlide } from 'swiper/react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export type Product = {
  // id: number;
  // pictureUrl: string;
  // productName: string;
  // rating: number;
  // rated?: number;
  // price?: string;
  // colour?: string;
  // extra?: string;
  // verified?: boolean;
  // wishListed?: boolean;
  // offer?: string;

  id: string;
  productName: string;
  modelNumber: string;
  colour: string;
  cellQuantity: string;
  cellCapacity: string;
  cellType: string;
  cellBrand: string;
  voltage: string;
  compatibleDevice: [];
  otherCompatibleModels: [];
  pictureUrl: ['img'];
  medicalEquipmentName: string;
  weight: string;
  dimensions: string;
  price: string;
  isEnabled: true;
  isDeleted: false;
};

const EcomTopElectronics = ({ products }: { products: Product[] }) => {
  return (
    <>
      <div className="d-flex flex-between-center mb-3">
        <h3>All Batteries</h3>
        <Link to="#!" className="btn btn-link btn-lg p-0 d-none d-md-block">
          Explore more
          <FontAwesomeIcon icon={faChevronRight} className="fs-9 ms-1" />
        </Link>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        navigationPosition={{ top: '25%' }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16
          },
          450: {
            slidesPerView: 2,
            spaceBetween: 16
          },
          576: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          992: {
            slidesPerView: 5,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 16
          }
        }}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default EcomTopElectronics;
