import React from 'react'

export default function SubmitButton(props) {
    return (
        <button
        className={`${props.showReview && "showSubmit"} finalSubmitButton reviewButton`}
        onClick={props.submitDayToDatabase}
        >
            Submit
        </button>
    )
}