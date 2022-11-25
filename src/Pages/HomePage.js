import React, { useEffect, useState } from "react";
import Section from "../Components/Layout/Section";
import Button from "../Components/UI/Button";
import Card from "../Components/UI/Card";
import classes from "./HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/blog.action";
import { slice } from "lodash";
import { Link } from "react-router-dom";
import Loader from "../Components/UI/Spinner";
import Badge from "react-bootstrap/Badge";

export default function HomePage() {
  let dispatch = useDispatch();

  const category = {
    1: "Programming",
    2: "Data Science",
    3: "Self Improvement",
    4: "Technology",
    5: "Others",
  };
  let { posts, loading } = useSelector((state) => state.posts);
  const [postLoad, setPostLoad] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(5);
  const initialPosts = slice(posts, 0, index);

  useEffect(() => {
    dispatch(getPosts());
    setPostLoad(posts);
    setTimeout(() => {
    //   console.log(posts);
    }, 5000);
  }, []);

  const loadMore = () => {
    setIndex(_=> _+ 5);
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
      <Section />
      <br />
      <br />
      <br />
      {loading === true ? (
        <>
          <Loader />
        </>
      ) : (
        initialPosts.map((post) => {
          return (
            <Card className={classes.card} key={post.id}>
              <div className={classes.header}>
                <img
                  src="https://www.shutterstock.com/image-vector/man-icon-flat-vector-260nw-1371568223.jpg"
                  alt="pic"
                  className={`${classes.img}`}
                />
                &nbsp;
                <h6>{post.username}</h6>
              </div>
              <br />
              <div className={classes.header}>
                <h2>
                  <Link to={`posts/${post.id}`}>{post.title}</Link>
                </h2>
              </div>
              {post.featuredimg ? (
                <img
                  src={post.featuredimg}
                  alt="pic"
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
                    ? Math.floor(countWords(post.content) / wpm) + " " + "min read"
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
      {loading && initialPosts.length>4 ? (
        <></>
      ) : (
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
      )}
    </>
  );
}
