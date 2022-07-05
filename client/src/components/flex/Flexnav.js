import React from 'react'
import { Link } from 'react-router-dom'
import "./flex.css"
import img from "./images.jpeg";
const Flexnav = () => {
    return (
        <>

            <ul className="nav">
                <Link to="/home" className="brand-logo  ">Instagram</Link>
                <input type="text" className='inputsearch' placeholder="Search.."/>
                <li><i className="material-icons">home</i></li>
                <li><i className="material-icons">add_box</i></li>

                <li><i className="material-icons">person</i></li>
                <li><i className="material-icons">account_circle</i></li>


            </ul>

            <section className='main'>
                <div className='wrapper'>
                    {/* <div className='left-col'> */}
                        <div className='status-wrapper'>
                            <div className='status-card'>
                                <div className='profile-pic'><img src={img} alt="" /></div>
                                <p className='username'>username</p>
                            </div>
                            <div className='status-card'>
                                <div className='profile-pic'><img src={img} alt="" /></div>
                                <p className='username'>username</p>
                            </div><div className='status-card'>
                                <div className='profile-pic'><img src={img} alt="" /></div>
                                <p className='username'>username</p>
                            </div><div className='status-card'>
                                <div className='profile-pic'><img src={img} alt="" /></div>
                                <p className='username'>username</p>
                            </div><div className='status-card'>
                                <div className='profile-pic'><img src={img} alt="" /></div>
                                <p className='username'>username</p>
                            </div><div className='status-card'>
                                <div className='profile-pic'><img src={img} alt="" /></div>
                                <p className='username'>username</p>
                            </div><div className='status-card'>
                                <div className='profile-pic'><img src={img} alt="" /></div>
                                <p className='username'>username</p>
                            </div>
                        </div>

                        <div className='post'>
                            <div className='info'>
                                <div className='user'>
                                    <div className='profile-pic'>
                                        <img src={img} alt="img" />
                                    </div>
                                    <p className='username' >Dhanasekar</p>
                                </div>
                                <i class="material-icons">  more_horiz
                                </i>
                            </div>
                            <img src={img} className="post-image" alt="" />
                            <div className='post-content'>
                                <div className='reaction-wrapper'>
                                    <i class="material-icons" >favorite</i>

                                </div>
                                <p className='likes'>102 Likes</p>
                                <p className='description'>
                                    <span>username</span>
                                    lorem
                                </p>
                                <p className='post-time'>2 min</p>
                            </div>
                            {/* <div className='comment-wrapper'>
                                <i class="material-icons icon">  comment</i>
                                <input type="text" className='comment-box' placeholder='add a comment' />
                                <button className='comment-btn'>Post</button>
                            </div> */}
                        </div>
                        <div className='post'>
                            <div className='info'>
                                <div className='user'>
                                    <div className='profile-pic'>
                                        <img src={img} alt="img" />
                                    </div>
                                    <p className='username' >Dhanasekar</p>
                                </div>
                                <i class="material-icons">  more_horiz
                                </i>
                            </div>
                            <img src={img} className="post-image" alt="" />
                            <div className='post-content'>
                                <div className='reaction-wrapper'>
                                    <i class="material-icons" >favorite</i>

                                </div>
                                <p className='likes'>102 Likes</p>
                                <p className='description'>
                                    <span>username</span>
                                    lorem
                                </p>
                                <p className='post-time'>2 min</p>
                            </div>
                            {/* <div className='comment-wrapper'>
                                <i class="material-icons icon">  comment</i>
                                <input type="text" className='comment-box' placeholder='add a comment' />
                                <button className='comment-btn'>Post</button>
                            </div> */}
                        </div>
                    {/* </div> */}

                    {/* <div className='rigt-col'>

                    </div> */}
                </div>
            </section>
        </>)
}

export default Flexnav