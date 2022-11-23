import React from 'react'

export default function SubmitButton(props) {
    return (
        <button
        className={`${props.showReview && "showSubmit"} finalSubmitButton reviewButton`}
        onClick={props.userName != 'Not set' 
                ? props.submitDayToDatabase
                : props.onSubmitUserNameNotSet}
        >
            Submit
        </button>
    )
}