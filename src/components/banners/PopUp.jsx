// import React from 'react';
// import { useState } from 'react';
// import { useEffect } from 'react';

// // This component will appear on the top right corner of the screen , it will be used to display messages to the user for the time of 5 secondds

// const PopUp = ({ show, message, description }) => {
//   const [showPopUp, setShowPopUp] = useState(show);
//   const [messagePopUp, setMessagePopUp] = useState(message);
//   const [descriptionPopUp, setDescriptionPopUp] = useState(description);

//   useEffect(() => {
//     setShowPopUp(show);
//     setMessagePopUp(message);
//     setDescriptionPopUp(description);
//   }, [show, message, description]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowPopUp(false);
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, [showPopUp]);

//   if (!showPopUp) {
//     return null;
//   }

//   return (
//     <div className="">
//       <div className="pop-up__message">
//         <h3>{messagePopUp}</h3>
//         <p>{descriptionPopUp}</p>
//       </div>
//     </div>
//   );
// };

// const showPopUp = (message, description) => {
//   return <PopUp show={true} message={message} description={description} />;
// };

// export default showPopUp;
// export { PopUp };
