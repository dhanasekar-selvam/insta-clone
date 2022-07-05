import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { userContext } from '../../App';
import "../flex/flex.css";
import Tooltip from '@mui/material/Tooltip';

const Navbar = () => {   
    const {dispatch}=useContext(userContext)
    const navigate=useNavigate(); 
    const logout=()=>{
        console.log("came")
        localStorage.clear();
        dispatch({type:"CLEAR"})
        toast.success("logout successfully")
        navigate("/")

    }
    var url="";
  return (
<>
{/* <nav>
    <div className="nav-wrapper white black-text ">
        <div className='title'>
      <Link to="/home"  className="brand-logo logo left ">Instagram</Link>
      </div>
      <ul id="nav-mobile" className="right ">
      <li> <Link to="/home">Home</Link></li>

     <li> <Link to="/create">Create Post</Link></li>
        <li><Link to="/mine">My Posts</Link></li>
        <li><Link to="/profile">Profile</Link></li>     
        <li><a className="#e53935 red-text darken-1"onClick={logout}>Logout</a></li>      

         </ul>

    </div>
  </nav> */}
  <ul className="nav">
                <Link to="/home" className="brand-logo  ">Instagram</Link>
                <input type="text" className='inputsearch' placeholder="Search.."/>
                <li>

                  <Link to="/home">
                  <Tooltip title="Home">
<i className="material-icons">home</i>
</Tooltip>

</Link>

                  </li>

                <li><Link to="/create">
                <Tooltip title="Create">

                  <i className="material-icons">add_box</i>
                  </Tooltip>

                  </Link></li>


                <li><Link to="/mine">
                <Tooltip title="My Posts">
                  
                  <i className="material-icons">person</i>
                </Tooltip>
                  
                  </Link></li>


                <li>
                  
                  <Link to="/myfollowerspost">
                <Tooltip title="Myfollowers">
                    <i className="material-icons">person_add</i>
                </Tooltip>
                    
                    </Link></li>


                <li><Link to="/profile">
                <Tooltip title="profile">

                  <i className="material-icons">account_circle</i>
                </Tooltip>
                  
                  </Link></li>

                <li>
                  <a href={url} className="#e53935 red-text darken-1"onClick={logout}>
                <Tooltip title="Logout">
                    
                    <i className="material-icons">logout</i>
                </Tooltip>
                    
                    </a></li>      



            </ul>

</>  )
}

export default Navbar