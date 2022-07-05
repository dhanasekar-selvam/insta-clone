import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import Icon from '@mui/material/Icon';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { toast } from "react-toastify";

const Post = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [storyloading, setStoryLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);



  const saveStory = "story";
  const savePost = "post";
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);
  const postSubmit = async (action) => {
    if (!title || !body || !image) {
      toast.error("Please Fill all Fields");
      setStoryLoading(false);
      setPostLoading(false);


      return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta_clone");
    data.append("cloud_name", "dybkynh4q")

    await axios.post("https://api.cloudinary.com/v1_1/dybkynh4q/image/upload", data)
      .then(res => {
        // console.log(res)
        console.log(res.data.url)

        const postData = {
          title,
          body,
          imgUrl: res.data.url,
        }
        if (res.data.url !== '') {
          if (action === "post") {

            axios.post("/posts/save", postData, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
              .then((res) => {
                console.log(res);
                setPostLoading(false);
                navigate("/home");
              }).catch((err) => console.log(err));
          }
          else {

            axios.post("/story/save", postData, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
              .then((res) => {
                console.log(res);
                setStoryLoading(false);
                navigate("/home");
              }).catch((err) => console.log(err));
          }
        }
      })
      .catch(err => console.log(err));
  }

  //console.log(postData)
  // setTimeout(()=>{
  //     if(url!==''){
  //     axios.post("/posts/save",{headers:{Authorization: "Bearer "+ localStorage.getItem("token") }},postData)
  //     .then((res)=>{
  //         console.log(res);
  //     navigate("/home");
  // })
  //     .catch((err)=>console.log(err));
  // }
  // },2000)
  //     }


  return (
    <>
      <div className="card input-filled createcard" >
        <h4 className=" #64b5f6 blue-text darken-1">Post Creation</h4>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ color: 'blue' }} />
        <input type="text" placeholder="Your Content" value={body} onChange={(e) => setBody(e.target.value)} />
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Upload Image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        {imageUrl && image && (
          <Box mt={2} textAlign="center">
            <div>Image Preview:</div>
            <img src={imageUrl} alt={image.name} height="200px" />
          </Box>
        )}



        {/* <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => postSubmit()}>

                    Submit Post
                </button> */}
        <br />

        <Stack spacing={2} direction="row">

          <LoadingButton
            size="small"
            color="primary"
            onClick={() => {
              setStoryLoading(true)
              postSubmit(saveStory)
            }
            }
            loading={storyloading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Add as Story
          </LoadingButton>
          <LoadingButton
            spacing={2}
            size="small"
            color="success"
            onClick={() => {
              setPostLoading(true)
              postSubmit(savePost)
            }
            } loading={postLoading}
            loadingPosition="start"
            startIcon={<Icon sx={{ color: green[500] }}>add_circle</Icon>
            }
            variant="contained"

          >
            Add as Post
          </LoadingButton>
        </Stack>
      </div>
    </>
  )
}

export default Post;