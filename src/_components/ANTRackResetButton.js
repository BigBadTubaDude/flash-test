import { Button, Radio } from 'antd';
import React from 'react'

export default function ANTButton(props) {
    function resetRack(event) {
        props.setCurrentRackPosition("")
    }
    return (
        <Button type="primary" onClick={resetRack} shape="round" className="rackResetButton" size={"small"}>
        {props.currentRackPosition != "" 
        ? "Reset"
        : "Unknown"}
      </Button>
    )
}
