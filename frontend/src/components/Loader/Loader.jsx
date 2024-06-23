import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/Loader.module.css'; // Import your CSS module for styling

const Loader = ({ text }) => (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        {text && <p className={styles.text}>{text}</p>}
      </div>
    </div>
  );
  
  Loader.propTypes = {
    text: PropTypes.string, // Optional text to display with the loader
  };

export default Loader;
