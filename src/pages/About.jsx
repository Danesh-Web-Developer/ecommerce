import Cards from "../components/card";
import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar";
import '../style/Style.css'

const About = () => {
    return (
        <>
            <Navbar1 />
            <div className="container-fluid pb-4 pt-4" style={{ background: 'linear-gradient(0deg, rgba(10, 10, 10, 0.77) 0%, rgba(9,9,9,1) 50%, rgba(0,0,0,0.742734593837535) 100%)' }}>
                <div className="container aboutsec mt-3 mb-5">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12 h-80" style={{ padding: '70px 20px 0px 30px', backgroundColor: 'rgba(151, 147, 147, 0.7)', border: '2px solid white' }}>
                            <h3 className="mb-4 text-white typing-effect" style={{ fontSize: '50px' }}>Our Story</h3>
                            <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptatem adipisci suscipit possimus, minus corrupti eaque labore quo voluptatum explicabo. Reprehenderit molestiae sequi earum, laudantium excepturi impedit nesciunt sint aliquid vero, voluptatum dolore pariatur nisi ex in corrupti. Aut necessitatibus.</p>
                            <p className="text-white pb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio necessitatibus quidem voluptates! Consequatur excepturi ipsa modi esse dignissimos nostrum. Sunt?</p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 rightside"></div>
                    </div>
                </div>
                <div className="pt-5 pb-3"  style={{ borderTop:'1px solid white'}}>
                    <Cards />
                </div>
            </div>
            <Footer />
        </>
    )
}
export default About;