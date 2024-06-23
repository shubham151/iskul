import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../../css/FlashCard.module.css";

function FlashCard({cardData}) {


  const navigate = useNavigate();

  
    

  return (
    <div className={styles.flashCard}>
    <div>
      <p>
        <text>{cardData.content}</text>
      </p>
    </div>
  </div>
  );
}

export default FlashCard;