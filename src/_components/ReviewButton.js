import { Input } from 'antd';
import React from 'react'

export default function ReviewButton(props) {
    return (
        <button
            onClick={props.clickReview}
            className={`${props.showReviewButton ? "submitShow reviewButton" : "submitHidden reviewButton"}`}
            >{props.showReview ? "Cancel" : "Review" }
        </button>

    )
}