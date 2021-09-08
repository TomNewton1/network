import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import { getUserPosts } from '../../../../../actions/posts';

import './UserProfile.css'

import Button from '../../../../button/Button'
import { RiCake2Line } from 'react-icons/all'

import Avatar from "../../../../../assets/avatar_default.png"

export default function UserProfile() {
    
    // Get user profile join date 
    const date_joined = useSelector((state) => state.posts.userPosts.date)
    const date_joined_updated = date_joined.substring(1, date_joined.length-1);

    // Get user profile followers
    const followers = useSelector((state) => state.posts.userPosts.followers)

    // Get user profile following
    const following = useSelector((state) => state.posts.userPosts.following)

    // Get user profile username
    const username = useSelector((state) => state.posts.userPosts.username)

    // Get logged in user id 
    const user_id = useSelector((state) => state.auth.user.id);

    // Get profile user id from url
    const { id } = useParams()

    // On load, check relationship between logged in user and profile user. Default set to empty string. 
    const [follower, setFollower] = useState("");


    // Get Posts via getPosts function and redux dispatcher
    const dispatch = useDispatch();
    
    // If the user follows/unfollows then reload the user details in Redux 
    useEffect(() => {
        dispatch(getUserPosts(id))
        axios
            .get(`http://127.0.0.1:8000/api/follow-user/${user_id}/${id}`)
            .then(res => {
                if (res.data === "true") {
                    setFollower(true)
                } else {
                    setFollower(false)
                }
            })
     
            .catch(err => console.log(err));

    }, [])

    const followUnfollow = (user_id, id, action) => {

        // Send action to backend. Action is either "follow" or "unfollow"
        axios
            .post(`http://127.0.0.1:8000/api/follow-user/${user_id}/${id}`, {action} )
            .then(res => {
                console.log("Follow/Unfollow response:", res.data)
                if (res.data === "true") {
                    setFollower(true)
                } else {
                    setFollower(false)
                }
            })
            .catch(err => console.log(err));
        
        // Get updated user profile (this will upfate follower/following count)
        dispatch(getUserPosts(id))
        
    };


    return (
        <div className="user-profile">
            <div className="header">
                <div className="profile-picture">
                <img src={Avatar} alt="avatar"/>
                    <div className="profile-username">
                        u/{username}
                    </div>
                </div>

            </div>
            <div className="cake-day">
                <RiCake2Line/> &nbsp;
                <div><b>Cake day</b> {moment(date_joined_updated).format('MMMM Do YYYY, h:mm a')}</div>
            </div>
            <div className="follower-following">
                    <div><b>{following}</b> Following, </div>
                    <div style={{marginLeft: "10px"}}> <b>{followers}</b>  Followers</div>
                </div>
            <div className="follow-unfollow">
                {user_id == id ?
                    <Link to="/submit">
                        <Button
                            type="button"
                            buttonStyle="btn--primary"
                            buttonSize="btn--small"
                        >
                            New Post
                        </Button> 
                    </Link> :

                    
                    follower ?  <Button
                        onClick={() => followUnfollow(user_id, id, "unfollow")}
                        type="button"
                        buttonStyle="btn--primary"
                        buttonSize="btn--small"

                    >
                        
                        Unfollow
                    </Button> : 
                    <Button
                        onClick={() => followUnfollow(user_id, id, "follow")}
                        type="button"
                        buttonStyle="btn--primary"
                        buttonSize="btn--small"
                    >
                        Follow
                    </Button>
                    
                }

                
                
            </div>
        </div>
    )
}
