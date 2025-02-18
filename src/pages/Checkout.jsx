import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar";
import MyContext from "../Context/Mycontext";
import { addDoc, collection, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../config";

const Checkout = () => {
    const { cart, user, setcart } = useContext(MyContext);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.uid) {
            alert("Please log in to place an order.");
            navigate("/login");
            return;
        }

        const subtotal = cart.reduce((total, product) => {
            const price = parseFloat(product.price) || 0;
            const quantity = parseInt(product.q) || 0;
            return total + price * quantity;
        }, 0);
        const shipping = 5.0;
        const total = subtotal + shipping;

        const orderData = {
            userId: user.uid,
            shippingAddress: {
                name: formData.name,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
            },
            paymentInfo: {
                cardNumber: formData.cardNumber,
                expiryDate: formData.expiryDate,
                cvv: formData.cvv,
            },
            orderItems: cart.map((item) => ({
                productId: item.id,
                title: item.title,
                price: item.price,
                quantity: item.q,
            })),
            subtotal: subtotal.toFixed(2),
            shipping: shipping.toFixed(2),
            total: total.toFixed(2),
            orderDate: new Date().toISOString(),
        };

        try {
            const ordersCollection = collection(db, "orders");
            await addDoc(ordersCollection, orderData);

            const cartQuery = query(collection(db, "carts"), where("uid", "==", user.uid));
            const cartSnapshot = await getDocs(cartQuery);
            cartSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });

            setcart([]);

            alert("Order placed successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error placing order: ", error);
            // alert("Failed to place order. Please try again.");
        }
    };

    const subtotal = cart.reduce(
        (total, product) => {
            const price = parseFloat(product.price) || 0;
            const quantity = parseInt(product.q) || 0;
            return total + price * quantity;
        },
        0
    );
    const shipping = 5.0;
    const total = subtotal + shipping;

    return (
        <>
            <Navbar1 />
            <div className="container-fluid" style={{ background: 'linear-gradient(162deg, rgba(3,3,3,0.7343312324929971) 20%, rgba(0,0,0,0.8463760504201681) 68%)' }}>
                <div className="container pt-4 pb-5">
                    <h3 className="text-white">Checkout</h3>
                    <Row>
                        <Col xs={12} lg={8}>
                            <Card className="mb-4 rounded-0">
                                <Card.Body>
                                    <Card.Title>Shipping Address</Card.Title>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>State</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Zip Code</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="zip"
                                                        value={formData.zip}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Card.Title className="mt-4">Payment Information</Card.Title>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Card Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Expiry Date</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="expiryDate"
                                                        value={formData.expiryDate}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>CVV</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="cvv"
                                                        value={formData.cvv}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button variant="success" type="submit" className="w-100 rounded-0">
                                            Place Order
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
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
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;