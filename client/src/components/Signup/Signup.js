import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../Login/style.css"
const Signup = () => {
  //const { addUser ,users} = useContext(TaskContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [userFound, setUserFound] = useState(false);
  const navigate = useNavigate();
  const signupSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !username || !fullname) {
      toast.warning('Please fill all the fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    } else {


      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        toast.error("Invalid Email")
        return;
      }
      //adduser
      const data = {
        username: username,
        email: email,
        password: password,
        fullname: fullname,

      }


      axios.get(`/user/${email}`).then((res) => {
        console.log(res);
        setUserFound(true);
      }).catch((err) => {
        console.log(err)
      });




      if (!userFound) {
        axios.post("/user/signup", data).then((res) => {
          console.log(res);
          toast.success('Success', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setEmail("")
          setFullname("")
          setPassword("")
          setUsername("")
          navigate("/");
        }).catch((err) => { console.log(err) })
      }
      else {
        toast.warning('user already found', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="mycard-signup">
          <div className="card auth-card input-field ">
            <div className="separator">
              <h2 className="hint">Signup to see photos and Videos from your friends</h2>
            </div>
            <div className="input-field">

              <input
                type="text"
                id="email"
                
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>

            </div>


            <div className="input-field">

              <input
                id="fullname"
                type="text"
                
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <label htmlFor="fullname">Full Name</label>

            </div>

            <div className="input-field">

              <input

                id="username"
                type="text"

                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username">User Name</label>

            </div>
            <div className="input-field">

              <input id="password" type="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password">Password</label>
            </div>
            <button className="login-button btn waves-effect waves-light #64b5f6 blue darken-1" title="signup" onClick={signupSubmit}>Sign up</button>

            <div className="separator">
              <br />
              <h4 className="hint1">By signing up, you agree to our Terms ,  Data Policy and Cookies Policy .</h4>

            </div>

          </div>

        </div>
        <div className="mycard">
          <div className="card other-card">
            <p>Have an account?  <Link to="/" className="login">Log In</Link></p>
          </div>
        </div>
      </div>

    </>
  );
};

export default Signup;

{/* <div className="container">
      <div className="box">
        <div className="heading"></div>
        <div className="separator">
            <h2>Signup to see photos and Videos from your friends</h2>
          </div> <br/>  
        <form className="login-form" onSubmit={signupSubmit}>
         
          <div className="field">
            <input
              id="email"
              type="name"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="field">
            <input
              id="fullname"
              type="name"
              placeholder="Full Name"
              value={fullname}
              onChange={(e)=>setFullname(e.target.value)}
            />
            <label htmlFor="fullname">Full Name</label>
          </div> <div className="field">
            <input
              id="username"
              type="name"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="field">
            <input id="password" type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <label htmlFor="password">Password</label>
          </div>
            <button className="login-button" title="login">Sign up</button>
            
            
          {/* <div className="other">
           
            <a className="forgot-password" href="#">Forgot password?</a>
          </div> */}
//         </form>
//         <div className="separator">
//             <br/>
// <h4>By signing up, you agree to our Terms ,  Data Policy and Cookies Policy .</h4>

//             </div>
//       </div>
//       <div className="box">
//         <p>Have an account? <a className="signup" href="" onClick={()=>navigate("/")}>Log in</a></p>
//       </div>
//     </div> */}