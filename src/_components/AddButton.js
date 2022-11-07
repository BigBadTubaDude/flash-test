import React from 'react'

export default function AddButton(props) {
    
    return (
        <button
            className={`${props.showBool ? "submitShow reviewButton" : "submitHidden reviewButton"}`}
            >Add Bad Bar
        </button>
    )
}