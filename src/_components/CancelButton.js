import React from "react"

export default function CancelButton(props) {
    return (
        <button
            className="reviewButton backButton"
            onClick={props.returnToBarInputScreen}
        > Back

        </button>
    )
}//RENAME ALL CANCEL TO BACK