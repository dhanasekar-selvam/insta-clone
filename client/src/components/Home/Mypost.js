import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import "../flex/flex.css"
import "./style.css"

import img from "../flex/images.jpeg";
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Carousel from "react-material-ui-carousel";
import { LinearProgress } from '@mui/material';

const Mypost = () => {
  const [posts, setPosts] = useState([]);
  const [stories,setStories]=useState([]);
  const { state } = useContext(userContext);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);


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
  
  const handleChange = (cur) => {
    setProgress(0);
    if(stories?.length===1 || (stories?.length)-1===cur)
    {
      handleClose();
    }
    setIndex(cur);
    console.log(cur);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    axios.get("/posts/mypost", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then(res => {
        //console.log(res.data.Posts);
        setPosts(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 30));
    }, 600);
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    console.log(state);
    if(state?._id){
    axios.get("/story/mystory/"+state?._id, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then(res => {
        console.log(res.data);
        setStories(res.data);
        //console.log(res);
      })

      .catch(err => console.log(err));
    
    }
  }, [])


  const likePost = (id) => {
    axios.put("/posts/like", { _id: id }, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then(res => {
       // console.log(res.data._id)
        //console.log(res._id)
        const newPost = posts.map(item => {
          if (item._id === res.data._id) {
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
                { stories.length>0 ?

                <div className='status-wrapper'>
                       
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
                : '' }
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
                            <p className='username'> <Link to={item?.postedBy._id !== state?._id?"/profile/"+item.postedBy._id: "/profile"}>{item.postedBy.fullname}</Link></p>
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
})
        }


</div>
      </section>

    </>
  )
}

export default Mypost