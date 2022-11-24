import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import { Routes, Route, Navigate } from "react-router-dom";
import React from 'react';
import ErrorPage from './Pages/ErrorPage';
import Header from './Components/Header/Header';
import Require from './Pages/Require';
import Loader from './Components/UI/Spinner';


function App() {
  const Posts = React.lazy(() => import("./Pages/PostPage"));
  const Category = React.lazy(() => import("./Pages/CategoryPage"));
  const Blog = React.lazy(() => import("./Pages/BlogPage"));
  const CreatePost = React.lazy(() => import("./Pages/CreatePost"));
  const Profile = React.lazy(() => import("./Pages/ProfilePage"));
  const Mypost = React.lazy(() => import("./Pages/MyPost"));






  return (
    <div className="container-fluid">
            <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="posts/:id"
          element={
            <React.Suspense fallback={<><Loader/></>}>
              <Posts/>
            </React.Suspense>
          }
        />
        <Route
          path="category/:id"
          element={
            <React.Suspense fallback={<><Loader/></>}>
              <Category/>
            </React.Suspense>
          }
        />
        <Route element={<Require/>}>
        <Route
          path="blog"
          element={
            <React.Suspense fallback={<><Loader/></>}>
              <Blog/>
            </React.Suspense>
          }
        />
        <Route
          path="createpost/:type"
          element={
            <React.Suspense fallback={<><Loader/></>}>
              <CreatePost/>
            </React.Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <React.Suspense fallback={<><Loader/></>}>
              <Profile/>
            </React.Suspense>
          }
        />
        <Route
          path="mypost"
          element={
            <React.Suspense fallback={<><Loader/></>}>
              <Mypost/>
            </React.Suspense>
          }
        />
        </Route>

        <Route path="404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
    
  );
}

export default App;
