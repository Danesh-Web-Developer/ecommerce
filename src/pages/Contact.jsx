import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar";
import '../style/Style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Contact = () => {
    return (
        <>
            <Navbar1 />
            <div className="container-fluid" style={{ background: 'linear-gradient(0deg, rgba(10, 10, 10, 0.76) 0%, rgba(20, 20, 20, 0.74) 50%, rgba(0, 0, 0, 0.68) 100%)' }}>
                <div className="container pt-2 pb-5">
                    <div className="row p-4 d-flex justify-content-evenly">
                        <div className="col-lg-4 col-12 p-4 contactleftbox" style={{backgroundColor:'rgb(131, 127, 127)',border:'2px solid white'}}>
                            <div className='pb-3 border-bottom-1 border-bottom-black'>
                                <h6 className='pb-4 text-white'><i className="bi bi-telephone fs-3 me-2 text-white"></i>  Call To Us</h6>
                                <p className="text-white">We are available 24/7,7 days a week.</p>
                                <p className="text-white">Phone:+923885999564</p>
                            </div>
                            <div className='pt-2'>
                                <h6 className="text-white"><i className="bi bi-envelope fs-3 me-2 text-white"></i> Write To Us</h6>
                                <p className="text-white">Fil out our form and we will contact you within 24 hours.</p>
                                <p className="text-white">Email:info@gmail.com</p>
                                <p className="text-white">Email:info@gmail.com</p>
                            </div>
                        </div>

                        <div className="col-lg-7 col-12 p-4" style={{backgroundColor:'rgb(128, 125, 125)',border:'2px solid white'}}>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" placeholder='Your Name' className='shadow-none rounded-0 contactinput' />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="email" placeholder='Your Email' className='shadow-none rounded-0 contactinput' />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="password" placeholder='Your Phone' className='shadow-none rounded-0 contactinput' />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={5} placeholder='Your Message' className='shadow-none rounded-0 contactinput' />
                                </Form.Group>
                                <div className='text-center'>
                                    <Button className='p-2 w-100 rounded-0'>Send Message</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Contact;