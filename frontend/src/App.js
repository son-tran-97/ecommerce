import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { AdminScreen } from "./screens/AdminScreen";
import { SigninScreen } from "./screens/SigninScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { SearchBox } from "./screens/SearchBox";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { signout } from "./actions/userAction";
import { searchProduct } from "./actions/productActions";

export const App = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const handleSubmitForm = (formValue) => {
    console.log(formValue);
    dispatch(searchProduct(formValue.search));
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/">Rommache</Link>
          </div>
          <div className="search-div">
            <SearchBox onSubmit={handleSubmitForm}></SearchBox>
          </div>
          <div>
            <Link to="/admin" className="cart-menu">
              Ordered
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign in</Link>
            )}
          </div>
        </header>
        <main className="main">
          <Route path="/admin" component={AdminScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer>All right is reserved.</footer>
      </div>
    </BrowserRouter>
  );
};