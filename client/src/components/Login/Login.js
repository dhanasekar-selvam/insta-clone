import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../../App";
import { Link } from "react-router-dom";
import "./style.css"
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch } = useContext(userContext);

  const loginSubmit = ((e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill all fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      const data = {
        email: email,
        password: password
      }
      axios.post("/user/signin", data).then(res => {
        // console.log(res);
        if (res.data != null) {
          // console.log(res.data.token)
          // console.log(res.data.user)

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user))
          dispatch({ type: "USER", payload: res.data.user })
          toast.success('Login Success', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/home")
        }
        else {
          toast.error('Invalid Email/Password', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }); navigate("/")
        }
      }).catch(err => {
        toast.error('User Not Found', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }); navigate("/")
      })
    }
  })


  return (
    <>

      <div className="container">
        <div className="mycard">
          <div className="card auth-card input-field ">
            <h2 className="brand-login">Instagram</h2>
            <div className="input-field">

              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">                       
             <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
              onClick={loginSubmit}
            >
              Login
            </button>


          </div>
        </div>
        <div className="mycard">
          <div className="card other-card">
            <p>Don't have an account?  <Link to="/signup" className="signup">Sign Up</Link></p>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
