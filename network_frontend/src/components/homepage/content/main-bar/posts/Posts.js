import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Pagination from "../../../../pagination/Pagination";
import moment from 'moment'
import { Link } from "react-router-dom";

import { getFollowerPosts , votePost } from "../../../../../actions/posts";


import "./posts.css";

import { GoComment, FcReddit, FiEdit2 } from 'react-icons/all'

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export default function Posts() {

    // Load posts by followers on page load
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFollowerPosts(user_id))
    }, [])

    // Get all posts from users the user follows
    const posts = useSelector((state) => state.followingPosts.followingPosts); 

    // Get user id from redux store
    const user_id = useSelector((state) => state.auth.user.id);

    // Get logged in username
     const user = useSelector((state) => state.auth.user)

    // Set up for pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

   // Get current post
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Assign vote type (assigns string to variable based on upvote or downvote click)
    var type = "";

    // Set posts in state and then update re-render page when user votes on post. 
    const vote = useSelector((state) => state.posts.likedPost)

    useEffect(() => {
    dispatch(getFollowerPosts(user_id))
    }, [vote])

    // Get searchTerm for redux store
    const searchTerm = useSelector((state) => state.filterPosts.searchTerm)

    return (
        <Fragment>
                {currentPosts.filter((post) => {
                    if (searchTerm == "") {
                        return post
                    } else if ( post.body.toLowerCase().includes(searchTerm.toLowerCase())){
                        return post
                    } else if (post.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return post
                    }
                }).map(post => (
                    <div className="post-wrapper"> 
                        <div className="post">
                            <div className="post-sidebar">
                            <ArrowUpwardIcon onClick={() => dispatch(votePost(user.id, post.id, type="upvote")) } className="upvote" />
                                    <div>{post.votes !==0 ? post.votes : "Vote"}</div>
                                    <ArrowDownwardIcon onClick={() => dispatch(votePost(user.id, post.id, type="downvote")) } className="downvote" />
                            </div>
                            <div className="post-mainbar">
                                <div className="post-author">
                                <FcReddit size={22}/> 
                                Posted by &nbsp; <Link to={`/user/${post.user}`}>u/{post.username} </Link> &nbsp; on {moment(post.date).format('MMMM Do YYYY, h:mm a')}
                                </div>
                                <div className="post-title">
                                    {post.title}
                                </div>
                                <div className="post-body">
                                    {post.body}
                                </div>
                                <div className="post-footer">
                                    <div className="comment-container">
                                        <GoComment size={18}/> 
                                        <div className="comments"> Comments</div>
                                    </div>
                                    {user.id === post.user ? 
                                    <div className="edit-container">
                                        <FiEdit2 size={18}/> 
                                        <div className="edit"> Edit Post</div>
                                    </div> : null
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                ))}
                <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
            </Fragment>
    )

}


