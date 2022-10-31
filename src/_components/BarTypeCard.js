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
        onClickCapture={props.increaseDefectCount} 
        value={props.barType}
        size={"medium"}>
        <UpOutlined 
        />
      </Button>   
      <Button       
        type="default" 
        block 
        style={{ border:"1px solid black"}} 
        onClickCapture={props.decreaseDefectCount} 
        value={props.barType}
        size={"medium"}
        >
        <DownOutlined 
        />
      </Button>             
      <input //invisible radio button for use with css and emphesize selected bartype
        className="quantityOfDefects" 
        type="radio" 
        name="barType"
        value={props.barType}
        style={{display: "none"}}
        // onChange={props.}


        // onChange={(props.barType == props.currentBarType || props.currentBarType == "") 
        //   ? props.setCurrentNumDefects(oldNum => {oldNum + 1}) 
        //   : props.setCurrentNumDefects(oldNum => {oldNum}) } 
        // defaulttValue={props.barType == props.currentBarType} 
      />
  </div>
  )

}
