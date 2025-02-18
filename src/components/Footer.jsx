
const Footer = () => {
    return (
        <>
            <footer className="text-white pt-4 bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <h5 className="fs-2">Shokk</h5>
                            <p>
                                We provide the best services and solutions to meet your needs. Stay connected with us for more updates. #Shopping in yours life
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white text-decoration-none FLinkStyle">Home</a></li>
                                <li><a href="#" className="text-white text-decoration-none FLinkStyle">About</a></li>
                                <li><a href="#" className="text-white text-decoration-none FLinkStyle">Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <h5>Contact Us</h5>
                            <p>
                                <i className="bi bi-geo-alt"></i> 123 Street, City, Country
                            </p>
                            <p>
                                <i className="bi bi-telephone"></i> +123 456 7890
                            </p>
                            <p>
                                <i className="bi bi-envelope"></i> info@example.com
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <h5>Follow Us</h5>
                            <a href="#" className="text-white text-decoration-none me-3">
                                <i className="bi bi-facebook fs-4"></i>
                            </a>
                            <a href="#" className="text-white text-decoration-none me-3">
                                <i className="bi bi-twitter fs-4"></i>
                            </a>
                            <a href="#" className="text-white text-decoration-none me-3">
                                <i className="bi bi-instagram fs-4"></i>
                            </a>
                            <a href="#" className="text-white text-decoration-none">
                                <i className="bi bi-linkedin fs-4"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center py-3 mt-3" style={{backgroundColor:'#535353'}}>
                    <small>&copy; 2025 Your Company Name. All Rights Reserved.</small>
                </div>
            </footer>
        </>
    );
}
export default Footer;