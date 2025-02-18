import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar";
import Card from 'react-bootstrap/Card';
import MyContext from "../Context/Mycontext";
import { db } from "../config";
import { useNavigate } from 'react-router';

const Favourite = () => {
    const { user } = useContext(MyContext);
    const [favourite, setfavourite] = useState([])

    const navigate = useNavigate();

    const q = query(collection(db, "favourite"), where("uid", "==", user.uid));

    useEffect(() => {
        const getcartdata = async () => {
            const querySnapshot = await getDocs(q);
            const cartData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
            setfavourite(cartData);
        }
        getcartdata()
    }, [user.uid]);

    const deleteFavourite = async (itemId) => {
        try {
            const docRef = doc(db, "favourite", itemId);
            await deleteDoc(docRef);
            setfavourite(favourite.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Error deleting favourite: ", error);
        }
    }
    const details = (id) => {
        console.log(id);
        navigate(`/productdetails/${id}`);
    };
    return (
        <>
            <Navbar1 />
            <div className="container-fluid" style={{ background: 'linear-gradient(162deg, rgba(3,3,3,0.7343312324929971) 20%, rgba(0,0,0,0.8463760504201681) 68%)' }}>
                <div className="container pt-4 pb-5">
                    <h3 className="text-white">Favourite</h3>
                    <div className="row">
                        {favourite.length > 0 ? (
                            favourite.map((items, index) => (
                                <div className="col-lg-3 col-md-6 col-12" key={index}>
                                    <Card className='mt-4 p-0 border-0 rounded-0 prodcard'>
                                    <Card.Img onClick={() => details(items.productid)} variant="top" className='rounded-0' src={items.image} style={{ height: '220px' }} />
                                        <Card.Body>
                                            <Card.Title>{items.title}</Card.Title>
                                            <Card.Text><span className='fs-5'>Rs:</span> {items.price}</Card.Text>
                                        </Card.Body>
                                        <button
                                            className="btn btn-danger rounded-0"
                                            onClick={() => deleteFavourite(items.id)}
                                        >
                                            Delete <i className="bi bi-trash"></i>
                                        </button>
                                    </Card>
                                </div>
                            ))
                        ) : (
                            <p className="text-white">No products in your wishlist.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Favourite;
