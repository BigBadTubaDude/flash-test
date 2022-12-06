import { Button, Radio } from 'antd';
import React from 'react'
const url = "https://prod-255.westeurope.logic.azure.com:443/workflows/cb8b8807926b4b5da2815dc4c1ca90b4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RqlOaUPwWhyuiXszWUXKPWhpkDfnjgJhccGJUwjw1BY"; 

export default function ANTButton(props) {
  function resetRadioButtons() {
    let radios = document.getElementsByClassName("barTypeRadios");  
    props.setCurrentRackPosition("");
    props.setCurrentPhaseSelected("");
    for(let i = 0; i < radios.length; i++) {
      radios[i].checked = false;
    }
    //For clearing tables when working from home
    var insertTotalBarsQuery = `DELETE FROM [US_Project_Management_Test].[dbo].[Coleman_Paint_Defect_Data]`;
    let insertBarRequestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'query': insertTotalBarsQuery })
    }
      var selectSQL = `SELECT * FROM [US_Project_Management_Test].[dbo].[Coleman_Paint_Defect_Data]`;
      let selectBarRequestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'query': selectSQL })
      };
      async function seeData() {
        let data = await fetch(url, selectBarRequestOption);
        console.log(data.Table1)

      }
    };
  
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
