import React from 'react'

export default function SubmitButton(props) {

    return (
        <button
            className={`${props.showBool ? "submitShow submitButton" : "submitHidden submitButton"}`}
            >Submit
        </button>
    )
}