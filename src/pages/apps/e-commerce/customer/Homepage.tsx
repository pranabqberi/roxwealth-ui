// import EcomCategoryNavs from 'components/navs/EcomCategoryNavs';
// import { Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
// import EcomWhopingBanner from 'components/banners/EcomWhopingBanner';
// import EcomGiftItemsBanner from 'components/banners/EcomGiftItemsBanner';
// import EcomBestInMarketBanner from 'components/banners/EcomBestInMarketBanner';
// import {
//   bestOfferProducts,
//   // topDealsProducts,
//   topElectronicProducts
// } from 'hospitalmerch/data/products';
// import ecom4 from 'assets/img/e-commerce/4.png';
// import EcomTopDeals from 'components/sliders/EcomTopDeals';
import EcomTopElectronics from 'components/sliders/EcomTopElectronics';
// import EcomBestOffers from 'components/sliders/EcomBestOffers';
// import EcomBecomeMember from 'components/cta/EcomBecomeMember';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'https://engine.qberi.com/api/allEnabledBatteryDetails';
const session = JSON.parse(localStorage.getItem('session') || '{}');
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${session?.sessionToken}`
};

const Homepage = () => {
  const [allEnabledData, setAllEnabledData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(URL, { headers });
      setAllEnabledData(response.data);
      // console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="ecommerce-homepage pt-5 mb-9">
      {/* <section className="py-0">
        <div className="container-small">
          <div className="scrollbar">
            <EcomCategoryNavs />
          </div>
        </div>
      </section> */}
      <section className="py-0 px-xl-3">
        <Container className="px-xl-0 px-xxl-3">
          {/* <Row className="g-3 mb-9">
            <Col xs={12}>
              <EcomWhopingBanner />
            </Col>
            <Col xs={12} xl={6}>
              <EcomGiftItemsBanner />
            </Col>
            <Col xs={12} xl={6}>
              <EcomBestInMarketBanner />
            </Col>
          </Row> */}
          <div className="mb-6">
            <EcomTopElectronics products={allEnabledData} />
          </div>
          {/* <div className="mb-6">
            <EcomBestOffers products={bestOfferProducts} />
          </div> */}
          {/* <EcomBecomeMember /> */}
        </Container>
      </section>
    </div>
  );
};

export default Homepage;
