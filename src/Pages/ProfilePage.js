import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../Components/UI/Card";
import classes from "./ProfilePage.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { userUpdate } from "../redux/actions/blog.action";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  let navigate = useNavigate();

  let dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("values"));
  const [id, setId] = useState("");
  const [name, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");

  useEffect(() => {
    setId(user.id);
    setUserName(user.name);
    setUserEmail(user.email);
    setUserPassword(user.password);
  }, []);

  const updateUser = async () => {
    let res = await dispatch(
      userUpdate(id, {
        id: id,
        name: name,
        email: email,
        password: password,
      })
    );
    console.log(res);
    localStorage.setItem("values", JSON.stringify(res));
    navigate("/profile");
  };

  return (
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
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="button" onClick={updateUser}>
          Submit
        </Button>
      </Form>
    </Card>
  );
}
