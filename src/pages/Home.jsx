import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../style/Style.css'
import image22 from '../images/images-removebg-preview.png'
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../images/photo-1441984904996-e0b6ba687e04.jpeg'
import image2 from '../images/whqw2miibg1c5e3seyytuugwboq9wjar.jpg'
import image3 from '../images/spacious-modern-walk-closet-organized-clothing-shoes-accessories-featuring-large-mirror-bright-lighting-organization-345996810.webp'
import { useState, useEffect, useContext } from 'react';
import { collection, doc, deleteDoc, getDocs, addDoc, where, query } from "firebase/firestore";
import { db } from '../config';
import MyContext from "../Context/Mycontext";
import { useNavigate } from "react-router";
const Home = () => {
    const { role, product, setproduct, user } = useContext(MyContext);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [favorites, setFavorites] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const products = [];
            querySnapshot.forEach((doc) => {
                const productData = doc.data();
                if (productData.featured) {
                    products.push({ id: doc.id, ...productData });
                }
            });
            setFeaturedProducts(products);
        };

        fetchFeaturedProducts();
    }, []);

    const deleteprod = async (id) => {
        try {
            const newProductData = product.filter((item) => item.productid !== id);
            await deleteDoc(doc(db, "products", id));
            setproduct(newProductData);
            console.log("Product deleted successfully");
            alert("Product deleted successfully");
        } catch (error) {
            console.error("Error deleting product: ", error);
        }
    };
    const edit = (id) => {
        navigate(`/addproduct/${id}`);
    };
    const cart = async (id) => {
        const cartdata = product.find((item) => item.productid === id);
        try {
            const cartQuery = query(
                collection(db, "carts"),
                where("uid", "==", user.uid),
                where("id", "==", id),
            );
            alert("Add cart")
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
                id: cartdata.productid,
                q: 1,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

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
                    favoritesData[data.id] = true;
                });
                setFavorites(favoritesData);
            } catch (error) {
                console.error("Error fetching favorites: ", error);
            }
        };

        if (user?.uid) {
            fetchFavorites();
        }
    }, [user]);

    const Favouritebtn = async (id) => {
        const cartdata = product.find((item) => item.productid === id);

        if (favorites[id]) {
            try {
                const favoriteQuery = query(
                    collection(db, "favourite"),
                    where("uid", "==", user.uid),
                    where("id", "==", id),
                );
                const querySnapshot = await getDocs(favoriteQuery);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async (docSnap) => {
                        await deleteDoc(doc(db, "favourite", docSnap.id));
                    });
                    setFavorites({ ...favorites, [id]: false }); // Update state to remove from favorites
                    console.log("Product removed from favorites");
                    alert("Delete wishlist");
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
                    id: cartdata.productid,
                });
                setFavorites({ ...favorites, [id]: true }); // Update state to add to favorites
                alert("Add wishlist")
                console.log("Product added to favorites with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding to favorites: ", e);
            }
        }
    };
    const details = (id) => {
        navigate(`/productdetails/${id}`);
    };
    return (
        <>
            <Navbar1 />
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img src={image1} alt="" className="main w-100" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image2} alt="" className="main w-100" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image3} alt="" className="main w-100" />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="container-fluid pb-5 pt-4" style={{ background: 'linear-gradient(162deg, rgba(3, 3, 3, 0.72) 20%, rgba(0, 0, 0, 0.73) 68%)' }}>
                <div className="container">
                    <div className="row">
                        <h2 className="mt-3 mb-3 text-white">Featured Products</h2>
                        {featuredProducts.map((items, index) => (
                            <div className="col-lg-3 col-md-6 col-12" key={index}>
                                <Card className='mt-2 mb-4 p-0 border-0 rounded-0 prodcard'>
                                    <Card.Img onClick={() => details(items.productid)} variant="top" className='rounded-0' src={items.image} style={{ height: '230px' }} />
                                    <Card.Body>
                                        <Card.Title>{items.title}</Card.Title>
                                        <Card.Text className="text-danger"><span className='fs-6'>$</span>{items.price}</Card.Text>
                                    </Card.Body>
                                    {role !== "admin" && (
                                        <div>
                                            <Button variant='primary' className='fw-semibold rounded-0' style={{ width: '80%' }} onClick={() => cart(items.productid)}>Cart <i className="bi bi-bag-check"></i></Button>
                                            <i
                                                className={`bi ${favorites[items.productid] ? "bi bi-suit-heart-fill" : "bi bi-suit-heart"} fs-4 likedbtn`}
                                                style={{ paddingLeft: '14px' }}
                                                onClick={() => Favouritebtn(items.productid)}
                                            ></i>
                                        </div>
                                    )}
                                    {role === "admin" && (
                                        <div>
                                            <Button variant='primary' className=' rounded-0' style={{ width: '49%' }} onClick={() => edit(items.productid)}>Edit <i className="bi bi-pencil-square"></i></Button>
                                            <Button variant='danger' className='rounded-0' style={{ width: '51%' }} onClick={() => deleteprod(items.productid)}>Delete <i className="bi bi-trash"></i></Button>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        ))}
                    </div>
                    <div className="bg-primary mt-5">
                        <div className="row">
                            <div className="col-lg-7 col-md-6 col-12 p-5 pb-0">
                                <h2 className="text-white">Shoes</h2>
                                <p className="fs-5 text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus doloremque consequuntur, quod tempora, architecto quam accusamus recusanda.</p>
                            </div>
                            <div className="col-lg-5 col-md-6 col-12">
                                <img style={{ width: '80%', height: '45vh' }} src={image22} alt="shoes" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Home;