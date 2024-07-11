import React from 'react';
import './Footer.css';
import ScrollUpIcon from '../assets/arrow.png';
import {
  makeStyles,
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  contentHeader: {
    marginTop: "0",
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div className='backdrop-blur-xl'>
      <h3 className={styles.contentHeader}>About</h3>
      <div>This is some popover content</div>
    </div>
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer pt-10">
      <div className="container mx-auto px-1 py-1 items-center justify-right space-x-4">
        <button
          className="backdrop-blur-sm rounded-full hover:bg-blue-600 text-white font-bold px-1 py-1"
          onClick={scrollToTop}
        >
          <img src={ScrollUpIcon} alt="Scroll Up" className="w-4 h-4" />
        </button>
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <Button className="backdrop-blur-sm rounded-full hover:bg-blue-600 text-white font-bold px-1 py-1">
              <text className='text-black'>i</text>
            </Button>
          </PopoverTrigger>
          <PopoverSurface tabIndex={-1}>
            <ExampleContent />
          </PopoverSurface>
        </Popover>
      </div>
    </footer>
  );
};

export default Footer;
