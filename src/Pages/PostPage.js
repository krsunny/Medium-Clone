import React, { useEffect, useState } from "react";
import Comments from "../Components/Layout/Comments";
import Card from "../Components/UI/Card";
import classes from "./PostPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {
  getCommentsById,
  getPostsById,
  updateClap,
} from "../redux/actions/blog.action";
import { slice } from "lodash";
import Button from "../Components/UI/Button";
import Loader from "../Components/UI/Spinner";

export default function PostPage() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("values"));

  const [clap, setClap] = useState(0);
  const [myclap, setMyClap] = useState(0);

  let { commentbyid } = useSelector((state) => state.commentbyid);
  let { postsbyid, loading } = useSelector((state) => state.postsbyid);

  const [loadComment, setLoadComment] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(10);
  const initialComment = slice(commentbyid, 0, index);
  const options = { month: "short", day: "numeric" };

  useEffect(() => {
    dispatch(getCommentsById(id));
    dispatch(getPostsById(id));
    setLoadComment(commentbyid);
    setTimeout(() => {
      //   console.log(postsbyid);
    }, 2000);
  }, []);

  useEffect(() => {
    setClap(postsbyid.clap);
  }, [postsbyid]);

  const incrementClap = () => {
    // console.log("Hi");
    setClap((_) => _ + 1);
    setMyClap((_) => _ + 1);
    dispatch(
      updateClap(id, {
        clap: clap + 1,
      })
    );
  };

  const clearClap = () => {
    if (myclap > 0) {
      setClap((_) => _ - myclap);
      setMyClap(0);
      dispatch(
        updateClap(id, {
          clap: clap - myclap,
        })
      );
    }
  };

  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }
  const wpm = 225;

  const loadMore = () => {
    setIndex(index + 10);
    // console.log(index);
    if (index >= loadComment.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <Card className={classes.card}>
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
            <h1>{postsbyid.username}</h1>{" "}
          </div>
          <br />
          &nbsp;
          <div>
            <h2>{postsbyid.title}</h2>
            <span className={classes.body}>
              {new Date(postsbyid.date).toLocaleDateString(undefined, options)}.{" "}
              {countWords(postsbyid.content) > "500"
                ? Math.floor(countWords(postsbyid.content) / wpm) +
                  " " +
                  "min read"
                : "2 min read"}
            </span>
          </div>
          <br />
          <br />
          <div>
            <p dangerouslySetInnerHTML={{ __html: postsbyid.content }}></p>
          </div>
          {user && user.id !== postsbyid.userId ? (
            <>
              <div className={classes.header}>
                <button className={classes.glowOnHover} >
                  <svg tabIndex="0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`"w-6 h-6" `}
                    onClick={incrementClap}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>
                </button>
                <br />

                {/* <button onClick={clearClap}>Clear</button> */}
              </div>
              <br />
              <div
                style={{ color: "grey", marginLeft: "20px", fontSize: "20px" }}
              >
                {clap}
              </div>
              <div style={{ float: "right" }}>
                <Dropdown>
                  <Dropdown.Toggle
                    className={`${classes.btnPrimary} ${classes.dropdownToggle} `}
                    style={{ float: "right" }}
                    id="dropdown-basic"
                  >
                    ...
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={classes.dropDownMenu}>
                    <Dropdown.Item onClick={clearClap}>
                      Remove clap
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </>
          ) : null}
        </Card>
      )}
      <Comments initialComment={initialComment} />
      {!user ? (
        <></>
      ) : initialComment.length > 0 ? (
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
      ) : null}
    </>
  );
}
