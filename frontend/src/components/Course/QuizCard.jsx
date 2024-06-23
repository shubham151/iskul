import React from 'react';
import { useFormik } from "formik";

import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../../css/QuizCard.module.css";

function QuizCard({QuizData}) {

//create a list to store all the answers selected by the user

  const navigate = useNavigate();

  return (
    <div>
    <div className={styles.quizCard}>
      <p>
        <text>Question:</text>
        <text></text>
      </p>
      <div className={styles.optionDiv}>
        <div>
            <input
                type="radio"
                name="option1"
                value="option1"
                text="Option 1"
            /><label>Option 1</label>
        </div>
        <div>
            <input
            type="radio"
            name="option2"
            value="option2"
            />
        </div>
        <div>
            <input
            type="radio"
            name="option3"
            value="option3"
            />
        </div>
        <div>
            <input
            type="radio"
            name="option4"
            value="option4"
            />
        </div>
       
      </div>
    </div>
  </div>
  );
}

export default QuizCard;