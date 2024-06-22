import React from 'react';
import { useFormik } from 'formik';
import styles from '../../css/HomePage.module.css';

function Homepage() {
  const formik = useFormik({
    initialValues: {
      topic: '',
      hours: '',
    },
    onSubmit: (values) => {
        const output = {
            "topic": values.topic,
            "max_duration_in_hours": values.hours
        }
        console.log(output);
      
    },
  });

  return (
    <div className={styles.Homepage}>
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
