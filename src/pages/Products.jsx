import { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import MyContext from '../Context/Mycontext';
import Navbar1 from '../components/Navbar';
import { doc, deleteDoc, getDocs, addDoc, collection, query, where } from "firebase/firestore";
import { db } from '../config';
import { useNavigate } from 'react-router';
import '../style/Style.css';
import Footer from '../components/Footer';
import { Spinner } from 'react-bootstrap'; 

const Products = () => {
    const { product, setproduct, role, user } = useContext(MyContext);
    const [category, setcategory] = useState("");
    const [searchcate, setsearchcate] = useState("");
    const [favorites, setFavorites] = useState({});
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const categories = [...new Set(product.map((item) => item.category))];

    const filterproduct = product.filter((item) => {
        const matchcate = category ? item.category === category : true;
        const matchsearchcate =
            item.title.toLowerCase().includes(searchcate.toLowerCase()) ||
            item.price.toLowerCase().includes(searchcate.toLowerCase());
        return matchcate && matchsearchcate;
    });

    const deleteprod = async (id) => {
        setLoading(true); 
        try {
            const newProductData = product.filter((item) => item.productid !== id);
            await deleteDoc(doc(db, "products", id));
            setproduct(newProductData);
            console.log("Product deleted successfully");
            alert("Product deleted successfully");
        } catch (error) {
            console.error("Error deleting product: ", error);
            alert("Error deleting product: ", error);
        } finally {
            setLoading(false); 
        }
    };

    const edit = (id) => {
        navigate(`/addproduct/${id}`);
    };

    const details = (id) => {
        navigate(`/productdetails/${id}`);
    };

    const cart = async (id) => {
        const cartdata = product.find((item) => item.productid === id);
        try {
            const cartQuery = query(
                collection(db, "carts"),
                where("uid", "==", user.uid),
                where("id", "==", id),
            );

            const querySnapshot = await getDocs(cartQuery);
            if (!querySnapshot.empty) {
                alert("This product is already in your cart!");
                navigate("/cart");
                return;
            }
            const docRef = await addDoc(collection(db, "carts"), {
                image: cartdata.image,
                title: cartdata.title,
                desc: cartdata.desc,
                price: cartdata.price,
                uid: user.uid,
                productid: cartdata.productid,
                q: 1,
            });
            alert("add cart")
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoriteQuery = query(
                    collection(db, "favourite"),
                    where("uid", "==", user.uid)
                );
                const querySnapshot = await getDocs(favoriteQuery);
                let favoritesData = {};
                querySnapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    favoritesData[data.productid] = true;
                });
                setFavorites(favoritesData); 
            } catch (error) {
                console.error("Error fetching favorites: ", error);
            }
        };
        if (user?.uid) {
            fetchFavorites();
        }
    }, [user.uid]);

    const Favouritebtn = async (id, event) => {
        event.preventDefault(); 

        const cartdata = product.find((item) => item.productid === id);

        if (favorites[id]) {
            try {
                const favoriteQuery = query(
                    collection(db, "favourite"),
                    where("uid", "==", user.uid),
                    where("productid", "==", id),
                );
                const querySnapshot = await getDocs(favoriteQuery);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async (docSnap) => {
                        await deleteDoc(doc(db, "favourite", docSnap.id));
                    });
                    setFavorites((prev) => ({ ...prev, [id]: false })); 
                    console.log("Product removed from favorites");
                    alert("Delete Whishlist");
                }
            } catch (e) {
                console.error("Error removing from favorites: ", e);
            }
        } else {
            try {
                const docRef = await addDoc(collection(db, "favourite"), {
                    image: cartdata.image,
                    title: cartdata.title,
                    desc: cartdata.desc,
                    price: cartdata.price,
                    uid: user.uid,
                    productid: cartdata.productid,
                });
                setFavorites((prev) => ({ ...prev, [id]: true }));
                alert("Add Whishlist")
                console.log("Product added to favorites with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding to favorites: ", e);
            }
        }
    };

    return (
        <>
            {role !== "admin" && <Navbar1 />}
            <div className="container-fluid" style={{ background: 'linear-gradient(162deg, rgba(3, 3, 3, 0.73) 20%, rgba(0, 0, 0, 0.74) 68%)' }}>
                <div className="container pt-4 pb-5">
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-9 mb-2">
                                    <Form.Group>
                                        <Form.Control
                                            className='rounded-0 shadow-none searchinput'
                                            style={{ backgroundColor: '#100f0f02', color: 'white' }}
                                            type="text"
                                            placeholder="Search..."
                                            value={searchcate}
                                            onChange={(e) => setsearchcate(e.target.value)}
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-3">
                                    <Form.Group>
                                        <Form.Control
                                            style={{ backgroundColor: '#100f0f02', color: 'white' }}
                                            className='rounded-0 shadow-none'
                                            as="select"
                                            value={category}
                                            onChange={(e) => setcategory(e.target.value)}
                                        >
                                            <option value="" style={{ backgroundColor: 'rgba(3,3,3,0.7343312324929971' }}>All Categories</option>
                                            {categories.map((category, index) => (
                                                <option style={{ backgroundColor: 'rgba(3,3,3,0.7343312324929971' }} key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {filterproduct.map((items, index) => (
                            <div className="col-lg-3 col-md-6 col-12" key={index}>
                                <Card className='mt-4 p-0 border-0 rounded-0 prodcard'>
                                    <Card.Img onClick={() => details(items.productid)} variant="top" className='rounded-0' src={items.image} style={{ height: '230px' }} />
                                    <Card.Body>
                                        <Card.Title>{items.title}</Card.Title>
                                        <Card.Text className='text-danger'><span className='fs-6'>$</span>{items.price}</Card.Text>
                                    </Card.Body>
                                    {role !== "admin" && (
                                        <div>
                                            <Button variant='primary' className='fw-semibold rounded-0' style={{ width: '80%' }} onClick={() => cart(items.productid)}>Cart <i className="bi bi-bag-check"></i></Button>
                                            <i
                                                className={`bi ${favorites[items.productid] ? "bi-suit-heart-fill" : "bi-suit-heart"} fs-4 likedbtn`}
                                                style={{ paddingLeft: '13px' }}
                                                onClick={(e) => Favouritebtn(items.productid, e)}
                                            ></i>
                                        </div>
                                    )}
                                    {role === "admin" && (
                                        <div>
                                            <Button variant='primary' className=' rounded-0' style={{ width: '49%' }} onClick={() => edit(items.productid)}>
                                                {loading ? <Spinner animation="border" size="sm" /> : "Edit"} <i className="bi bi-pencil-square"></i>
                                            </Button>
                                            <Button variant='danger' className='rounded-0' style={{ width: '51%' }} onClick={() => deleteprod(items.productid)} disabled={loading}>
                                                {loading ? <Spinner animation="border" size="sm" /> : "Delete"} <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {role !== "admin" && <Footer />}
        </>
    );
};

export default Products;
