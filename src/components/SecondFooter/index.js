// Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SecondFooter = () => {
  let nav = useNavigate();
  const userAuth = useSelector((state) => state.AuthReducer.userData);

  let contactpage = () => {
    if (userAuth == null) {
      const userType = "User"; // or any other value
      nav("/login", {
        state: userType,
      });
    } else {
      nav("/contact");
    }
  };

  return (
    <footer className="footer">
      <div className="container mx-auto flex flex-col maindiv">
        <h2 className="footer-heading">Stay Connected</h2>
        <div className="footer-social-links">
          <span className="footer-social-text">Follow us on:</span>
          <a href="https://twitter.com/" className="footer-social-link">Twitter</a>
          <a href="https://www.facebook.com/" className="footer-social-link">Facebook</a>
          <a href="https://www.instagram.com/" className="footer-social-link">Instagram</a>
        </div>
        <h4 className="footer-social-link" style={{cursor: 'pointer'}} onClick={contactpage}>Contact Us </h4>
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default SecondFooter;
