import React, { useState } from "react";

import "./Pagination.css"

export default function Pagination({postsPerPage, totalPosts, paginate}) {
    const pageNumbers = [];

    const [currentPage, setCurrentPage] = useState(1);

    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (

        <div className="pagination-container">
            { pageNumbers.length === 1 ?
                <div>
                    <b>{currentPage}</b>
                </div>
            :
            currentPage === 1 ? 
                <div className="button-container">
                    <b>{currentPage}</b>
                    <button onClick={() => {paginate(currentPage + 1); setCurrentPage(currentPage + 1)}} href='#' className="right-pagination-button">Next</button>
                </div>
            :
            currentPage === pageNumbers.length ?
            <div className="button-container">
                <button onClick={() => {paginate(currentPage - 1); setCurrentPage(currentPage - 1)}} href='#' className="left-pagination-button">Previous</button>
                    <b>{currentPage}</b>
            </div>
            :
            <div className="button-container">
                <button onClick={() => {paginate(currentPage - 1); setCurrentPage(currentPage - 1)}} href='#' className="left-pagination-button">Previous</button>
                    <b>{currentPage}</b>
                <button onClick={() => {paginate(currentPage + 1); setCurrentPage(currentPage + 1)}} href='#' className="right-pagination-button">Next</button>
            </div>
            }
        </div>
    )

}
