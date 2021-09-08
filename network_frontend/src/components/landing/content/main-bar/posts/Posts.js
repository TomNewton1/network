import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch, connect } from 'react-redux'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from 'moment'

import Pagination from "../../../../pagination/Pagination";
import LoginModal from "../../../../loginModal/LoginModal";


import { getPosts, votePost, editPost } from '../../../../../actions/posts';

import "./posts.css";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { GoComment, FcReddit, FiEdit2 } from 'react-icons/all'

export function Posts() {

    // Get Posts via getPosts function and redux dispathcer
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    // Set posts in state
    const posts = useSelector((state) => state.posts.posts)

    // Handle with Pagination
    const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

   // Get current post (for paggination)
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Handle State for Modal (checks if user clicked on login or logout)
	const [signInState, setsignInState] = useState({
		open: false,
		signInType: "",
	});

	// setSignInState to closed if the user is authenticated
	useEffect(() => {
		setsignInState({ open: false });
	}, []);

	const handleRegister = () => {
		setsignInState({
			open: true,
			signInType: "register",
		});
	};

    // Assign vote type (assigns string to variable based on upvote or downvote click)
    var type = ""

    // Check if user is Authenticated
    const Authenticated = useSelector((state) => state.auth.isAuthenticated)

    // Get logged in user id
    const user = useSelector((state) => state.auth.user)

    // Set posts in state and then update re-render page when user votes on post. 
    const vote = useSelector((state) => state.posts.likedPost)

    useEffect(() => {
        dispatch(getPosts())
    }, [vote])

    // Set post ID
    const [postId, setPostId] = useState(null)

    //Handle Edit 
    const [editText, setEditText] = useState(false)

    const handleEdit = () => {
        setEditText(true)
    }

    // React hook forms and handleSubmit 

    const { register, handleSubmit} = useForm();

    const onSubmit = (data, post_id) => {
        dispatch(editPost(post_id, data.title, data.body))
        setEditText(false)
    }

    // Set edit in state and then update re-render page when user edits a post.
    const edited = useSelector((state) => state.posts.editedPost)

    useEffect(() => {
        dispatch(getPosts())
    }, [edited])

    // Get searchTerm for redux store
    const searchTerm = useSelector((state) => state.filterPosts.searchTerm)


    if (Authenticated) {
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
                                Posted by&nbsp; <Link to={`/user/${post.user}`}>u/{post.username} </Link> &nbsp;on {moment(post.date).format('MMMM Do YYYY, h:mm a')}
                                </div>
                                {editText ? postId===post.id ?
                                <form className="form-group" onSubmit={handleSubmit(data => onSubmit(data, post.id))} >
                                    
                                    <input
                                        className="title-input"
                                        type="text" 
                                        name="title"
                                        defaultValue={post.title}
                                        {...register("title")} 
                                        
                                    />
                                    <textarea
                                        className="body-input"
                                        type="text"
                                        name="body"
                                        defaultValue={post.body}
                                        {...register("body")} 
                                    />
                                    <input
                                        className="form-button"
                                        value="POST"
                                        type="submit"
                                    />
                                </form>
                                :
                                <div className="editable-post">
                                    <div className="post-title">
                                        {post.title}
                                    </div>
                                    <div className="post-body">
                                        {post.body}
                                    </div>
                                </div>
                                :
                                <div className="editable-post">
                                    <div className="post-title">
                                        {post.title}
                                    </div>
                                    <div className="post-body">
                                        {post.body}
                                    </div>
                                </div>
                                }   
                                <div className="post-footer">
                                    <div className="comment-container">
                                        <GoComment size={18}/> 
                                        <div className="comments"> Comments</div>
                                    </div>
                                    {user.id === post.user ? 
                                    <div onClick={() => {handleEdit(); setPostId(post.id);}} className="edit-container">
                                        <FiEdit2 size={18}/> 
                                        <div className="edit"> Edit Post</div>
                                    </div> : null
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                ))}
                <LoginModal
                    open={signInState.open}
                    action={signInState.signInType}
                    onClose={() => setsignInState({ open: false })}
                ></LoginModal>
                <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                    {currentPosts.map(post => (
                        <div className="post-wrapper"> 
                            <div className="post">
                                <div className="post-sidebar">
                                    <ArrowUpwardIcon onClick={handleRegister} className="upvote" />
                                    <div>{post.votes !==0 ? post.votes : "Vote"}</div>
                                    <ArrowDownwardIcon  onClick={handleRegister} className="downvote" />
                                </div>
                                <div className="post-mainbar">
                                    <div className="post-author">
                                    <FcReddit size={22}/> 
                                    Posted by&nbsp; <Link to={`/user/${post.user}`}>u/{post.username} </Link> &nbsp;on {moment(post.date).format('MMMM Do YYYY, h:mm a')}
                                    </div>
                                    <div className="post-title">
                                        {post.title}
                                    </div>
                                    <div className="post-body">
                                        {post.body}
                                    </div>
                                    <div className="post-footer">
                                        <div className="comment-container" onClick={handleRegister}>
                                            <GoComment size={18}/> 
                                            <div className="comments"> Comments</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                    <LoginModal
                        open={signInState.open}
                        action={signInState.signInType}
                        onClose={() => setsignInState({ open: false })}
                    ></LoginModal>
                    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
                </Fragment>
        )
    }
}

function mapStateToProps(state) {
	return {
		state,
		isAuthenticated: state.auth.isAuthenticated,
        likedPost: state.posts.likedPost
	};
}

export default connect(mapStateToProps)(Posts);
