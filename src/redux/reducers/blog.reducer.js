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
  USER_SUCCESS,
} from "./action.types";

const initialState = {
  posts: [],
  postsbycategory: [],
  category: [],
  commentbyid: [],
  postsbyid: {},
  user: [],
  editPostId: "",
  loading: false,
  error: false,
  errorMessage: "",
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_DATA:
      return {
        ...state,
        loading:true
      };
    case BLOG_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading:false
      };
    case BLOG_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const postsByCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_DATA:
      return {
        ...state,
        loading:true
      };
    case BLOG_CATEGORY_SUCCESS:
      return {
        ...state,
        postsbycategory: action.payload,
        loading:false
      };
    case BLOG_CATEGORY_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };
    case CATEGORY_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const commentByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_SUCCESS:
      return {
        ...state,
        commentbyid: action.payload,
      };
    case COMMENT_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const postsByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_DATA:
      return {
        ...state,
        loading:true
      };
    case BLOG_ID_SUCCESS:
      return {
        ...state,
        postsbyid: action.payload,
        loading:false
      };
    case BLOG_ID_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case USER_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const editPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        editPostId: action.payload,
      };
    case EDIT_POST_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
