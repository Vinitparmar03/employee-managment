import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./Pages/LoginSignup";
import EmployeeList from "./Pages/EmployeeList";
import AddEmployee from "./Pages/AddEmployee";
import UpdateEmployee from "./Pages/UpdateEmployee";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userExist, userNotExist } from "./Redux/Reducer/userReducer";
import axios from "axios";
import ProtectedRoute from "./Components/Protected Routes/ProtectedRoute";

function App() {
  const { user, loading } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/user/me", { withCredentials: true })
      .then(({ data }) => {
        dispatch(userExist(data.user));
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          dispatch(userNotExist());
        } else {
          console.error("Error fetching user data:", err);
        }
      });
  }, [dispatch]);

  return loading ? (
    <h1>loading...</h1>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={!user} redirect="/">
              <LoginSignup />
            </ProtectedRoute>
          }
        />

        <Route element={<ProtectedRoute isAuthenticated={user} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employeelist" element={<EmployeeList />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/updateemployee/:id" element={<UpdateEmployee />} />
        </Route>
      </Routes>

      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
