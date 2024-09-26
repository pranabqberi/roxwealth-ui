// import React from 'react';
import DefaultLandingNavbar from 'components/navbars/default-landing-navbar/DefaultLandingNavbar';
import Footer from 'components/modules/landing/alternate/Footer';

const QberiInSA = () => {
  return (
    <>
      <DefaultLandingNavbar />
      <div className="m-lg-5 mt-5">
        <div className="container flex flex-col">
          <div className="flex flex-wrap justify-center text-center mb-7">
            <h1 className="text-7xl font-semibold">
              Qberi Financial Services in South Africa
            </h1>
          </div>
          <div className="flex flex-wrap">
            <h2 className="text-3xl font-semibold mb-2">
              Welcome to Qberi Financial Services South Africa
            </h2>
            <p className="text-lg text-gray-800 text-justify">
              At Qberi Financial Services, we're dedicated to guiding you toward
              a future of financial security and success. Partnering with
              industry-leading providers including Allan Gray, Momentum, Sanlam,
              Satrix, Liberty Life, Stanlib, and Sygnia, we offer a
              comprehensive range of investment and long-term insurance products
              tailored to your unique needs and goals.
            </p>
            <h3 className="text-2xl font-semibold mb-2">
              Investments Tailored to You.
            </h3>
            <p className="text-lg text-gray-800 text-justify">
              Whether you're saving for retirement, planning for your children's
              education, or looking to grow your wealth, Qberi Financial
              Services provides investment solutions designed to match your
              objectives. From actively managed funds by Allan Gray and Stanlib
              to index-tracking ETFs from Satrix and Sygnia, we offer a diverse
              range of investment options to suit every risk profile and
              investment style.
            </p>
            <h3 className="text-2xl font-semibold mb-2">
              Protect What Matters Most
            </h3>
            <p className="text-lg text-gray-800 text-justify">
              We understand the importance of safeguarding your loved ones and
              assets. That's why we offer a variety of long-term insurance
              solutions from trusted providers like Momentum, Sanlam, and
              Liberty Life. From life cover and disability insurance to income
              protection and funeral plans, Qberi Financial Services has you
              covered, ensuring that you and your family have the financial
              protection you need.
            </p>
            <h3 className="text-2xl font-semibold mb-2">
              Why Choose Qberi Financial Services?
            </h3>
            <ul className="text-lg text-gray-800 text-justify">
              <li className="mb-1">
                <strong>Expert Guidance: </strong>
                <p className="text-lg text-gray-800 text-justify">
                  Our team of experienced financial advisors is committed to
                  providing personalized advice and guidance tailored to your
                  unique financial situation and goals.
                </p>
              </li>
              <li className="mb-1">
                <strong> Extensive Product Range:</strong>
                <p className="text-lg text-gray-800 text-justify">
                  With access to a wide range of investment and insurance
                  products from leading providers, we offer comprehensive
                  solutions to meet your specific needs.
                </p>
              </li>
              <li className="mb-1">
                <strong>Trust and Transparency:</strong>
                <p className="text-lg text-gray-800 text-justify">
                  At Qberi Financial Services, we prioritize trust, integrity,
                  and transparency in all our interactions. You can rely on us
                  to always act in your best interests and provide honest,
                  reliable advice.{' '}
                </p>
              </li>
            </ul>
            <h3 className="text-2xl font-semibold mb-2">
              Start Your Journey to Financial Prosperity Today
            </h3>
            <p className="text-lg text-gray-800 text-justify">
              Take control of your financial future with Qberi Financial
              Services. Contact us today to schedule a consultation and begin
              your journey towards financial prosperity. Let us be your partner
              on the path to a brighter financial future.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QberiInSA;
