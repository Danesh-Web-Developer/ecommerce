import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import '../style/Style.css';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config';
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router';

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const Login = () => {
        if (email && password) {
            setLoading(true); 
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    try {
                        const docRef = doc(db, "users", user.uid);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            if (userData.role === "admin") {
                                navigate("/dashboard");
                            } else {
                                navigate("/");
                            }

                        } else {
                            console.log("No such document!");
                        }
                        console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                })
                .finally(() => {
                    setLoading(false); 
                });
        } else {
            alert("All fields are required");
        }
    }

    return (
        <div className='container-fluid d-flex align-items-center vh-100' style={{ background: 'linear-gradient(0deg, rgba(10,10,10,0.9304096638655462) 0%, rgba(9,9,9,1) 50%, rgba(0,0,0,0.742734593837535) 100%)' }}>
            <div className='container'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-lg-6 p-3 pb-4' style={{ backgroundColor: '#9ea6ac', border: '2px solid white' }}>
                        <h2 className='mb-3 text-center text-white'>Login</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='text-white'>Email address</Form.Label>
                                <Form.Control className='border-1 border-dark shadow-none rounded-0' type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='text-white'>Password</Form.Label>
                                <Form.Control className='border-1 border-dark shadow-none rounded-0' type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' />
                            </Form.Group>
                            <div className='text-center mt-4'>
                                <Button className='rounded-0 px-5' onClick={() => Login()} disabled={loading}>
                                    {loading ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                                <Link to='/signup' className='mx-2 text-white'>Create Account</Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
