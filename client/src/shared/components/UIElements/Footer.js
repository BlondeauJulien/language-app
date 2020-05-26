import React from 'react';

import Button from '../FormElements/Button';

import './Footer.css';

const Footer = () => {
  let buttonsText = ["About", "Contact", "Terms", "Privacy", "Learn", "Facebook", "Twitter"];

  return (
    <footer>
      {
        buttonsText.map((txt, i) => (
          <Button key={`footer-btn-${i}`} to="dummy" design={"plain-text"}>{txt}</Button>
        ))
      }
    </footer>
  )
}

export default Footer
