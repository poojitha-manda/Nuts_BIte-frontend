import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import Message from "../components/Message";

const ResetPwdScreen = () => {
  const { user_id, token } = useParams();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!password && !confirmPassword) {
      setError("Fill the Required(*) Fields");
      setTimeout(() => {
        setError("");
      }, 4000);
    } else if (password != confirmPassword) {
      setError("Password doesn't Match");
      setTimeout(() => {
        setError("");
      }, 4000);
    } else {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `http://127.0.0.1:5000/api/v1/web/user/receive_new_password/${user_id}/${token}`,
          { password }
        );
        setLoading(false);
        setSuccess("Password reset Successful! Please Login");
      } catch (error) {
        setLoading(false);
        setError("Link Expired! Please Try Again.");
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {success ? (
        <Message variant='success'>{success}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='password'>
            <Form.Label>New Password*</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm New Password*</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Reset Password
          </Button>
        </Form>
      )}
      <Row className='py-3'>
        <Col>
          <Link to='/login'>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ResetPwdScreen;
