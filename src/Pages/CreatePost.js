import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BaseImage from "../Components/Layout/BaseImage";
import Button from "../Components/UI/Button";
import Card from "../Components/UI/Card";
import {
  getPostsById,
  postData,
  postEditData,
} from "../redux/actions/blog.action";
import classes from "./CreatePost.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function CreatePost() {
  let { type } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const [error, setError] = useState(false);

  const userdata = JSON.parse(localStorage.getItem("values"));
  let { editPostId } = useSelector((state) => state.editPostId);
  let { postsbyid, loading } = useSelector((state) => state.postsbyid);

  let dispatch = useDispatch();

  useEffect(() => {
    if (type === "edit") {
      dispatch(getPostsById(editPostId));
    }

    setTimeout(() => {
    //   console.log(postsbyid);
    }, 2000);
  }, []);
  useEffect(() => {
    if (type == "new") {
      setTitle("");
      setFeaturedImage("");
      setValue("");
      setSelectValue("");
    }
  }, [type]);

  useEffect(() => {
    if (type === "edit" && postsbyid && postsbyid.title) {
      setTitle(postsbyid.title);
      setFeaturedImage(postsbyid.featuredimg);
      setValue(postsbyid.content);
      setSelectValue(postsbyid.category);
    }
  }, [postsbyid]);

  const editData = async () => {
    let reponse = await dispatch(
      postEditData(postsbyid.id, {
        title: title,
        content: value,
        featuredimg: featuredImage,
        userId: userdata.id,
        username: userdata.name,
        category: JSON.parse(selectValue),
        date: new Date(),
      })
    );
    // console.log(reponse);
    navigate("/mypost");
    setError(false);
  };

  const saveData = async () => {
    if (title !== "" && selectValue !== "" && value !== "") {
      let reponse = await dispatch(
        postData({
          title: title,
          content: value,
          featuredimg: featuredImage,
          userId: userdata.id,
          username: userdata.name,
          clap: 0,
          category: JSON.parse(selectValue),
          date: new Date(),
        })
      );
    //   console.log(reponse);
      navigate("/mypost");
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];

  const imgModules = {
    toolbar: [["image"]],
  };

  let modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <>
      <Card className={classes.card}>
        <label className={classes.label}>Add Title</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
            setError(false);
          }}
        />
        {!title && error ? (
          <span style={{ color: "red" }}>Please enter a title</span>
        ) : (
          ""
        )}
        <br />
        <hr></hr>
        <label className={classes.label}>Featured Image</label>
        <BaseImage
          setFeaturedImage={setFeaturedImage}
          featuredImage={featuredImage}
        />
        <hr />
        <br />
        <label className={classes.label}>Category</label>
        <br />
        <select
          value={selectValue}
          onChange={(e) => {
            handleSelect(e);
            setError(false);
          }}
          className=" border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>Select Category</option>
          <option value="1">Programming</option>
          <option value="2">Data Science</option>
          <option value="3">Self Improvement</option>
          <option value="4">Technology</option>
          <option value="5">Others</option>
        </select>

        <br />
        {!selectValue && error ? (
          <span style={{ color: "red" }}>Please select a category</span>
        ) : (
          ""
        )}
        <hr />

        <label className={classes.label}>Content</label>
        <ReactQuill
          theme="snow"
          value={value}
          modules={modules}
          onChange={setValue}
          formats={formats}
        />
        {!value && error ? (
          <span style={{ color: "red" }}>Please enter content</span>
        ) : (
          ""
        )}
        <br />

        {/* <hr></hr>
      <h1>How it will look on the webpage</h1>
      <div dangerouslySetInnerHTML={{__html:value}} className="postDiv">
        </div>
      <hr></hr> */}

        <Button
          onClick={() => {
            if (type !== "new") {
              editData();
            } else {
              saveData();
            }
          }}
        >
          Publish
        </Button>

        {/* <Post/> */}
      </Card>
    </>
  );
}
