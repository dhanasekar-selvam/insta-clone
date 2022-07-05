import { Button } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userContext } from '../../App'

import "./style.css"
const Userprofile = () => {
    const profilepic="https://piceditorreview.com/wp-content/uploads/2021/10/Insta-pic-300x300.jpg"
    const [user,setUser] = useState(null)
    const {userid} = useParams()
    const {dispatch}=useContext(userContext)
    const [showFollow, setShowFollow]=useState(true);
const {state} =useContext(userContext)
//console.log(user)
//console.log(user?.user.followers.length)
console.log(state);
    useEffect(()=>{

        axios.get(`/user/profile/${userid}`,{headers:{ Authorization:"Bearer "+localStorage.getItem("token")}})
        .then(res=>{
            console.log(res);
            setUser(res.data);

            setTimeout(()=>{
                const  isFollow=  res?.data.user.followers.filter(item=>item===state?._id)
                 
                console.log(isFollow.length);
                if(isFollow?.length>0)
                {
                    setShowFollow(false)
                }
                else{
                    setShowFollow(true)
                }
            },1000)
            
            
        //    if(user?.length>0 && state?.length>0)
        //    {
            

                     //  }
           
            // {user?.user.followers.map(item=>{
            //     if(item===state.following)
            //     {
            //         console.log(item)
            //                      setShowFollow(false);
            //     }
               
            // })}
        }
        ).catch(err=>console.log(err))
        
            
        
     },[showFollow])    
     
     const followUser=()=>{
         axios.put("/user/follow",{followId:userid},{headers:{ Authorization:"Bearer "+localStorage.getItem("token")}})
         .then(res=>{
             console.log(res);
             dispatch({type:"UPDATE",payload:{following:res.data.following, followers:res.data.followers}})
             localStorage.setItem("user",JSON.stringify(res.data));

             setUser((prevState)=>{
                 return{
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,res._id]
                     }
                 }
             })
             setShowFollow(false)

             
         }
         ).catch(err=>console.log(err))
       
     }


     const unFollowUser=()=>{
        axios.put("/user/unfollow",{unfollowId:userid},{headers:{ Authorization:"Bearer "+localStorage.getItem("token")}})
        .then(res=>{
            console.log(res);
            dispatch({type:"UPDATE",payload:{following:res.data.following, followers:res.data.followers}});
            localStorage.setItem("user",JSON.stringify(res.data))

            setUser( (prevState)=>{
                const newFollower= prevState?.user.followers.filter(item=>item !==res.data._id)
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowFollow(true)


        }
        ).catch(err=>console.log(err))

      
    }

//     useEffect(()=>{
// axios.get("http://localhost:5000/posts/mypost",{headers:{Authorization: "Bearer "+localStorage.getItem("token")}})
// .then(res=>{
//    // console.log(res.data.myposts[0].photo)
//    //console.log(res.data)


//     useEffect(()=>{
// axios.get("http://localhost:5000/posts/mypost",{headers:{Authorization: "Bearer "+localStorage.getItem("token")}})
// .then(res=>{
//    // console.log(res.data.myposts[0].photo)
//    //console.log(res.data)
//    //console.log(state);
//     setPics(res.data);
//    // setProfile(res.data);
//     //console.log(mypics)
// })
// .catch(err=>console.log(err));
//     },[])
  return (
    <>

    <div style={{maxWidth:"800px" , margin:"0px auto"}}>
        <div style={{display:'flex', justifyContent:'space-around', margin:'18px 0px',borderBottom:"1px solid grey"}}>
            <div>
                <img style={{width:'160px' ,height:'160px', borderRadius:'80px'} } 
                alt=""
                src={profilepic}/>
            </div>
            <div>
    <h4>{user?.user.fullname}</h4>
    <div style={{display:'flex', justifyContent:'space-between', width:'108%'}}>
        <h4>{user?.posts.length} Posts</h4>
        <h4>{user?.user.followers.length} Followers</h4>
        <h4>{user?.user.following.length} Following</h4>

    </div>
   
    {showFollow?
    <Button variant="contained" style={{marginLeft:'200px'}} onClick={()=>{
        followUser()
    }} >
  Follow 
</Button>
:
<Button variant="contained" style={{marginLeft:'200px'}} onClick={()=>{
        unFollowUser()
    }} >
  Unfollow 
</Button>}
<br/>
<br/>

            </div>
        </div>

        <div className='gallery'>
            {user?.posts.map(item=>{
                return(
  <img key={item._id} className='item' src={item.photo} alt={item.title}/>
            )})}

            
            
          
            
            
        </div>
    </div>
    </>
                
  )
}

export default Userprofile