import React from "react";
import { useFormik } from "formik";
import styles from "../../css/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Homepage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      topic: "",
      hours: "",
      level: "",
    },
    onSubmit: async (values) => {
      try {
        const response = {};
        console.log("values", values);
        // const response = await axios.post('', values);
        navigate("/course-plan", { state: { data: response.data } });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <div className={styles.Homepage + "text-center my-1"}>
      <header>
        <h1 className={styles["Homepage-header"]}>Iskul</h1>

        <form onSubmit={formik.handleSubmit} className="text-center">
          <div className="form-group mt-01">
            <div className="d-flex justify-content-center align-items-center mb-5">
              <input
                type="text"
                name="topic"
                onChange={formik.handleChange}
                value={formik.values.topic}
                placeholder="Enter something you want to learn"
                className="form-control bg-dark text-white me-2"
                style={{ flex: '0 0 80%' }} // 70% width
              />
              <span className="text-white mx-2">in</span>
              <input
                type="number"
                name="hours"
                onChange={formik.handleChange}
                value={formik.values.hours}
                placeholder="e.g. 10"
                className="form-control bg-dark text-white ms-2"
                style={{ flex: '0 0 20%' }}
              />
              <span className="text-white ms-2">hrs</span>
            </div>
            <div className="mb-5">
              <div className="d-flex justify-content-center">
                <div className="form-check me-4">
                  <input
                    type="radio"
                    name="level"
                    id="beginner"
                    value="beginner"
                    onChange={formik.handleChange}
                    checked={formik.values.level === "beginner"}
                    className="form-check-input custom-radio"
                  />
                  <span className="text-white ms-2">Beginner</span>
                  
                </div>
                <div className="form-check me-4">
                  <input
                    type="radio"
                    name="level"
                    id="intermediate"
                    value="intermediate"
                    onChange={formik.handleChange}
                    checked={formik.values.level === "intermediate"}
                    className="form-check-input custom-radio"
                  />
                  <span className="text-white ms-2">Intermediate</span>
                  
                </div>
                <div className="form-check me-4">
                  <input
                    type="radio"
                    name="level"
                    id="expert"
                    value="expert"
                    onChange={formik.handleChange}
                    checked={formik.values.level === "expert"}
                    className="form-check-input custom-radio"
                  />
                  <span className="text-white ms-2">Expert</span>
                  
                </div>
              </div>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary bg-dark text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Homepage;
