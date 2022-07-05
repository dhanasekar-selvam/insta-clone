import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { Routes, Route, useNavigate } from "react-router-dom"
import Home from './components/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/Profile/Profile';
import Post from './components/Post/Post';
import { useEffect, useReducer, createContext, useContext } from 'react';
import { initialstate, reducer } from './reducers/userReducer';
import Navbar from './components/Navbar/Navbar';
import Mypost from './components/Home/Mypost';
import Userprofile from './components/Profile/Userprofile';
import Flexnav from './components/flex/Flexnav';
import SubscribeUserPost from './components/Home/SubscribeUserPost';

export const userContext = createContext();


const Routing = () => {
  const navigate = useNavigate();
  const {  dispatch } = useContext(userContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user })
    }
    else {
      navigate("/");
    }
  }, [])
  return (
    <>
      <ToastContainer />

      <Routes>

        <Route path="/" element={
          <Login />
        } />
        <Route path="/signup" element={
          <Signup />
        } />
        <Route path="/home" element={
          <>
          <Navbar/>
            <Home />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Navbar />

            <Profile />
          </>
        } />
        <Route path="/create" element={
          <>
            <Navbar />

            <Post />
          </>

        } />
          <Route path="/myfollowerspost" element={
          <>
            <Navbar />

            <SubscribeUserPost />
          </>

        } />
         <Route path="/mine" element={
          <>
            <Navbar />
            <Mypost />
          </>

        } />
          <Route path="/profile/:userid" element={
          <>
            <Navbar />
            <Userprofile />
          </>

        } />
         <Route path="/nav" element={
          <>
            <Flexnav />
          </>

        } />
        
      </Routes>
    </>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialstate)


  return (
    <div className="App">
      <userContext.Provider value={{ state, dispatch }}>
        <Routing />
      </userContext.Provider>
    </div>
  );
}

export default App;
