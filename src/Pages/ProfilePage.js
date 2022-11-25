import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../Components/UI/Card";
import classes from "./ProfilePage.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { userUpdate } from "../redux/actions/blog.action";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/UI/Spinner";

export default function ProfilePage() {
  let navigate = useNavigate();

  let dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("values"));
  const [id, setId] = useState("");
  const [name, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [loader,setLoader] = useState(false);

  useEffect(() => {
    setId(user.id);
    setUserName(user.name);
    setUserEmail(user.email);
    setUserPassword(user.password);
  }, []);

  const updateUser = async () => {
    if (
      name.toString().trim() !== "" &&
      email.toString().trim() !== "" &&
      password.toString().trim() !== ""
    ) {
        setLoader(true)
      let res = await dispatch(
        userUpdate(id, {
          id: id,
          name: name,
          email: email,
          password: password,
        })
      );
    //   console.log(res);
      localStorage.setItem("values", JSON.stringify(res));
      navigate("/profile");
      setErrorName(false);
      setErrorEmail(false);
      setErrorPassword(false);
      setLoader(false)
    }else if(email.toString().trim() === ""){
        setErrorEmail(true);
    } 
    else if(password.trim() === ""){
        setErrorPassword(true);
    } 
    else if(name.toString().trim() === ""){
        setErrorName(true);
    } 
  };

  return (
    <>
    <Card className={classes.card}>
      <h1>My Profile</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter email"
          />
          {errorName ? (
            <p style={{color:'red'}}>Please enter your name.</p>
          ) : (
            ""
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter email"
          />
          {errorEmail ? (
            <p style={{color:'red'}}>
              Please enter your email.
            </p>
          ) : (
            ""
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Password"
          />
          {errorPassword ? (
            <p style={{color:'red'}}>
              Please enter your password.
            </p>
          ) : (
            ""
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="button" onClick={updateUser}>
          Submit
        </Button>
      </Form>
    </Card>
    {loader&&<Loader/>}
    </>
  );
}
