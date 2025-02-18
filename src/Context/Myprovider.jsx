import { useEffect, useState } from "react";
import MyContext from "./Mycontext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const MyProvider = ({ children }) => {
    const [role, setrole] = useState("");
    const [product, setproduct] = useState([])
    const [user, setuser] = useState("")
    const [cart, setcart] = useState([])


    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setuser(user)
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setrole(userData.role);
                } else {
                    console.log("No such document!");
                }
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        });
        getproduct();
    }, [])

    const getproduct = async () => {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productdata = [];
        querySnapshot.forEach((doc) => {
            productdata.push(doc.data());
        });
        setproduct(productdata);
    };

    return (
        <MyContext.Provider
            value={{
                role,
                setrole,
                product,
                setproduct,
                user,
                setuser,
                cart,
                setcart
            }}
        >
            {children}
        </MyContext.Provider>
    );
};
export default MyProvider;