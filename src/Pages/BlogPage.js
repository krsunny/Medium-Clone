import React, { useEffect, useState } from "react";
import Button from "../Components/UI/Button";
import Card from "../Components/UI/Card";
import classes from "./BlogPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/blog.action";
import { slice } from "lodash";
import { Link } from "react-router-dom";
import Loader from "../Components/UI/Spinner";
import Badge from "react-bootstrap/Badge";

export default function BlogPage() {
  let dispatch = useDispatch();
  let { posts, loading } = useSelector((state) => state.posts);
  const [postLoad, setPostLoad] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(5);
  const initialPosts = slice(posts, 0, index);

  const category = {
    1: "Programming",
    2: "Data Science",
    3: "Self Improvement",
    4: "Technology",
    5: "Others",
  };

  useEffect(() => {
    dispatch(getPosts());

    setPostLoad(posts);
    setTimeout(() => {
    //   console.log(posts);
    }, 5000);
  }, []);

  const loadMore = () => {
    setIndex(_=>_+ 5);
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
  const options = { month: "short", day: "numeric" };

  return (
    <>
      <div style={{ textAlign: "center", fontSize: "25px" }}>
        <Badge bg="secondary">
          <Link to="/category/1">Programming</Link>
        </Badge>{" "}
        <Badge bg="secondary">
          <Link to="/category/2">Data Science</Link>
        </Badge>{" "}
        <Badge bg="secondary">
          <Link to="/category/3">Self Improvemnt</Link>
        </Badge>{" "}
        <Badge bg="secondary">
          <Link to="/category/4">Technology</Link>
        </Badge>{" "}
        <Badge bg="secondary">
          <Link to="/category/5">Others</Link>
        </Badge>{" "}
      </div>
      {loading === true ? (
        <>
          <Loader />
        </>
      ) : (
        initialPosts.map((post) => {
          return (
            <Card className={classes.card} key={post.id}>
              <div className={classes.header}>
              <svg className={`${classes.img}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
                &nbsp;
                <p>{post.username}</p>
              </div>
              <br />
              <div className={classes.header}>
                <h2>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
              </div>
              {post.featuredimg ? (
                <img
                  src={post.featuredimg}
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
                    __html: post.content.slice(0, 100) + "" + "...",
                  }}
                ></p>
                <span>
                  {new Date(post.date).toLocaleDateString(undefined, options)}.{" "}
                  {countWords(post.content) > "500"
                    ? Math.floor(countWords(post.content) / wpm) +
                      " " +
                      "min read"
                    : "2 min read"}
                </span>
              </div>
              <div>
                <Badge bg="secondary">{category[post?.category]}</Badge>{" "}
              </div>
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
      {initialPosts.length === 0 ? (
        <Card className={classes.card}>
          <h1>No post available !!</h1>
        </Card>
      ) : (
        ""
      )}
    </>
  );
}
