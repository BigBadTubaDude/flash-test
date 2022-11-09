import React from 'react'

export default function AddButton(props) {

    return (
        <button
            onClick={props.clickAddBar}
            className={`
                ${props.showAddButton 
                    ? "addBarShow reviewButton" 
                    : "addBarHidden reviewButton"} 
                ${props.showReview //If review page is showing, gives add button a class of hideAddButton
                    ? "hideAddButton"
                    : ""}`}
            >Add Bad Bar
        </button>
    )
}