import {
  BLOG_CATEGORY_FAILURE,
  BLOG_CATEGORY_SUCCESS,
  BLOG_FAILURE,
  BLOG_ID_FAILURE,
  BLOG_ID_SUCCESS,
  BLOG_SUCCESS,
  CATEGORY_FAILURE,
  CATEGORY_SUCCESS,
  COMMENT_FAILURE,
  COMMENT_SUCCESS,
  EDIT_POST_FAILURE,
  EDIT_POST_SUCCESS,
  GETTING_DATA,
  USER_FAILURE,
  USER_POST_FAILURE,
  USER_POST_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_SUCCESS,
  USER_SUCCESS,
} from "../reducers/action.types";

const blog = () => `http://localhost:3000/posts?_sort=date&_order=desc`;
const blogById = (id) => `http://localhost:3000/posts/${id}`;

const blogByCategory = (categoryId) =>
  `http://localhost:3000/posts?category_like=${categoryId}&_sort=date&_order=desc`;

const Categories = () => `http://localhost:3000/category`;

const comment = () => `http://localhost:3000/comments`;

const getComments = (id) =>
  `http://localhost:3000/comments?postId=${id}&_sort=date&_order=desc`;

const getUser = () => `http://localhost:3000/user`;
const user = () => `http://localhost:3000/user`;
const postdata = () => `http://localhost:3000/posts`;
const updateUser = (id) => `http://localhost:3000/user/${id}`;

export const getPosts = () => async (dispatch) => {
    dispatch({type:GETTING_DATA})
  try {
    let response = await fetch(blog());
    let data = await response.json();
    dispatch({
      type: BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: BLOG_FAILURE,
      payload: error.message,
    });
  }
};

export const getBlogByCategory = (categoryId) => async (dispatch) => {
    dispatch({type:GETTING_DATA})
  try {
    let response = await fetch(blogByCategory(categoryId));
    let data = await response.json();
    dispatch({
      type: BLOG_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: BLOG_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};

export const getCategory = () => async (dispatch) => {
  try {
    let response = await fetch(Categories());
    let data = await response.json();
    dispatch({
      type: CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};

export const getCommentsById = (id) => async (dispatch) => {
  try {
    let response = await fetch(getComments(id));
    let data = await response.json();
    dispatch({
      type: COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: COMMENT_FAILURE,
      payload: error.message,
    });
  }
};

export const getPostsById = (id) => async (dispatch) => {
    dispatch({type:GETTING_DATA})
  try {
    let response = await fetch(blogById(id));
    let data = await response.json();
    dispatch({
      type: BLOG_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: BLOG_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    let response = await fetch(getUser());
    let data = await response.json();
    dispatch({
      type: USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_FAILURE,
      payload: error.message,
    });
  }
};

export const postUser = (values) => async (dispatch) => {
  try {
    let req = await fetch(user(values), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let data = await req.json();
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error.message,
    });
  }
};

export const postData = (values) => async (dispatch) => {
  try {
    let req = await fetch(postdata(values), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let data = await req.json();
    dispatch({
      type: USER_POST_SUCCESS,
      payload: data,
    });
    return "success";
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_POST_FAILURE,
      payload: error.message,
    });
    return "failure";
  }
};

export const postEditData = (id, values) => async (dispatch) => {
  try {
    let req = await fetch(blogById(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let data = await req.json();
    console.log(data);
    return "success";
  } catch (error) {
    console.log(error);
    return "failure";
  }
};

export const editPostById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_POST_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_POST_FAILURE,
      payload: error.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    let req = await fetch(blogById(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    let data = await req.json();
    console.log(data);
    return "success";
  } catch (error) {
    console.log(error);
    return "failure";
  }
};

export const postComment = (commentData) => async (dispatch) => {
  try {
    let req = await fetch(comment(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    let data = await req.json();
    console.log(data);
    return "success";
  } catch (error) {
    console.log(error);
    return "failure";
  }
};

export const userUpdate = (id, values) => async (dispatch) => {
  try {
    let req = await fetch(updateUser(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let data = await req.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return "failure";
  }
};

export const updateClap = (id, values) => async (dispatch) => {
  try {
    let req = await fetch(blogById(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let data = await req.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return "failure";
  }
};
