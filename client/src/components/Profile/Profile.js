import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../App'
import "./style.css"
const Profile = () => {
    const profilepic="https://piceditorreview.com/wp-content/uploads/2021/10/Insta-pic-300x300.jpg"

    const [mypics,setPics]=useState([]);
    const {state}=useContext(userContext);
    console.log(state)
    useEffect(()=>{
axios.get("/posts/mypost",{headers:{Authorization: "Bearer "+localStorage.getItem("token")}})
.then(res=>{
   // console.log(res.data.myposts[0].photo)
   console.log(res.data)
   console.log(state);
    setPics(res.data);
    console.log(mypics)
})
.catch(err=>console.log(err));
    },[])
  return (
    <>
    <div style={{maxWidth:"800px" , margin:"0px auto"}}>
        <div style={{display:'flex', justifyContent:'space-around', margin:'18px 0px',borderBottom:"1px solid grey"}}>
            <div>
                <img style={{width:'160px' ,height:'160px', borderRadius:'80px'} } 
                alt=""
src={profilepic}/>            </div>
            <div>
    <h4>{state?state.username:"loading.."}</h4>
    <div style={{display:'flex', justifyContent:'space-between', width:'108%'}}>
        <h4>{mypics?.length} Posts</h4>
        <h4>{state?.followers.length} Followers</h4>
        <h4>{state?.following.length} Following</h4>
    </div>
            </div>
        </div>

        <div className='gallery'>
            {mypics.map(item=>{
                return(
  <img key={item._id} className='item' src={item.photo} alt={item.title}/>
            )})}
          
            
            
        </div>
    </div>
    </>
  )
}

export default Profile