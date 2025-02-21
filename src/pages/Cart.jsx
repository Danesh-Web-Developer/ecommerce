import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar";
import Card from 'react-bootstrap/Card';
import MyContext from "../Context/Mycontext";
import { db } from "../config";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";

const Cart = () => {
    const { user, setcart } = useContext(MyContext);
    const [cartproduct, setcartproduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const q = query(collection(db, "carts"), where("uid", "==", user.uid));

    useEffect(() => {
        const getcartdata = async () => {
            const querySnapshot = await getDocs(q);
            const cartData = querySnapshot.docs.map((doc) => doc.data());
            setcartproduct(cartData);
            setcart(cartData);
            setLoading(false); 
        };
        getcartdata();
    }, [user.uid]);

    const deleteprod = async (id) => {
        const updatedData = cartproduct.filter((items) => items.productid !== id);
        const q = query(collection(db, "carts"), where("productid", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        setcartproduct(updatedData);
    };

    const productqincrease = async (productid) => {
        const q = query(collection(db, "carts"), where("id", "==", productid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            const updateData = doc.data();
            const newQuantity = updateData.q + 1;
            const docRef = doc.ref;
            await updateDoc(docRef, { q: newQuantity });

            setcartproduct(cartproduct.map((product) =>
                product.id === productid
                    ? { ...product, q: newQuantity }
                    : product
            ));
        });
    };

    const productqdecrease = async (productid) => {
        const q = query(collection(db, "carts"), where("id", "==", productid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            const updateData = doc.data();
            const newQuantity = updateData.q - 1;
            if (newQuantity < 1) {
                // newQuantity = 1
                return;
            }
            const docRef = doc.ref;
            await updateDoc(docRef, { q: newQuantity });

            setcartproduct(cartproduct.map((product) =>
                product.id === productid
                    ? { ...product, q: newQuantity }
                    : product
            ));
        });
    };

    const subtotal = cartproduct.reduce(
        (total, product) => {
            const price = parseFloat(product.price) || 0;
            const quantity = parseInt(product.q) || 0;
            return total + price * quantity;
        },
        0
    );
    const shipping = 5.0;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        navigate("/checkout");
    };

    const details = (id) => {
        console.log(id);
        navigate(`/productdetails/${id}`);
    };

    return (
        <>
            <Navbar1 />
            <div className="container-fluid" style={{ background: 'linear-gradient(162deg, rgba(3,3,3,0.7343312324929971) 20%, rgba(0,0,0,0.8463760504201681) 68%)' }}>
                <div className="container pt-4 pb-5">
                    <h3 className="text-white">Cart</h3>
                    {loading ? (
                        <div className="d-flex justify-content-center mt-5">
                            <Spinner animation="border" variant="light" />
                        </div>
                    ) : (
                        <Row>
                            <Col xs={12} lg={8} className="mb-4">
                                {cartproduct.length > 0 ? (
                                    cartproduct.map((product) => (
                                        <Card key={product.id} className="mb-3 rounded-0">
                                            <Card.Body>
                                                <Row className="align-items-center">
                                                    <Col xs={12} sm={3} className="text-center mb-3 mb-sm-0">
                                                        <img
                                                            src={product.image}
                                                            alt={product.title}
                                                            className="img-fluid"
                                                            style={{ maxHeight: "100px" }}
                                                            onClick={() => details(product.productid)}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={3} className="text-center mb-3 mb-sm-0">
                                                        <span className="fw-bold">{product.title}</span>
                                                    </Col>
                                                    <Col xs={12} sm={2} className="text-center mb-3 mb-sm-0">
                                                        <span>{product.price}</span>
                                                    </Col>
                                                    <Col xs={12} sm={2} className="text-center mb-3 mb-sm-0">
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <Button onClick={() => productqdecrease(product.id)}>-</Button>
                                                            <p className="px-1 mb-0">{product.q || 0}</p>
                                                            <Button onClick={() => productqincrease(product.id)}>+</Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} sm={2} className="text-center">
                                                        <i
                                                            onClick={() => deleteprod(product.productid)}
                                                            className="bi bi-trash ms-3 fs-5"
                                                            style={{ cursor: 'pointer' }}
                                                        ></i>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-white">No products in your cart.</p>
                                )}
                            </Col>

                            {cartproduct.length > 0 && (
                                <Col xs={12} lg={4}>
                                    <Card className="shadow-sm rounded-0">
                                        <Card.Body>
                                            <Card.Title>Order Summary</Card.Title>
                                            <div className="d-flex justify-content-between">
                                                <span>Subtotal:</span>
                                                <span>${subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Shipping:</span>
                                                <span>${shipping.toFixed(2)}</span>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between fw-bold">
                                                <span>Total:</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                            <Button
                                                variant="success"
                                                className="w-100 mt-3 rounded-0"
                                                onClick={handleCheckout}
                                            >
                                                Proceed to Checkout
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
