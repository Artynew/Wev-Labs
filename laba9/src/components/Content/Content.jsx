import { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLoginState } from "../../hooks/useLoginState";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { LoadingSpinner } from '../LoadingSpiner'; 

// Ленивые импорты
const FeedbackPage = lazy(() => import("../Feedback/FeedbackPage"));
const RegisterForm = lazy(() => import("../Login/RegisterForm"));
const LoginForm = lazy(() => import("../Login/LoginForm"));
const Profile = lazy(() => import("../Profile/Profile"));
const About = lazy(() => import("../About/About"));
const UserList = lazy(() => import("../Admin/UserList"));
const UserAdd = lazy(() => import("../Admin/UserAdd"));
const DeleteUser = lazy(() => import("../Admin/DeleteUser"));
const FeedbackAdmin = lazy(() => import("../Admin/FeedbackAdmin"));

function Content() {
  const isAuthenticated = useLoginState();

  return (
    <Router>
      <Header />
      <div className="mt-4 flex-grow-1">
        {/* Используем вынесенный LoadingSpinner */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <FeedbackPage /> : <RegisterForm />}
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about_me" element={<About />} />
            <Route path="admin">
              <Route path="users" element={<UserList />} />
              <Route path="users/add" element={<UserAdd />} />
              <Route path="users/delete" element={<DeleteUser />} />
              <Route path="users/feedback" element={<FeedbackAdmin />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default Content;
