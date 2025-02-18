import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { collection, addDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../config';
import { useNavigate, useParams } from 'react-router';
import '../style/Style.css'
import { getDoc } from "firebase/firestore";
import MyContext from '../Context/Mycontext';

const Addproduct = () => {
    const { product, setproduct } = useContext(MyContext);
    const [featured, setFeatured] = useState([]);
    const [image, setimage] = useState('')
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
    const [price, setprice] = useState('')
    const [category, setcategory] = useState('')
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            const edit = async () => {
                const productRef = doc(db, "products", id);
                const docSnap = await getDoc(productRef);
                if (docSnap.exists()) {
                    const productData = docSnap.data();
                    setimage(productData.image);
                    settitle(productData.title);
                    setdesc(productData.desc);
                    setprice(productData.price);
                    setcategory(productData.category);
                } else {
                    console.log("No such product!");
                }
            }
            edit();
        }
    }, []);

    const Addproduct = async () => {
        if (image && title && desc && price && category) {
            try {
                const docRef = await addDoc(collection(db, "products"), {
                    image: image,
                    title: title,
                    desc: desc,
                    price: price,
                    category: category,
                    featured: featured,
                });
                const productRef = doc(db, "products", docRef.id);
                await updateDoc(productRef, {
                    productid: docRef.id
                });
                setimage('');
                settitle('');
                setdesc('');
                setprice('');
                setcategory('');
                setFeatured(false); 
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            alert("All fields are required");
        }
    }

    const editProduct = async () => {
        try {
            const productRef = doc(db, "products", id);
            await updateDoc(productRef, {
                image: image,
                title: title,
                desc: desc,
                price: price,
                category: category,
                featured: featured,
            });
            const updatedProducts = product.map((product) =>
                product.productid === id ? { ...product, title, category, image, desc, price, featured } : product
            );
            setproduct(updatedProducts);
            navigate("/product");
        } catch (e) {
            console.error("Error updating product: ", e);
        }
    };

    return (
        <>
            <div className='container-fluid d-flex align-items-center vh-100' style={{ background: 'linear-gradient(0deg, rgba(10,10,10,0.9304096638655462) 0%, rgba(9,9,9,1) 50%, rgba(0,0,0,0.742734593837535) 100%)' }}>
                <div className='container'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-lg-6 p-3 pb-4' style={{ backgroundColor: '#00000000', border: '2px solid white' }}>
                            <h2 className='text-center mb-1 text-white'>{id ? "Edit Product" : "Add Product"}</h2>
                            <Form>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='text-white'>Image</Form.Label>
                                    <Form.Control className='shadow-none rounded-0' type="url"
                                        value={image}
                                        onChange={(e) => setimage(e.target.value)}
                                        placeholder='Image...'
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='text-white'>Title</Form.Label>
                                    <Form.Control className='shadow-none rounded-0' type="text"
                                        value={title}
                                        onChange={(e) => settitle(e.target.value)}
                                        placeholder='Title...'
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='text-white'>Description</Form.Label>
                                    <Form.Control as="textarea" rows={2} className=' shadow-none rounded-0'
                                        value={desc}
                                        onChange={(e) => setdesc(e.target.value)}
                                        placeholder='Description...'
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='text-white'>Price</Form.Label>
                                    <Form.Control className='shadow-none rounded-0' type="number"
                                        value={price}
                                        onChange={(e) => setprice(e.target.value)}
                                        placeholder='Price...'
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='text-white'>Category</Form.Label>
                                    <Form.Control className='shadow-none rounded-0' type="text"
                                        value={category}
                                        onChange={(e) => setcategory(e.target.value)}
                                        placeholder='Category...'
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='text-white'>Featured</Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        label="Is this product featured?"
                                        checked={featured}
                                        onChange={(e) => setFeatured(e.target.checked)} 
                                        className='text-white'
                                    />
                                </Form.Group>
                                <Button className='w-100 rounded-0' onClick={id ? editProduct : Addproduct}>
                                    {id ? "Edit Product" : "Add Product"}
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Addproduct;