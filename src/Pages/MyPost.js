import React, { useEffect, useState } from "react";
import Card from "../Components/UI/Card";
import classes from "./MyPost.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  editPostById,
  getPosts,
} from "../redux/actions/blog.action";
import { slice } from "lodash";
import { Link } from "react-router-dom";
import Button from "../Components/UI/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Loader from "../Components/UI/Spinner";
import Badge from "react-bootstrap/Badge";

export default function MyPost() {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let { posts, loading } = useSelector((state) => state.posts);

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (pos) => {
    setShow(true);
    setId(pos);
  };

  const category = {
    1: "Programming",
    2: "Data Science",
    3: "Self Improvement",
    4: "Technology",
    5: "Others",
  };

  const data = JSON.parse(localStorage.getItem("values"));

  useEffect(() => {
    dispatch(getPosts());

    setPostLoad(post);

    setTimeout(() => {
      //   console.log(post);
    }, 5000);
  }, []);
  let post = posts.filter((e) => e.userId === data.id);

  const [postLoad, setPostLoad] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(5);
  const initialPosts = slice(post, 0, index);

  const loadMore = () => {
    setIndex((_) => _ + 10);
    // console.log(index);
    if (index >= postLoad.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  function countWords(str) {
    return str.trim().split(/\s+/).length;
  }
  const wpm = 225;
  const editPost = (pos) => {
    dispatch(editPostById(pos));
    navigate("/createpost/edit");
  };

  const deletePostById = async () => {
    let res = await dispatch(deletePost(id));
    if (res) {
      dispatch(getPosts());
      handleClose();
    }
    // console.log(id);
    // console.log(res);
  };

  const options = { month: "short", day: "numeric" };
  return (
    <div className="container">
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        initialPosts.map((pos) => {
          return (
            <Card className={classes.card} key={pos.id}>
              <div className={classes.header}>
                <svg
                  className={`${classes.img}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {/* <img
                  src="https://www.shutterstock.com/image-vector/man-icon-flat-vector-260nw-1371568223.jpg"
                  alt="pic"
                  
                /> */}
                &nbsp;
                <p>{pos.username}</p>
              </div>
              <br />
              <div className={classes.header}>
                <h2>
                  <Link to={`/posts/${pos.id}`}>{pos.title}</Link>
                </h2>
              </div>
              {pos.featuredimg ? (
                <img
                  src={pos.featuredimg}
                  alt="No Image Found"
                  className={`${classes.featuredImg}`}
                />
              ) : (
                <div className={`${classes.featuredImg}`}>
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
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
              )}
              <div className={classes.body}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: pos.content.slice(0, 100) + "" + "...",
                  }}
                ></p>
                <span>
                  {new Date(pos.date).toLocaleDateString(undefined, options)}.{" "}
                  {countWords(pos.content) > "500"
                    ? Math.floor(countWords(pos.content) / wpm) +
                      " " +
                      "min read"
                    : "2 min read"}
                </span>
              </div>

              <div>
                <Badge bg="secondary">{category[pos?.category]}</Badge>{" "}
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  className={`${classes.btnPrimary} ${classes.dropdownToggle} `}
                  id={pos.id}
                  aria-expanded="false"
                  aria-labelledby="label-dropdown"
                >
                  ...
                </Dropdown.Toggle>
                <Dropdown.Menu className={classes.dropDownMenu}>
                  <Dropdown.Item onClick={() => editPost(pos.id)}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleShow(pos.id)}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card>
          );
        })
      )}
      {!loading && initialPosts.length > 4 ? (
        <div className={classes.actions}>
          {isCompleted ? (
            <Button
              onClick={loadMore}
              type="button"
              className={classes.actions}
            >
              That's It
            </Button>
          ) : (
            <Button
              onClick={loadMore}
              className={classes.actions}
              type="button"
            >
              Load More +
            </Button>
          )}
        </div>
      ) : (
        ""
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>No</Button>
          <Button className={classes.delete} onClick={deletePostById}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {initialPosts.length === 0 ? (
        <Card className={classes.card}>
          <h1>You Haven't Published anything yet. publish it now !!</h1>
          <Button>
            <Link to="/createpost/new">Publish</Link>
          </Button>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
}
