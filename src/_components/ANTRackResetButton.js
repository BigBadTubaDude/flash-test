import { Button, Radio } from 'antd';
import React from 'react'

export default function ANTButton(props) {
    function resetRadioButtons() {
        let radios = document.getElementsByClassName("barTypeRadios");  
        props.setCurrentRackPosition("");
        props.setCurrentPhaseSelected("");
        for(var i = 0; i < radios.length; i++) {
          radios[i].checked = false;
        }
      }
    return (
        <Button 
            type="primary" 
            onClick={resetRadioButtons} 
            shape="round" 
            className={props.currentRackPosition != "" 
                ? "rackResetButton"
                : "rackResetButton noHighlight"
            }
            size={"small"}
        >Reset
      </Button>
    )
}
