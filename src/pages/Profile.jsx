import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { useContext, useEffect, useState } from "react";
import MyContext from "../Context/Mycontext";
import { getAuth, updatePassword } from "firebase/auth";
import '../style/Style.css'
import Spinner from 'react-bootstrap/Spinner';
const Profile = () => {
    const { user } = useContext(MyContext);
    const [userdata, setuserdata] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        const getuser = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setuserdata(docSnap.data());
                setFormData(docSnap.data()); // Set form data to the current user data
            } else {
                console.log("No such document!");
            }
        };
        getuser();
    }, [user.uid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            try {
                if (formData.password !== userdata.password) {
                    await updatePassword(user, formData.password);
                }

                const docRef = doc(db, "users", user.uid);
                await updateDoc(docRef, formData);
                setuserdata(formData);
                setEditMode(false);
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                alert("Profile updated successfully!");
            } catch (error) {
                console.error("Error updating document: ", error);
                alert("There was an error updating your profile. Please try again.");
            }
        }
    };

    return (
        <>
            <Navbar1 />
            <div className="container-fluid" style={{ background: 'linear-gradient(0deg, rgba(10, 10, 10, 0.76) 0%, rgba(9, 9, 9, 0.64) 50%, rgba(0, 0, 0, 0.65) 100%)' }}>
                <div className="container pt-5 pb-5">
                    <div className="row d-flex justify-content-center">
                        <div className="abc col-lg-6 p-3 pb-4" style={{ border: '2px solid white' }}>
                            <h1 className="text-white">Profile Page</h1>

                            <div className="namediv">
                                <h5 className="text-white">First name :</h5>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <p className="text-white">{userdata?.firstname}</p>
                                )}
                            </div>

                            <div className="namediv">
                                <h5 className="text-white">Last name :</h5>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <p className="text-white">{userdata?.lastname}</p>
                                )}
                            </div>

                            <div className="namediv">
                                <h5 className="text-white">Email :</h5>
                                {editMode ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <p className="text-white">{userdata?.email}</p>
                                )}
                            </div>

                            <div className="namediv">
                                <h5 className="text-white">Password :</h5>
                                {editMode ? (
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <p className="text-white">{userdata?.password}</p>
                                )}
                            </div>

                            <div className="mt-3">
                                {editMode ? (
                                    <button onClick={handleSave} className="btn btn-primary">Save</button>
                                ) : (
                                    <button onClick={() => setEditMode(true)} className="btn btn-warning">Edit Profile</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
