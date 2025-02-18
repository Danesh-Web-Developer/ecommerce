import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { doc, setDoc } from "firebase/firestore";
import '../style/Style.css'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config';
import { useNavigate } from 'react-router';

const Signup = () => {
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate('')

    const Signup = () => {
        if (fname && lname && email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    try {
                        await setDoc(doc(db, "users", user.uid), {
                            firstname: fname,
                            lastname: lname,
                            email: email,
                            password: password,
                            role: 'user'
                        });
                        navigate('/login')
                        setfname('')
                        setlname('')
                        setemail('')
                        setpassword('')
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        } else {
            alert('All field or requried')
        }
    }
    return (
        <div className='container-fluid d-flex align-items-center vh-100 ' style={{ background: 'linear-gradient(0deg, rgba(10,10,10,0.9304096638655462) 0%, rgba(9,9,9,1) 50%, rgba(0,0,0,0.742734593837535) 100%)' }}>
            <div className='container'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-lg-6 p-3 pb-4' style={{backgroundColor:'#00000000',border:'2px solid white'}}>
                        <h2 className='mb-3 text-center text-white'>SignUp</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='text-white'>First name</Form.Label>
                                <Form.Control className='border-1 border-dark shadow-none rounded-0' type="text" value={fname} onChange={(e) => setfname(e.target.value)} placeholder='First Name' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='text-white'>Last name</Form.Label>
                                <Form.Control className='border-1 border-dark shadow-none rounded-0' type="text" value={lname} onChange={(e) => setlname(e.target.value)} placeholder='Last Name' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='text-white'>Email address</Form.Label>
                                <Form.Control className='border-1 border-dark shadow-none rounded-0' type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='text-white'>Password</Form.Label>
                                <Form.Control className='border-1 border-dark shadow-none rounded-0' type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' />
                            </Form.Group>
                            <div className='text-center mt-4'><Button className='px-4 rounded-0' onClick={() => Signup()}>Signup</Button></div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup;