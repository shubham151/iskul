import React from 'react';
import { useFormik } from 'formik';
import styles from '../../css/HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Homepage() {


  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      topic: '',
      hours: '',
    },
    onSubmit: async (values) => {
      try {
        const response = {};
        console.log("values", values);
        // const response = await axios.post('', values);
        navigate('/course-plan', { state: { data: response.data } });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  return (
    <div className={styles.Homepage + "text-center my-5"}>
      <header className={styles['Homepage-header']}>
        <h1>Learning Planner</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>
              I want to learn about
              <input
                type="text"
                name="topic"
                onChange={formik.handleChange}
                value={formik.values.topic}
                placeholder="e.g., React, Python, etc."
              />
            </label>
          </div>
          <div>
            <label>
              in
              <input
                type="number"
                name="hours"
                onChange={formik.handleChange}
                value={formik.values.hours}
                placeholder="e.g., 10"
              />
              hrs
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default Homepage;