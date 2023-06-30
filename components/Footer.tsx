import React from 'react';

const Footer = () => {
  return (
    <div className='flex w-full items-center justify-center montserrat m-0 p-0'>
      <span> Copyright © {new Date().getFullYear()} Simple Login </span>
    </div>
  );
};

export default Footer;