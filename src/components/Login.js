import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Col, Row, Form, Button, Alert, Spinner, Modal, Container } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const Login = () => {

    const [show, setShow] = useState(false);

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [resetPassword, setResetPassword] = useState('');

    let [err, setErr] = useState('');
    let [msg, setMsg] = useState('');
    let [loader, setLoader] = useState(false);
    let [resetErr, setResetErr] = useState('');

    let navigate = useNavigate('');

    const auth = getAuth();
    const state = useLocation();
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const notify = () => toast(state.state, { theme: 'dark' });

    if (state.state) {
        notify();
        state.state = "";
    }

    let emailChangeEvent = (event) => setEmail(event.target.value);
    let passChangeEvent = (event) => setPassword(event.target.value);
    let handlePasswordResetInput = (event) => setResetPassword(event.target.value);

    let formClickEvent = (event) => {
        event.preventDefault();

        if (!email || !password) setErr('Please fillup all the field!');
        else if (password.length < 8) setErr('Password must be greater then 8 characters!');
        else {
            setLoader(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setMsg('You are now successfully loged in!');
                    setEmail('');
                    setPassword('');
                    setLoader(false);
                    navigate('/', { state: 'Welcome to Home' });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                });
        }
    }

    let handlePasswordResetButton = () => {
        if (resetPassword) {
            setLoader(true);
            sendPasswordResetEmail(auth, resetPassword)
                .then(() => {
                    setResetPassword('');
                    setResetErr('');
                    setLoader(false);
                    setMsg('Successfully send a password reset link!');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode)
                });
        }
        else {
            setResetErr('You did not give an email address!');
        }
    }

    return (
        <>
            <ToastContainer />

            <Container className="p-5 mt-4 mb-5 bg-light">
                <Row>
                    <Col lg={6} className="m-auto">
                        <h1 className="fw-bold fs-1 mb-5 text-center">Login Form</h1>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={emailChangeEvent} value={email} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={passChangeEvent} value={password} type="password" placeholder="Password" />
                            </Form.Group>

                            {msg ? <Alert className="fw-bold" variant="success">{msg}</Alert> : ""}
                            {err ? <Alert className="fw-bold" variant="danger">{err}</Alert> : ""}

                            <Button onClick={formClickEvent} variant="primary" type="submit">
                                Submit
                                {loader ? <Spinner animation="border" size="sm" className="ms-2" /> : ""}
                            </Button>

                            <Button onClick={handleShow} className="ms-3" variant="danger" type="button">
                                Forgot Password?
                            </Button>

                            <Form.Text className="d-block w-100 fw-bold fs-6 mt-5 text-center">
                                Don't have an account?
                                <Link className="ms-1" to="/register">Register</Link>
                            </Form.Text>
                        </Form>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Reset Password Email</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Control onChange={handlePasswordResetInput} value={resetPassword} type="email" placeholder="Enter your email" />
                                        {resetErr ? <Alert className="p-2 mt-3" variant="danger">{resetErr}</Alert> : ""}
                                        {msg ? <Alert className="p-2 mt-3" variant="success">{msg}</Alert> : ""}
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                                <Button variant="primary" onClick={handlePasswordResetButton}>
                                    Reset Password
                                    {loader ? <Spinner animation="border" size="sm" className="ms-2" /> : ""}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login