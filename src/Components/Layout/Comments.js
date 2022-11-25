import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./Comments.module.css";
import Form from "react-bootstrap/Form";
import Button from "../UI/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCommentsById, postComment } from "../../redux/actions/blog.action";

export default function Comments({ initialComment }) {
  let { id } = useParams();
  let navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  let dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("values"));
  const options = { month: "short", day: "numeric" };

  function getTime(d) {
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    var ampm = "am";
    if (hr > 12) {
      hr -= 12;
      ampm = "pm";
    }
    return hr + ":" + min + ampm;
  }

  const commentData = async () => {
    if (value !== "") {
      let reponse = await dispatch(
        postComment({
          body: value,
          clap: 0,
          userId: user.id,
          username: user.name,
          date: new Date(),
          postId: id,
        })
      );
    //   console.log(reponse);
      navigate(`/posts/${id}`);
      setValue("");
      dispatch(getCommentsById(id));
    } else {
      setError(true);
    }
  };

  return (
    <>
      {user ? (
        <Form className={classes.card}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="textarea"
              placeholder="Comment"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
            />
          </Form.Group>
          {error ? (
            <p style={{ color: "red" }}>Please enter comment to publish.</p>
          ) : (
            ""
          )}
          <Button type="button" onClick={commentData}>
            Submit
          </Button>
        </Form>
      ) : (
        <Form className={classes.card}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="textarea"
              disabled
              placeholder="Comment"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
            />
          </Form.Group>
          {error ? (
            <p style={{ color: "red" }}>Please enter comment to publish.</p>
          ) : (
            ""
          )}
          <Button disabled type="button" onClick={commentData}>
            Submit
          </Button>
        </Form>
      )}
      {initialComment.map((comment) => {
        return (
          <Card className={classes.card} key={comment.id}>
            <div className={classes.header}>
              <img
                src="https://www.shutterstock.com/image-vector/man-icon-flat-vector-260nw-1371568223.jpg"
                alt="pic"
                className={`${classes.img}`}
              />
              &nbsp;
              <div>
                <h6>{comment.username}</h6>
                <span className={classes.body} style={{fontSize:'15px'}}>
                  {new Date(comment.date).toLocaleDateString(
                    undefined,
                    options
                  )}&nbsp;
                  {getTime(new Date(comment.date))}
                </span>
              </div>
            </div>
            <br />
            <div className={classes.header}>
              <h6 style={{fontStyle:'italic',marginLeft:'20px',marginTop:'15px',fontSize:"20px"}}>{`"${comment.body}"`}</h6>
            </div>
            <br />
            {/* <div className={classes.header}>
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
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
                {comment.clap}
              </svg>
              {comment.clap}
              &nbsp;
            </div>
            <div className={classes.edit}>
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
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div> */}
          </Card>
        );
      })}
    </>
  );
}
