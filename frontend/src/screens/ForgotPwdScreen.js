import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import Message from "../components/Message";

const ForgotPwdScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      setTimeout(() => {
        setError("");
      }, 4000);
    } else {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "http://127.0.0.1:5000/api/v1/web/user/reset_pw",
          { email }
        );
        setLoading(false);
        setSuccess(data.res);
      } catch (error) {
        setLoading(false);
        setError("This Email doesn't have an Account!. Please Register");
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>{success}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Forgot Password
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          <Link to='/login'>Login</Link>
        </Col>
        <Col>
          <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ForgotPwdScreen;
