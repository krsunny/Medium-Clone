import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  categoryReducer,
  commentByIdReducer,
  editPostReducer,
  postsByCategoryReducer,
  postsByIdReducer,
  postsReducer,
  userReducer,
} from "./reducers/blog.reducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  postsbycategory: postsByCategoryReducer,
  category: categoryReducer,
  commentbyid: commentByIdReducer,
  postsbyid: postsByIdReducer,
  user: userReducer,
  editPostId: editPostReducer,
});
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
