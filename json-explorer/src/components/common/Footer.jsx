import React from 'react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer style={{
      marginTop: '40px',
      padding: '20px',
      borderTop: `1px solid ${isDarkMode ? '#444' : '#eee'}`,
      textAlign: 'center',
      fontSize: '0.9rem',
      color: isDarkMode ? '#aaa' : '#666'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <a 
          href="/legal/imprint.html" 
          style={{
            color: isDarkMode ? '#aaa' : '#666',
            marginRight: '20px',
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline',
              color: isDarkMode ? '#fff' : '#333'
            }
          }}
        >
          Imprint
        </a>
        <a 
          href="/legal/privacy.html" 
          style={{
            color: isDarkMode ? '#aaa' : '#666',
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline',
              color: isDarkMode ? '#fff' : '#333'
            }
          }}
        >
          Privacy Policy
        </a>
      </div>
      <div>
        &copy; {new Date().getFullYear()} AdTech Toolbox
      </div>
    </footer>
  );
};

export default Footer; 