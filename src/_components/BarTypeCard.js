import React from "react"
import './BarTypeCard.css'
import { DownOutlined, UpOutlined} from '@ant-design/icons';
import { Button } from 'antd';
import 'antd/dist/antd.css';


export default function BarTypeCard(props) {
  return (
  <div 
    className="barTypeCard" 
    onClick={() => {props.setCurrentBarType(props.barType)}} //Sets current bar type state to this card when anywhere on card is clicked
  >
      <h1 >{props.barType}</h1>
      <Button 
        type="default" 
        block 
        style={{ border:"1px solid black"}} 
        onClickCapture={props.increaseFaultCount} 
        value={props.barType}
        size={"medium"}>
        <UpOutlined 
        />
      </Button>   
      <Button       
        type="default" 
        block 
        style={{ border:"1px solid black"}} 
        onClickCapture={props.decreaseFaultCount} 
        value={props.barType}
        size={"medium"}
        >
        <DownOutlined 
        />
      </Button>             
      <input //invisible radio button for use with css and emphesize selected bartype
        className="quantityOfFaults" 
        type="radio" 
        name="barType"
        value={props.barType}
        style={{display: "none"}}
        // onChange={props.}


        // onChange={(props.barType == props.currentBarType || props.currentBarType == "") 
        //   ? props.setCurrentNumFaults(oldNum => {oldNum + 1}) 
        //   : props.setCurrentNumFaults(oldNum => {oldNum}) } 
        // defaultValue={props.barType == props.currentBarType} 
      />
  </div>
  )

}
