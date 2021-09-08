import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router";

import { createPost } from "../../actions/posts";

import "./Create.css"

export function Create({state, createPost}) {

    const history = useHistory();

	const { register, handleSubmit, formState: { errors }} = useForm();

	const onSubmit = (data) => {
        createPost(state.auth.user.id, state.auth.user.username, data.title, data.body)
        history.push("/")
    }

	return (
		<div className="create-container">
			<h3>Create Post</h3>
			<hr />
            <div className="form-container">
                <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="title-input"
                        type="text" 
                        placeholder="Title" 
                        name="title"
                        {...register("title", { required: true })}
                    />
                    {errors.titleRequired && <span>You must provide a title</span>}
                    <textarea
                        className="body-input"
                        type="text"
                        placeholder="Text(Optional)"
                        name="body"
                        {...register("body")} 
                    />
                    <input
                        className="form-button"
                        value="POST"
                        type="submit"
                    />
                </form>
            </div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		state,
        auth: state.auth,
		isAuthenticated: state.auth.isAuthenticated,
	};
}

export default connect(mapStateToProps, {createPost})(Create);