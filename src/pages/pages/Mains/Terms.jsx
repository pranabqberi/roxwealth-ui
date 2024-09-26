import DefaultLandingNavbar from 'components/navbars/default-landing-navbar/DefaultLandingNavbar';
import Footer from 'components/modules/landing/alternate/Footer';
// import './App.css'; // Import your custom styles
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="terms-container">
      <DefaultLandingNavbar />
      <div className="m-lg-5 mt-5">
        <div className="container flex flex-col">
          <div className="flex flex-wrap justify-center text-center mb-7">
            <h1 className="title">Terms and Conditions</h1>
          </div>

          <div className="flex flex-wrap">
            <h2>Terms of Service</h2>
            <p className="terms-effective-date">Effective Date: Jan 25, 2024</p>

            {/* Each section is now wrapped in a div for better structure */}
            <div className="terms-section">
              <h4 className="terms-subheading">1. Acceptance of Terms</h4>
              <p className="terms-content">
                Welcome to Qberi. By accessing or using our website and
                services, including any subsidiaries, joint ventures,
                investments, or operations interests (collectively referred to
                as "Services"), you agree to comply with and be bound by these
                Terms of Service ("Terms"). If you do not agree to these Terms,
                please do not use our Services.
              </p>
            </div>

            <div className="terms-section">
              <h4 className="terms-subheading">2. Scope of Services</h4>
              <p className="terms-content">
                Qberi operates as a multinational organization with offices in
                the United States, India, South Africa, Germany, and the United
                Kingdom. Our Services encompass various international
                activities, including but not limited to investments,
                operations, and joint ventures. These activities may be subject
                to specific agreements and regulations governing each respective
                jurisdiction.
              </p>
            </div>

            <div className="terms-section">
              <h4 className="terms-subheading">3. Privacy Policy</h4>
              <p className="terms-content">
                Your use of our Services is also governed by our Privacy Policy,
                which can be found
                {/* <a href="/privacy-policy" ><strong>here</strong></a> */}
                <Link to="/privacy-policy">
                  <strong> here</strong>
                </Link>
                . Please review our Privacy Policy to understand how we collect,
                use, and protect your personal information.
              </p>
            </div>

            {/* 4. User Accounts and Registration */}
            <div className="terms-section">
              <h4 className="terms-subheading">
                4. User Accounts and Registration
              </h4>
              <p className="terms-content">
                To access certain parts of our Services, you may be required to
                create a user account. You are responsible for maintaining the
                confidentiality of your account credentials and for all
                activities that occur under your account. You agree to provide
                accurate and complete information during the registration
                process.
              </p>
            </div>

            {/* 5.  */}
            <div className="terms-section">
              <h4 className="terms-subheading">5. Use of Services</h4>
              <p className="terms-content">
                You agree to use our Services in compliance with all applicable
                laws and regulations. You shall not engage in any prohibited
                activities, including but not limited to:
              </p>
              <ul className="terms-list text-2xl">
                <li className="terms-list-item">
                  a. Violating the rights of others or infringing on
                  intellectual property rights.
                </li>
                <li className="terms-list-item">
                  b. Transmitting any harmful, offensive, or unlawful content.
                </li>
                <li className="terms-list-item">
                  c. Interfering with the functionality of our Services.
                </li>
                <li className="terms-list-item">
                  d. Unauthorized access to our systems or data.
                </li>
                <li className="terms-list-item">
                  e. Engaging in fraudulent activities.
                </li>
              </ul>
            </div>

            {/* 6.  */}
            <div className="terms-section">
              <h4 className="terms-subheading">
                6. Disclaimers and Limitations
              </h4>
              <p className="terms-content">
                Our Services are provided "as-is," and we make no
                representations or warranties of any kind, whether express or
                implied. We shall not be liable for any direct, indirect,
                consequential, or incidental damages arising from your use of
                our Services.
              </p>
            </div>

            {/* 7.  */}
            <div className="terms-section">
              <h4 className="terms-subheading">
                7. Jurisdiction and Governing Law
              </h4>
              <p className="terms-content">
                These Terms are governed by and construed in accordance with the
                laws of the State of Colorado, United States. Any disputes
                arising under or in connection with these Terms shall be subject
                to the exclusive jurisdiction of the federal and state courts
                located in Colorado.
              </p>
            </div>

            {/* 8.  */}
            <div className="terms-section">
              <h4 className="terms-subheading">8. Changes to Terms</h4>
              <p className="terms-content">
                We reserve the right to modify or update these Terms at any
                time. Any changes will be effective immediately upon posting the
                revised Terms on our website. Your continued use of our Services
                after such changes signifies your acceptance of the modified
                Terms.
              </p>
            </div>

            <div className="terms-section">
              <h4 className="terms-subheading">9. Contact Information</h4>
              <p className="terms-content">
                If you have any questions or concerns regarding these Terms or
                our Services, please contact us at{' '}
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

export default Terms;
