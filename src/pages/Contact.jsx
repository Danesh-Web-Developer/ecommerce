import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar";
import '../style/Style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Contact = () => {
    return (
        <>
            <Navbar1 />
            <div className="container-fluid" style={{ background: 'linear-gradient(0deg, rgba(10,10,10,0.9304096638655462) 0%, rgba(9,9,9,1) 50%, rgba(0,0,0,0.742734593837535) 100%)' }}>
                <div className="container pt-5 pb-5">
                    <div className="row p-4 d-flex justify-content-evenly">
                        <div className="col-lg-4 col-12 p-4" style={{backgroundColor:'#00000000',border:'2px solid white'}}>
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

                        <div className="col-lg-7 col-12 p-4" style={{backgroundColor:'#00000000',border:'2px solid white'}}>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="email" placeholder='Your Name' className='border-1 border-black shadow-none rounded-0' />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="password" placeholder='Your Email' className='border-1 border-black shadow-none rounded-0' />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="password" placeholder='Your Phone' className='border-1 border-black shadow-none rounded-0' />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={5} placeholder='Your Message' className='border-1 border-black shadow-none rounded-0' />
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