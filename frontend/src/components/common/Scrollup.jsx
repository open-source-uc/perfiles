/* eslint no-warning-comments: 0 */
import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

export default function Scrollup() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', //  OR 'auto'
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      // className={visible ? 'btn-scrollup' : 'btn-scrollup-visible'}
      id="btn_scrollup"
      className={`fixed right-5 bottom-5 z-50 pointer px-5 py-4 bg-osuc-navyblue border-1 border-solid border-transparent rounded-full delay-150 duration-300 ease-in-out hover:-translate-y-3 hover:bg-osuc-navyblue/90 ${visible ? 'block' : 'hidden'}`}
    >
      <i className="fa-solid fa-chevron-up" />
    </button>
  );
}
