import ProductDescription from 'components/modules/e-commerce/ProductDescription';
// import ProductDetailsTab from 'components/modules/e-commerce/ProductDetailsTab';
// import SimilarProducts from 'components/sliders/SimilarProducts';
import Section from 'components/base/Section';
// import { productsTableData } from 'hospitalmerch/data/products';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import ProductNotFound from './ProductNotFound';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const ProductDetails = () => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const id = useParams<{ id: string }>().id;

  const fetchData = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken');
      const response = await axios.get(
        `https://engine.qberi.com/api/getProductDetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
      );
      if (response.status === 200) {
        setDetails(response.data);
        setLoading(false);
      }
    } catch (error) {
      setError('An error occurred while fetching data.');
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" role="status" />
    </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log('details', details);
  return (
    <>
      {/* {JSON.stringify(details)} */}
      <div className="pt-5 mb-9">
        <Section small className="py-0">
          <ProductDescription data={details} />
        </Section>

        {/* <Section small className="py-0">
          <div className="mb-9">
            <ProductDetailsTab data={details} />
          </div>
        </Section> */}

        {/* <Section className="py-0">
          <SimilarProducts products={topElectronicProducts} />
          <EditProductDetails details={myProduct} />
        </Section> */}
      </div>
    </>
  )
}



export default ProductDetails;
