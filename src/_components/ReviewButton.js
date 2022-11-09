import { Input } from 'antd';
import React from 'react'

export default function ReviewButton(props) {
    return (
        <button
            onClick={props.clickReview}
            className={`${props.showReviewButton ? "reviewShow reviewButton" : "reviewHidden reviewButton"} ${props.showReview ? "displayNone" : ""}`}
            >Review
        </button>

    )
}