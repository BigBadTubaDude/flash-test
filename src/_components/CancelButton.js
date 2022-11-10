import React from "react"

export default function CancelButton(props) {
    return (
        <button
            className="reviewButton backButton"
            onClick={props.returnToBarInputScreen}
            return="false"
        > Back

        </button>
    )
}//RENAME ALL CANCEL TO BACK