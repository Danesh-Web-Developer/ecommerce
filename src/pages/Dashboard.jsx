import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route, useNavigate } from "react-router";
import Addproduct from "./Addproduct";
import Order from "./Order";
import Products from "./Products";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config";
import { Package } from 'lucide-react';
import Card1 from "../components/Card1";
import { getAuth, signOut } from "firebase/auth";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 
  const auth = getAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth); 
      navigate("/login"); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className={`col-lg-2 col-md-3 bg-dark text-white p-3 ${showSidebar ? "d-block" : "d-none d-md-block"
            }`}
          style={{
            height: "100vh",
            overflowY: "auto",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 1000,
          }}
        >
          <button
            className="btn btn-light d-block d-md-none mb-3"
            onClick={() => setShowSidebar(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>
          <h3>Sidebar</h3>
          <ul className="list-unstyled mt-5 lh-lg">
            <li>
              <Link
                to="/dashboard/product"
                className="text-white text-decoration-none"
              >
                <i className="bi bi-box me-2 fs-5"></i>
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/order"
                className="text-white text-decoration-none"
              >
                <Package className="me-2" />
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/addproduct"
                className="text-white text-decoration-none"
              >
                <i className="bi bi-plus-circle fs-5 me-2"></i>Add Product
              </Link>
            </li>
            <li className="mt-3">
              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>

        <div
          className={`col-lg-10 col-md-9 p-0 ${showSidebar ? "ms-0" : "ms-auto"
            }`}
          style={{ marginLeft: showSidebar ? "250px" : "0" }}
        >
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
            <div className="container-fluid">
              <button
                className="navbar-toggler d-block d-md-none"
                type="button"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <h1 className="navbar-brand">Dashboard</h1>
            </div>
          </nav>
          <Routes>
            <Route path="addproduct" element={<Addproduct />} />
            <Route path="order" element={<Order />} />
            <Route path="product" element={<Products />} />
            <Route path="addproduct/:id" element={<Addproduct />} />
            <Route index element={
              <>
                <Card1 />
                <div className="d-flex justify-content-center pb-0">
                  <div className="col-11">
                    <h2 className="mx-4 mt-5">Users</h2>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                      {users.length > 0 ? (
                        users.map((user) => (
                          user.role !== 'admin' && (
                            <div key={user.id} className="col">
                              <div className="card h-100">
                                <div className="card-body lh-1">
                                  <h5 className="card-title">{user.firstname} {user.lastname}</h5>
                                  <h6 className="card-subtitle mb-2 text-muted">{user.role}</h6>
                                  <p className="card-text">{user.email}</p>
                                  <p>{user.id}</p>
                                </div>
                              </div>
                            </div>
                          )
                        ))
                      ) : (
                        <p>Loading users...</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
