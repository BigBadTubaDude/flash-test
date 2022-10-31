import { Button, Radio } from 'antd';
import React from 'react'

export default function ANTButton(props) {
    function resetRadioButtons() {
        let radios = document.getElementsByClassName("rackPositionRadioButton");  
        props.setCurrentRackPosition("");
        for(var i = 0; i < radios.length; i++) {
          radios[i].checked = false;
        }
      }
    return (
        <Button type="primary" onClick={resetRadioButtons} shape="round" className="rackResetButton" size={"small"}>
        {props.currentRackPosition != "" 
        ? "Reset"
        : "Unknown"}
      </Button>
    )
}
