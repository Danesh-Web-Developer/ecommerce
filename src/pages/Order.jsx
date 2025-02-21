import { useContext, useEffect, useState } from "react";
import { Card, Table, Spinner } from "react-bootstrap";
import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import MyContext from "../Context/Mycontext";

const Orders = () => {
    const { role } = useContext(MyContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // New state for loading

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "orders"));
                const ordersData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(ordersData);
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                console.error("Error fetching orders:", err);
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchOrders();
    }, []);

    return (
        <>
            {role !== "admin" && <Navbar1 />}
            <div className="container-fluid" style={{ background: 'linear-gradient(162deg, rgba(3,3,3,0.7343312324929971) 20%, rgba(0,0,0,0.8463760504201681) 68%)' }}>
                <div className="container pt-4 pb-5">
                    <h3 className="text-white">Your Orders</h3>
                    {loading ? ( // If still loading, show a spinner
                        <div className="text-center">
                            <Spinner animation="border" variant="light" />
                            <p className="text-white">Loading...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <Card className="text-center p-4">
                            <Card.Title>No orders found.</Card.Title>
                        </Card>
                    ) : (
                        orders.map((order) => (
                            <Card key={order.id} className="mb-4 rounded-0">
                                <Card.Body>
                                    <Card.Title>Order ID: {order.id}</Card.Title>
                                    <Card.Subtitle className="mb-3">
                                        Order Date: {new Date(order.orderDate).toLocaleString()}
                                    </Card.Subtitle>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.orderItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.title}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${item.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div className="mt-3">
                                        <strong>Shipping Address:</strong>
                                        <p>
                                            {order.shippingAddress.name},<br />
                                            {order.shippingAddress.address},<br />
                                            {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zip}
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <strong>Payment Information:</strong>
                                        <p>
                                            Card Number: {order.paymentInfo.cardNumber}<br />
                                            Expiry Date: {order.paymentInfo.expiryDate}<br />
                                            CVV: {order.paymentInfo.cvv}
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <strong>Order Summary:</strong>
                                        <p>
                                            Subtotal: ${order.subtotal}<br />
                                            Shipping: ${order.shipping}<br />
                                            Total: ${order.total}
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </div>
            </div>
            {role !== "admin" && <Footer />}
        </>
    );
};

export default Orders;
