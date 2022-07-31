import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Alert, Col, Spinner, Container, Row } from "react-bootstrap";
import firebaseConfig from "../Firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

const Registration = () => {

    // Value state
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [cpassword, setCpassword] = useState('');

    const auth = getAuth();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    // Alert state
    let [err, setErr] = useState('');
    let [msg, setMsg] = useState('');
    let [loader, setLoader] = useState(false);

    // Change event 
    let nameChange = (event) => setName(event.target.value);
    let emailChange = (event) => setEmail(event.target.value);
    let passwordChange = (event) => setPassword(event.target.value);
    let cPasswordChange = (event) => setCpassword(event.target.value);

    // Submit event
    let formSubmit = (event) => {
        event.preventDefault();

        // Form validation
        if (!name || !email || !password || !cpassword) {
            setErr('Please fillup the all required field!');
        }
        else if (password.length < 8) {
            setErr('Password must be greater then 8 characters!');
        }
        else if (password !== cpassword) {
            setErr('Your password does not match!');
        }
        else {
            setLoader(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg",
                    }).then(() => {
                        setMsg('Your account created successfully!');
                        setName('');
                        setEmail('');
                        setPassword('');
                        setCpassword('');
                        setErr('');
                        setLoader(false);
                        sendEmailVerification(userCredentials.user);
                        navigate('/login', { state: 'Your account created successfully!' });

                    }).catch((error) => {
                        const errorCode = error.code;
                        if (errorCode.includes('auth/email-already-in-use')) {
                            setErr('This email address already in use!');
                        }
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                });
        }
    }

    const handleGoogleSignIn = (event) => {
        event.preventDefault();

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);
                navigate('/', { state: 'Welcome to Home' });
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(error);
            });
    }

    return (
        <>
            <Container className="p-5 mt-4 mb-5 bg-light">
                <Row>
                    <Col lg={6} className="m-auto">
                        <h1 className="fw-bold fs-1 mb-5 text-center">Register Form</h1>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control onChange={nameChange} type="text" placeholder="Enter your name" value={name} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={emailChange} type="email" placeholder="Enter your email" value={email} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Create Password</Form.Label>
                                <Form.Control onChange={passwordChange} style={err.includes('greater') ? errSign : corSign} type="password" placeholder="Enter your password" value={password} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control onChange={cPasswordChange} style={err.includes('match') ? errSign : corSign} type="password" placeholder="Enter your password" value={cpassword} />
                            </Form.Group>

                            {err ? <Alert className="fw-bold" variant="danger">{err}</Alert> : ""}
                            {msg ? <Alert className="fw-bold" variant="success">{msg}</Alert> : ""}

                            <Button onClick={formSubmit} variant="primary" type="submit">
                                Submit
                                {loader ? <Spinner animation="border" size="sm" className="ms-2" /> : ""}
                            </Button>

                            <Button onClick={handleGoogleSignIn} variant="success" type="submit" className="ms-3">
                                Sign In with Google
                            </Button>

                            <Form.Text className="d-block w-100 fw-bold fs-6 mt-5 text-center">
                                Already have an account?
                                <Link className="ms-1" to="/login">Login</Link>
                            </Form.Text>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


// Error style
let errSign = { border: '1px solid red' }
let corSign = { borderSize: '1px' }

export default Registration
