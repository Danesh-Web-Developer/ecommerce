import { useContext } from "react";
import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar";
import MyContext from "../Context/Mycontext";
import { useParams } from "react-router";
const Productdetails = () => {
    const { product } = useContext(MyContext);
    const { id } = useParams();
    const data = product.find((item) => item.productid === id);
    return (
        <>
            <Navbar1 />
            <div className="container-fluid" style={{ background: 'linear-gradient(0deg, rgba(10,10,10,0.9304096638655462) 0%, rgba(9,9,9,1) 50%, rgba(0,0,0,0.742734593837535) 100%)' }}>
                <div className="container pt-5 pb-5">
                    <div className="row" >
                        <div className="col-lg-6 col-12 text-white">
                            <img src={data.image} alt="" className='rounded-0 w-100' style={{ height: '60vh'}} />
                        </div>
                        <div className="col-lg-6 col-12 p-4" style={{ lineHeight: '27px' }}>
                            <h1 className="text-white">{data.title}</h1>
                            <p className="text-white">{data.desc}</p>
                            <p className="text-white fs-4"><span className='fs-3'>Rs :</span> {data.price}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Productdetails;