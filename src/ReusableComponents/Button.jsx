
import React from 'react';

const Button = ({ children, onClick, extraClass }) => {
  return (
    <button
      onClick={onClick}
      className={`px-10 py-2 bg-[#e5e7eb] cursor-pointer text-black font-semibold rounded-md hover:bg-primary-hover transition whitespace-nowrap ${extraClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
