import React from 'react';
import { useFormik } from 'formik';
import styles from '../../css/HomePage.module.css';
import { Button, Form, FormLabel, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <Container>
        <Row className="justify-content-md-center">
          <Col md="6">
            <Form onSubmit={formik.handleSubmit} className={styles['styled-form']}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="topic"
                  onChange={formik.handleChange}
                  value={formik.values.topic}
                  placeholder="Enter something you wanna learn"
                  // className={styles['full-width']}
                />
              </Form.Group>
              <Form.Group className={styles['inline-form-group']}>
                <FormLabel>In</FormLabel>
                <Form.Control
                  type="number"
                  name="hours"
                  onChange={formik.handleChange}
                  value={formik.values.hours}
                  placeholder="5"
                  className={styles['full-width']}
                />
                <FormLabel>hours</FormLabel>
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </header>
  </div>
  );
}

export default Homepage;
