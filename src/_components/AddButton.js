import React from 'react'

export default function AddButton(props) {

    return (
        <button
            className={`${props.showAddButton ? "submitShow reviewButton" : "submitHidden reviewButton"}`}
            >Add Bad Bar
        </button>
    )
}