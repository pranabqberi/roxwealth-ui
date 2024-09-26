import DefaultLandingNavbar from 'components/navbars/default-landing-navbar/DefaultLandingNavbar';
import Footer from 'components/modules/landing/alternate/Footer';
// import './App.css'; // Import your custom styles

const PrivacyPolicy = () => {
  return (
    <div>
      <DefaultLandingNavbar />
      <div className="m-lg-5 mt-5">
        <div className="container flex flex-col">
          <div className="flex flex-wrap justify-center text-center mb-7">
            <h1 className="text-7xl font-semibold">Privacy Policy</h1>
          </div>

          <div className="flex flex-wrap">
            <h2 className="text-3xl font-semibold">Privacy Policy for Qberi</h2>
            <p className="terms-effective-date">Effective Date: Jan 25, 2024</p>

            <div>
              <h4 className="terms-subheading">1. Introduction</h4>
              <p className="text-lg text-gray-800 text-justify">
                Welcome to Qberi ("we," "our," or "us"). This Privacy Policy
                explains how we collect, use, disclose, and protect your
                personal information when you access or use our website and
                services, including our subsidiaries, joint ventures,
                investments, and operations interests (collectively referred to
                as "Services"). By using our Services, you consent to the
                practices described in this Privacy Policy.
              </p>
            </div>

            <div className="terms-section">
              <h4 className="terms-subheading">2. Information We Collect</h4>
              <p className="text-lg text-gray-800 text-justify">
                We may collect various types of information from you, including:
              </p>
              <ul className="terms-list">
                <li className="terms-list-item">
                  a. <strong>Personal Information:</strong> Such as your name,
                  contact information, and other identifiers.
                </li>
                <li className="terms-list-item">
                  b. <strong>Usage Information: </strong>Such as your IP
                  address, browser type, device information, and browsing
                  activity.
                </li>
                <li className="terms-list-item">
                  c. <strong> Information: </strong>When you use our Services,
                  we may collect and process information about your approximate
                  location.
                </li>
                <li className="terms-list-item">
                  d. <strong>Cookies and Tracking Technologies: </strong> We use
                  cookies and similar technologies to collect data about your
                  interactions with our Services.
                </li>
                <li className="terms-list-item">
                  e. <strong>Other Information: </strong>Any other information
                  you provide to us voluntarily.
                </li>
              </ul>
            </div>

            <div className="terms-section">
              <h4 className="terms-subheading">
                3. How We Use Your Information
              </h4>
              <p className="text-lg text-gray-800 text-justify">
                We may use your information for various purposes, including:
              </p>
              <ul className="terms-list">
                <li className="terms-list-item">
                  a. To provide and improve our Services.
                </li>
                <li className="terms-list-item">
                  b. To communicate with you and respond to your inquiries.
                </li>
                <li className="terms-list-item">
                  c. To customize and personalize your experience.
                </li>
                <li className="terms-list-item">
                  d. To analyze usage patterns and trends.
                </li>
                <li className="terms-list-item">
                  e. To comply with legal obligations.
                </li>
                <li className="terms-list-item">
                  f. For other legitimate business purposes.
                </li>
              </ul>
            </div>

            <div className="terms-section">
              <h4 className="terms-subheading">
                4. Disclosure of Your Information
              </h4>
              <p className="text-lg text-gray-800 text-justify">
                We may share your information with:
              </p>
              <ul className="terms-list">
                <li className="terms-list-item">
                  a. Affiliated companies, subsidiaries, and joint ventures.
                </li>
                <li className="terms-list-item">
                  b. Service providers and partners who assist us in providing
                  and improving our Services.
                </li>
                <li className="terms-list-item">
                  c. Legal authorities, as required by law or to protect our
                  rights.
                </li>
              </ul>
            </div>

            <div className="terms-section">
              <h4 className="terms-subheading">5. Data Security</h4>
              <p className="text-lg text-gray-800 text-justify">
                We implement security measures to protect your personal
                information from unauthorized access, disclosure, alteration, or
                destruction. However, please be aware that no data transmission
                over the internet or security system is entirely foolproof.
              </p>
            </div>

            <div className="terms-section">
              <h4 className="terms-subheading">6. Your Choices</h4>
              <p className="text-lg text-gray-800 text-justify">
                You have the right to:
              </p>
              <ul className="terms-list">
                <li className="terms-list-item">
                  a. Access, correct, or delete your personal information.
                </li>
                <li className="terms-list-item">
                  b. Object to or restrict the processing of your data.
                </li>
                <li className="terms-list-item">
                  c. Withdraw your consent for data processing, where
                  applicable.
                </li>
              </ul>
            </div>

            <div className="terms-section">
              <h4 className="terms-subheading">
                7. International Data Transfers
              </h4>
              <p className="text-lg text-gray-800 text-justify">
                As a multinational organization, your personal information may
                be transferred to and processed in countries outside of your
                home country. We take steps to ensure that such transfers comply
                with applicable data protection laws.
              </p>
            </div>

            <div className="terms-section">
              <h4 className="terms-subheading">
                8. Changes to this Privacy Policy
              </h4>
              <p className="text-lg text-gray-800 text-justify">
                We may update this Privacy Policy to reflect changes in our
                practices or for other operational, legal, or regulatory
                reasons. Any changes will be posted on our website with an
                updated effective date.
              </p>
            </div>

            <div className="terms-section">
              <h4 className="terms-subheading">9. Contact Us</h4>
              <p className="text-lg text-gray-800 text-justify">
                If you have questions or concerns about this Privacy Policy or
                our data practices, please contact us at{' '}
                <a href="mailto:compliance@qberi.com">compliance@qberi.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
