/* eslint no-warning-comments: 0 */
import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

export default function Scrollup() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset < 110) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      <button className={isVisible ? 'btn-scrollup-visible' : 'btn-scrollup'} type="button" id="btn_scrollup" onClick={scrollToTop}>
        <i className="fa-solid fa-chevron-up" />
      </button>
    </div>
  );
}
