// import React from 'react';
import DefaultLandingNavbar from 'components/navbars/default-landing-navbar/DefaultLandingNavbar';
import Footer from 'components/modules/landing/alternate/Footer';

const BusinessUnits = () => {
  return (
    <>
      <DefaultLandingNavbar />
      <div className="m-lg-5 mt-5">
        <div className="container flex flex-col">
          <div className="flex flex-wrap justify-center text-center mb-7">
            <h1 className="text-7xl font-semibold">Business Units</h1>
          </div>
          <div className="flex flex-wrap">
            <h2 className="text-3xl font-semibold mb-4">
              Introduction to Qberi's Business Divisions
            </h2>
            <p className="text-lg text-gray-800 text-justify">
              Within the dynamic tapestry of Qberi's operations, our commitment
              to "quietly building excellence, resilience, and ingenuity"
              resonates throughout each of our business divisions. As a
              multinational organization headquartered in Boulder, Colorado, and
              with a global presence, we have strategically forged these
              divisions to not only meet the diverse demands of the modern
              business landscape but also to uphold our unwavering dedication to
              excellence.
            </p>
            <p className="text-lg text-gray-800 text-justify">
              In this section, we invite you to embark on a journey through the
              intricate web of Qberi's business units, each representing a
              unique facet of our multifaceted enterprise. These divisions,
              guided by our motto, serve as the silent architects of our
              success, continually shaping the landscape of venture capital, KPI
              dashboard development, market expansion, financial management, and
              pioneering solutions for industries as varied as hospitality,
              construction, and media.
            </p>
            <p className="text-lg text-gray-800 text-justify">
              Join us as we explore the strategic insights, collaborative
              endeavors, and resource allocations that drive the success of each
              division, all while remaining true to our motto. Here, excellence
              is not merely achieved but quietly built, resilience is not loudly
              proclaimed but steadfastly practiced, and ingenuity is not loudly
              trumpeted but consistently pursued.
            </p>
            <p className="text-lg text-gray-800 text-justify">
              Uncover the world of Qberi's business divisions, where our
              commitment to quietly building excellence, resilience, and
              ingenuity underpins our dedication to delivering tailored
              expertise that meets the unique demands of diverse markets and
              industries. As we navigate this dynamic terrain, our motto remains
              at the heart of our pursuit, a testament to our unwavering
              commitment to global growth and
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BusinessUnits;
