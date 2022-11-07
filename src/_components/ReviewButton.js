import React from 'react'

export default function ReviewButton(props) {

    return (
        <button
            className={`${props.showBool ? "submitShow reviewButton" : "submitHidden reviewButton"}`}
            >Review
        </button>
    )
}