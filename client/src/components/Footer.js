import React, {useState} from 'react';
import './Footer.css';
import ScrollUpIcon from '../assets/arrow.png';
import Popup from 'reactjs-popup';

const PopupExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  
  return( 
    <Popup
      trigger={<button className="popup-button backdrop-blur-sm rounded-full hover:bg-blue-600 text-white font-bold px-2 py-2"> i</button>}
      position="top center"
      open={isOpen}
      onClose={closePopup}
      closeOnDocumentClick
      closeOnEscape
    >
      <div className='backdrop-blur-xl p-4 rounded-lg bg-white text-black'>
        The Nutritional Values are on the basis of per 100 grams or per serving.
      </div>
    </Popup>
  );
};

// const PopupExample = () => (
//   <Popup 
//     trigger={<button className="popup-button backdrop-blur-sm rounded-full hover:bg-blue-600 text-white font-bold px-2 py-2"> Info</button>} 
//     position="center center"
//   >
//     <div className='backdrop-blur-xl bg-black text-white p-5'>
//       The Nutritional Values are on the basis of per 100 grams or per serving.
//     </div>
//   </Popup>
// );

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-4 backdrop-blur-xl bg-gray/80 shadow-lg rounded-full px-6 py-3">
      <button
        className="backdrop-blur-sm rounded-full hover:bg-blue-600 text-white font-bold px-2 py-2"
        onClick={scrollToTop}
      >
        <img src={ScrollUpIcon} alt="Scroll Up" className="w-6 h-6" />
      </button>
      <PopupExample />
    </footer>
  );
};

export default Footer;
