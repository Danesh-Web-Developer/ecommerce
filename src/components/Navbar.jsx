// import { useContext, useEffect, useState } from 'react';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link, NavLink } from 'react-router';
// import '../style/Style.css';
// import { query, collection, where, onSnapshot, addDoc, deleteDoc, getDocs } from "firebase/firestore";
// import MyContext from '../Context/Mycontext';
// import { LayoutDashboard } from 'lucide-react';
// import { db } from '../config';

// const Navbar1 = () => {
//   const { role, user } = useContext(MyContext);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   console.log(wishlistCount);

//   const [cartCount, setCartCount] = useState(0);
//   console.log(cartCount);

//   const handleWishlistToggle = async (productId) => {
//     if (user?.uid) {
//       const wishlistQuery = query(
//         collection(db, "userwishlist"),
//         where("uid", "==", user.uid),
//         where("productId", "==", productId)
//       );

//       const querySnapshot = await getDocs(wishlistQuery);
//       const isItemInWishlist = querySnapshot.empty;

//       if (isItemInWishlist) {
//         try {
//           await addDoc(collection(db, "userwishlist"), {
//             uid: user.uid,
//             productId: productId,
//           });
//         } catch (error) {
//           console.error("Error adding item to wishlist: ", error);
//         }
//       } else {
//         try {
//           querySnapshot.forEach(async (doc) => {
//             await deleteDoc(doc.ref);
//           });
//         } catch (error) {
//           console.error("Error removing item from wishlist: ", error);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     if (user?.uid) {
//       const wishlistQuery = query(
//         collection(db, "userwishlist"),
//         where("uid", "==", user.uid)
//       );

//       onSnapshot(wishlistQuery, (querySnapshot) => {
//         setWishlistCount(querySnapshot.size);
//       });
//     }
//   }, [user?.uid]);

//   useEffect(() => {
//     if (user?.uid) {
//       const cartQuery = query(
//         collection(db, "carts"),
//         where("uid", "==", user.uid)
//       );

//       onSnapshot(cartQuery, (querySnapshot) => {
//         setCartCount(querySnapshot.size);
//       });
//     }
//   }, [user?.uid]);

//   return (
//     <Navbar expand="lg" className='navbar bg-dark w-100'>
//       <Container>
//         <Navbar.Brand className='logoname fs-2 text-white fw-bold'>Shokk</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" style={{ backgroundColor: 'white' }} />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
//             <NavLink to="/" className='text-white text-decoration-none mx-2'>Home</NavLink>
//             <NavLink to="/about" className='text-white text-decoration-none mx-2'>About</NavLink>
//             <NavLink to="/contact" className='text-white text-decoration-none mx-2'>Contact</NavLink>
//             <NavLink to="/product" className='text-white text-decoration-none mx-2'>Product</NavLink>
//             <NavLink to="/login" className='text-white text-decoration-none mx-2'>Login</NavLink>
//           </Nav>

//           {role !== "admin" && (
//             <div className='d-flex gap-2'>
//               <Link to={role === "user" ? "/profile" : "/login"} className='text-white text-decoration-none'>
//                 <i className="bi bi-person text-white text-decoration-none fs-5"></i> <i>Profile</i>
//               </Link>
//               <Link to={role === "user" ? "/favourite" : "/login"} className='text-white text-decoration-none'>
//                 <i className="bi bi-suit-heart text-white text-decoration-none fs-5 position-relative">
//                   {wishlistCount > 0 && (
//                     <span className="wishlist-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </i>
//                 <i>Whishlist</i>
//               </Link>

//               <Link to={role === "user" ? "/cart" : "/login"} className='text-white text-decoration-none'>
//                 <i className="bi bi-cart-dash text-white text-decoration-none fs-5 position-relative">
//                   {cartCount > 0 && (
//                     <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                       {cartCount}
//                     </span>
//                   )}
//                 </i>
//                 <i>Cart</i>
//               </Link>

//             </div>
//           )}

//           {role === "admin" && (
//             <NavLink to='/dashboard' className='fs-2 text-white'>
//               <LayoutDashboard />
//             </NavLink>
//           )}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navbar1;



import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router';
import '../style/Style.css';
import { query, collection, where, onSnapshot } from "firebase/firestore";
import MyContext from '../Context/Mycontext';
import { LayoutDashboard } from 'lucide-react';
import { auth, db } from '../config';
import { signOut } from "firebase/auth";
import { Button } from 'react-bootstrap';

const Navbar1 = () => {
  const { role, user } = useContext(MyContext);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      const wishlistQuery = query(
        collection(db, "favourite"),
        where("uid", "==", user.uid)
      );

      const unsubscribeWishlist = onSnapshot(wishlistQuery, (querySnapshot) => {
        setWishlistCount(querySnapshot.size);
      });

      return () => unsubscribeWishlist();
    } else {
      setWishlistCount(0);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      const cartQuery = query(
        collection(db, "carts"),
        where("uid", "==", user.uid)
      );

      const unsubscribeCart = onSnapshot(cartQuery, (querySnapshot) => {
        setCartCount(querySnapshot.size);
      });

      return () => unsubscribeCart();
    } else {
      setCartCount(0);
    }
  }, [user?.uid]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <Navbar expand="lg" className='navbar bg-dark w-100'>
      <Container>
        <Navbar.Brand className='logoname fs-2 text-white fw-bold'>Shokk</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" style={{ backgroundColor: 'white' }} />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            <NavLink to="/" className='text-white text-decoration-none mx-2 nav-link'>Home</NavLink>
            <NavLink to="/about" className='text-white text-decoration-none mx-2 nav-link'>About</NavLink>
            <NavLink to="/contact" className='text-white text-decoration-none mx-2 nav-link'>Contact</NavLink>
            <NavLink to="/product" className='text-white text-decoration-none mx-2 nav-link'>Product</NavLink>
            {/* <NavLink to="/login" className='text-white text-decoration-none mx-2 nav-link'>Login</NavLink> */}
          </Nav>

          {role !== "admin" && (
            <div className='d-flex gap-2'>
              <Link to={role === "user" ? "/profile" : "/login"} className='text-white text-decoration-none'>
                <i className="bi bi-person text-white text-decoration-none fs-5"></i> <i> Profile</i>
              </Link>
              <Link to={role === "user" ? "/favourite" : "/login"} className='text-white text-decoration-none'>
                <i className="bi bi-suit-heart text-white text-decoration-none fs-5 position-relative">
                  {wishlistCount > 0 && (
                    <span className="wishlist-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {wishlistCount}
                    </span>
                  )}
                </i> <i>Wishlist</i>
              </Link>

              <Link to={role === "user" ? "/cart" : "/login"} className='text-white text-decoration-none'>
                <i className="bi bi-cart-dash text-white text-decoration-none fs-5 position-relative">
                  {cartCount > 0 && (
                    <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </i> <i>Cart</i>
              </Link>
          <Button className='ms-3 p-1 btn-danger text-white mx-2 px-2 ' onClick={logout}>
            Logout
          </Button>
            </div>
          )}
          {role === "admin" && (
            <NavLink to='/dashboard' className='fs-2 text-white'>
              <LayoutDashboard />
            </NavLink>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;