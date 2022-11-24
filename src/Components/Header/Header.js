import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import classes from "./Header.module.css";
import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import useModal from "../../utils/useModal";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, postUser } from "../../redux/actions/blog.action";

function Header() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const data = JSON.parse(localStorage.getItem("values"));

  const [show, setShow] = useState(false);
  const { isShowing, toggle } = useModal();

  const handleSignIn = () => setShow(false);
  const handleSignUp = () => setShow(true);

  const [loginError, setLoginError] = useState(false);
  const [signupError, setSignUpError] = useState(false);

  let { user } = useSelector((state) => state.user);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    if (data) {
      setIsLoggedIn(true);
    }
    else{
      toggle()
    }
    setTimeout(() => {
      console.log(user);
    }, 2000);
  }, []);

  const signUpformik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (data, { resetForm }) => {
      let userNotFound = true;
      user.forEach((element) => {
        if (element.email === data.email) {
          userNotFound = false;
        } else {
        }
      });
      if (userNotFound) {
        dispatch(postUser(data));
        setShow(false);
        resetForm(data);
      } else {
        console.log(data);
        setSignUpError(true);
        setShow(true);
      }
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Name is required")
        .test(
          "is-full-name",
          "Please enter first name and last name",
          (value) => {
            if (value) {
              let nameArray = value.split(" ");
              return nameArray.length >= 2;
            }
          }
        ),
      email: yup
        .string()
        .email("Email is not in proper format")
        .required("Email is required"),
      password: yup
        .string()
        .required("Enter a secure password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must conatin 8 characters, one uppercase, one lowercase, one number and one special character"
        ),
    }),
  });

  const signInformik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      user.forEach((element) => {
        if (
          element.email === values.email &&
          element.password === values.password
        ) {
          console.log(values.email);
          resetForm(values);
          toggle();
          setIsLoggedIn(true);
          localStorage.setItem("values", JSON.stringify(element));
          navigate("/blog");
          // setLoginEmailError(false);
          // setLoginPasswordError(false);
        } else {
          //
          setLoginError(true);
        }
      });
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Email is not in proper format")
        .required("Email is required"),
      password: yup
        .string()
        .required("Enter a secure password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must conatin 8 characters, one uppercase, one lowercase, one number and one special character"
        ),
    }),
  });

  const clearData = () => {
    localStorage.clear("");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        {isLoggedin === false ? (
          <Container>
            <Navbar.Brand>
              <Link to="/">Medium</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              className={classes.navbarCollapse}
              id="responsive-navbar-nav"
            >
              <Nav className="me-auto">
                <Nav>
                  <Link to={`/category/1`}>Programming</Link>
                </Nav>
                &nbsp;&nbsp;
                <Nav>
                  <Link to={`/category/2`}>Data Science</Link>
                </Nav>
                &nbsp;&nbsp;
                <Nav>
                  <Link to={`/category/3`}>Self Improvement</Link>
                </Nav>
                &nbsp;&nbsp;
                <Nav>
                  <Link to={`/category/4`}>Technology</Link>
                </Nav>
                &nbsp;&nbsp;
                <Nav>
                  <Link to={`/category/5`}>Others</Link>
                </Nav>
                &nbsp;&nbsp;
                <Nav.Link
                  onClick={() => {
                    toggle();
                    signInformik.setTouched({}, false);
                    signUpformik.setTouched({}, false);
                    signUpformik.resetForm();
                    signInformik.resetForm();
                    setLoginError(false);
                    setSignUpError(false);
                  }}
                  style={{ backgroundColor: "black", borderRadius: "5px" }}
                >
                  Get Started
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        ) : (
          <Container>
            <Navbar.Brand>
              <Link to="/blog">Medium</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              className={classes.navbarCollapse}
              id="responsive-navbar-nav"
            >
              <Nav className="me-auto">
                <Nav>
                  <Link to={`/createpost/new`}>Create Post</Link>
                </Nav>
                &nbsp;&nbsp;
                <Nav>
                  <Link to={`/profile`}>My Profile</Link>
                </Nav>
                &nbsp;&nbsp;
                <Nav>
                  <Link to={`/mypost`}>My Post</Link>
                </Nav>
                &nbsp;&nbsp;
                <Nav>
                  <Link style={{ display: "inline-flex" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    {data?.name?.toUpperCase()}
                  </Link>
                </Nav>
                &nbsp;&nbsp;
                <Nav.Link
                  style={{ backgroundColor: "black", borderRadius: "5px" }}
                  onClick={clearData}
                >
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        )}
      </Navbar>
      {isShowing ? (
        <Modal hide={toggle}>
          <div className={classes.modalOverlay} />
          <div
            className={classes.modalWrapper}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className={classes.modal}>
              <div className={classes.modalHeader}>
                <button
                  type="button"
                  className={classes.modalCloseButton}
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggle}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div>
                {show ? (
                  <>
                    <h1>Sign Up</h1>
                    <hr></hr>
                    <div className="max-w-xs container mx-auto mt-10">
                      <form className="" onSubmit={signUpformik.handleSubmit}>
                        <div className="mb-4">
                          <label>Full Name</label>
                          <input
                            onChange={signUpformik.handleChange}
                            value={signUpformik.values.name}
                            onBlur={signUpformik.handleBlur}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                              signUpformik.errors.name &&
                              signUpformik.touched.name
                                ? "border-red-400"
                                : "border-blue-400"
                            }`}
                            type="text"
                            name="name"
                            id="name"
                          />
                          <span className="text-red-500 text-sm">
                            {signUpformik.errors.name &&
                              signUpformik.touched.name &&
                              signUpformik.errors.name}
                          </span>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                          </label>
                          <input
                            onChange={signUpformik.handleChange}
                            value={signUpformik.values.email}
                            onBlur={signUpformik.handleBlur}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                              signUpformik.errors.email &&
                              signUpformik.touched.email
                                ? "border-red-400"
                                : "border-blue-400"
                            }`}
                            type="email"
                            name="email"
                            id="email"
                          />
                          <span className="text-red-500 text-sm">
                            {signUpformik.errors.email &&
                              signUpformik.touched.email &&
                              signUpformik.errors.email}
                          </span>
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                          </label>
                          <input
                            onChange={signUpformik.handleChange}
                            value={signUpformik.values.password}
                            onBlur={signUpformik.handleBlur}
                            id="password"
                            name="password"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                              signUpformik.errors.password &&
                              signUpformik.touched.password
                                ? "border-red-400"
                                : "border-blue-400"
                            }`}
                            type="password"
                          />
                          <span className="text-red-500 text-sm">
                            {signUpformik.errors.password &&
                              signUpformik.touched.password &&
                              signUpformik.errors.password}
                          </span>
                        </div>
                        <div className="mb-4">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Sign Up
                          </button>
                          &nbsp;
                          <a
                            style={{
                              textDecoration: "underline",
                              color: "blue",
                            }}
                            onClick={handleSignIn}
                          >
                            Sign In
                          </a>
                        </div>
                        {signupError ? (
                          <p style={{ color: "red" }}>Email already exists</p>
                        ) : (
                          ""
                        )}
                      </form>
                    </div>
                  </>
                ) : (
                  <>
                    <h1>Sign In</h1>
                    <hr></hr>
                    <div className="max-w-xs container mx-auto mt-10">
                      <form className="" onSubmit={signInformik.handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                          </label>
                          <input
                            onChange={signInformik.handleChange}
                            value={signInformik.values.email}
                            onBlur={signInformik.handleBlur}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                              signInformik.errors.email &&
                              signInformik.touched.email
                                ? "border-red-400"
                                : "border-blue-400"
                            }`}
                            type="email"
                            name="email"
                            id="email"
                          />
                          <span className="text-red-500 text-sm">
                            {signInformik.errors.email &&
                              signInformik.touched.email &&
                              signInformik.errors.email}
                          </span>
                          {/* {loginemailerror ? (
                            <p style={{ color: "red" }}>
                              Please enter a valid email
                            </p>
                          ) : (
                            ""
                          )} */}
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                          </label>
                          <input
                            onChange={signInformik.handleChange}
                            value={signInformik.values.password}
                            onBlur={signInformik.handleBlur}
                            id="password"
                            name="password"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                              signInformik.errors.password &&
                              signInformik.touched.password
                                ? "border-red-400"
                                : "border-blue-400"
                            }`}
                            type="password"
                          />
                          <span className="text-red-500 text-sm">
                            {signInformik.errors.password &&
                              signInformik.touched.password &&
                              signInformik.errors.password}
                          </span>
                          {/* {loginpassworderror ? (
                            <p style={{ color: "red" }}>
                              Please enter a valid password
                            </p>
                          ) : (
                            ""
                          )} */}
                        </div>
                        <div className="mb-4">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Sign In
                          </button>
                          &nbsp;
                          <a
                            style={{
                              textDecoration: "underline",
                              color: "blue",
                            }}
                            onClick={handleSignUp}
                          >
                            Sign Up
                          </a>
                        </div>
                        <div>
                          {loginError ? (
                            <p style={{ color: "red" }}>
                              Please enter a valid email and password
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </form>
                    </div>
                  </>
                )}
                <br />
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default React.memo(Header);
