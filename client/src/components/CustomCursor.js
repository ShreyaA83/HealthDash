import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ReactComponent as DefaultCursor } from '../assets/pizza-svgrepo-com.svg';
import { ReactComponent as InteractionCursor } from '../assets/smoothie-svgrepo-com.svg';
import { ReactComponent as ContextualCursor } from '../assets/candy-cane-candy-svgrepo-com.svg';
import { setCursorType } from '../actions';

const CustomCursor = () => {
  const dispatch = useDispatch();
  const cursorType = useSelector(state => state.cursorType);
  const location = useLocation();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', updateMousePosition);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => {
      dispatch(setCursorType('default'));
    };

    const handleMouseLeave = () => {
      dispatch(setCursorType('default'));
    };

    const handleLinkHover = () => {
      dispatch(setCursorType('interaction'));
    };

    const handleLinkLeave = () => {
      dispatch(setCursorType('default'));
    };

    const handleTextBoxHover = () => {
      dispatch(setCursorType('contextual'));
    };

    const handleTextLeave = () => {
      dispatch(setCursorType('default'));
    };

    const handleMouseDown = () => {
      dispatch(setCursorType('default'));
    };

    const handleMouseUp = () => {
      dispatch(setCursorType('default'));
    };

    const handleLinkClick = () => {
      dispatch(setCursorType('interaction'));
    };

    const addEventListeners = () => {
      document.body.addEventListener('mouseenter', handleMouseEnter);
      document.body.addEventListener('mouseleave', handleMouseLeave);

      document.querySelectorAll('a, link').forEach(link => {
        link.addEventListener('click', handleLinkClick);
        link.addEventListener('mouseenter', handleLinkHover);
        link.addEventListener('mouseleave', handleLinkLeave);
      });

      document.querySelectorAll('input, textarea, text').forEach(input => {
        input.addEventListener('mouseenter', handleTextBoxHover);
        input.addEventListener('mouseleave', handleTextLeave);
      });

      document.body.addEventListener('mousedown', handleMouseDown);
      document.body.addEventListener('mouseup', handleMouseUp);
    };

    const removeEventListeners = () => {
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);

      document.querySelectorAll('a, link').forEach(link => {
        link.removeEventListener('click', handleLinkClick);
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
        
      });

      document.querySelectorAll('input, textarea, text').forEach(input => {
        input.removeEventListener('mouseenter', handleTextBoxHover);
        input.removeEventListener('mouseleave', handleTextLeave);
      });

      document.body.removeEventListener('mousedown', handleMouseDown);
      document.body.removeEventListener('mouseup', handleMouseUp);
    };

    addEventListeners();

    // Re-add event listeners on location change
    return () => {
      removeEventListeners();
    };
  }, [dispatch, location]);

  const renderCursor = () => {
    switch (cursorType) {
      case 'interaction':
        return <InteractionCursor />;
      case 'contextual':
        return <ContextualCursor />;
      default:
        return <DefaultCursor />;
    }
  };

  return (
    <div
      className={`fixed z-50 pointer-events-none inset-0 flex items-center justify-center
        ${cursorType === 'default' ? 'default-cursor' : ''}
        ${cursorType === 'interaction' ? 'interaction-cursor' : ''}
        ${cursorType === 'contextual' ? 'contextual-cursor' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '20px', // Adjust size as needed
        height: '20px', // Adjust size as needed
        transform: `translate(-10%, -10%)`, // Center the cursor on the pointer
      }}
    >
      {renderCursor()}
    </div>
  );
};

export default CustomCursor;
