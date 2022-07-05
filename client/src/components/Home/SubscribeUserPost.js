import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import "../flex/flex.css" 
import "./style.css"

import { userContext } from '../../App';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Carousel from "react-material-ui-carousel";
import { LinearProgress } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 800,
  bgcolor: 'text.secondary',
 
  p: 4,
  color:'white'
};


const SubscribeUserPost = () => {
  const img="https://piceditorreview.com/wp-content/uploads/2021/10/Insta-pic-300x300.jpg"
  const [index, setIndex] = useState(0);
  const handleChange = (cur) => {
    if (stories?.length === 1 || (stories?.length) - 1 === cur) {
      setTimeout(()=>{
       handleClose();
      },3000)
     }
    setIndex(cur);
   // console.log(cur);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () =>{
    setProgress(0);
     setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);

  const { state } = useContext(userContext);

  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 250);
setProgress(0);
    return () => {
      clearInterval(timer);
    };
  }, [index]);

  useEffect(() => {
    axios.get("/posts/getsubpost", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
        //console.log(res);
      })
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get("/story/myfollowers",{ headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then(res => {
        console.log(res);
        setStories(res.data);
        //console.log(res);
      })
      .catch(err => console.log(err));
  }, [])

  const likePost = (id) => {
    axios.put("/posts/like", { _id: id }, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then(res => {
       // console.log(res.data._id)
        //console.log(res._id)
        const newPost = posts.map(item => {
          if (item._id === res.data._id) {
            console.log(res.data);
            return res.data
          }
          else {
            return item
          }
        })
        setPosts(newPost) 
      }).catch(err => console.log(err))
  }

  const unLikePost = (id) => {
    axios.put("/posts/unlike", { _id: id }, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then(res => {
        // console.log(res.data._id)
        const newPost = posts.map((item) => {
          if (item._id === res.data._id) {
            console.log(res.data)
            return res.data
          }
          else {
            return item
          }
        })
        setPosts(newPost)
      })
      .catch(err => console.log(err))
  }

  const deletePost=(postid)=>{
   
    axios.delete(`/posts/delete/${postid}`,
    {headers:{Authorization: "Bearer "+localStorage.getItem("token")}})
    .then(res=>{
      console.log(res)
      const newPost=posts.filter(item=>{
        return item._id!==res.data._id
      })
      setPosts(newPost);
    })
    .catch(err=>console.log(err))
    }

  
  return (
    <>

      {/* <div className='home'> */}
        {/* {posts.length === 0 && <h4>No Posts available </h4>}
        {
          posts.map(item => {
            console.log(item)
            return (
              <div className='card home-card'>
                <h5><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id: "/profile"}>{item.postedBy.fullname}</Link> {item.postedBy._id === state._id && (<i className="material-icons right"   onClick={() => deletePost(item._id)} >delete</i>)}</h5>
                <div className='card-image'>
                  <img src={item.photo} alt="post" onDoubleClick={()=>likePost(item._id)}/>

                </div>
                <div className='card-content'>
                  {item.likes.includes(state._id) ?
                                    <i className="material-icons" style={{color:'red'} } onClick={() => unLikePost(item._id)} >favorite</i>
                    :
                    <i className="material-icons" onClick={() => likePost(item._id)}  >favorite</i>
                    }

                  <h6>{item.likes.length} Likes</h6>

                  <h6>{item.title}</h6>
                  <p>{item.body}</p>
                </div>
              </div>
            )
          })
        } */}
 <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Carousel
        index={index}
        onChange={
          handleChange
        }
        interval={3000}
        animation="slide"
        indicators={false}
        stopAutoPlayOnHover
        swipe
        className="my-carousel"
      >
        {stories?.map((item,index) => {

          return(
            <>
            
                             {handleOpen &&( <LinearProgress variant="determinate" value={progress} />)}

            <h6>{item.postedBy?.fullname}</h6>
            <img key={index} src={item?.photo} alt={item?.title} className="img-size"/>
            <p>{item?.title}</p>
            <p>{item?.body}</p>

            </>
          )
          
          })}

      </Carousel>
        </Box>
      </Modal>




     

            <section className='main'>
                <div className='wrapper'>
                    {/* <div className='left-col'> */}
                    {stories?.length>0 ?
                        <div className='status-wrapper'>
                        {/* <div className='status-card'>
                                <div className='new-pic'>  <i className="material-icons"    >add</i>

 </div>

                                <p className='username'>new</p>
                            </div> */}
                            {stories?.map(item=>{
                              return(
                                                            <div className='status-card'>
                              <div className='profile-pic'><img src={item?.photo} alt=""  onClick={handleOpen}/></div>
                                  <p className='username'>{item.postedBy.fullname}</p>
                            </div>
                              )
                            })
                          }
           
                        </div>
:''}
                               {posts?.length === 0 && <h4>No Posts available </h4>} 

{posts.map(item=>{  
              return (

  <>
                        <div className='post'>
                            <div className='info'>
                                <div className='user'>
                                    <div className='profile-pic'>
                                        <img src={img} alt="img" />
                                    </div>
                                    <p className='username' > <Link to={item?.postedBy._id !== state?._id?"/profile/"+item.postedBy._id: "/profile"}>{item.postedBy.fullname}</Link></p>
                                </div>
                                {item?.postedBy._id === state?._id && (<i className="material-icons"   onClick={() => deletePost(item._id)} >delete</i>)}
                               
                            </div>
                            <img src={item.photo} className="post-image" alt="" />
                            <div className='post-content'>
                                <div className='reaction-wrapper'>
                                {item.likes.includes(state._id) ?
                                    <i className="material-icons" style={{color:'red'} } onClick={() => unLikePost(item._id)} >favorite</i>
                    :
                    <i className="material-icons" onClick={() => likePost(item._id)}  >favorite</i>
                    }
                                </div>
                                <p className='likes'>{item.likes.length} Likes</p>
                                <p className='description'>
                                    <span>{item.title}</span>
                                    {item.body}                                </p>
                                {/* <p className='post-time'>2 min</p> */}
                            </div>
                            {/* <div className='comment-wrapper'>
                                <i class="material-icons icon">  comment</i>
                                <input type="text" className='comment-box' placeholder='add a comment' />
                                <button className='comment-btn'>Post</button>
                            </div> */}
                    
                        </div>
                        </>
              )
})}

                    
                </div>
            </section>
            {/* </div> */}


    </>
  )
}

export default SubscribeUserPost