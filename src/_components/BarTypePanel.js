import React from "react"
import './BarTypePanel.css'
import { DownOutlined, UpOutlined} from '@ant-design/icons';
import { Button } from 'antd';
import 'antd/dist/antd.css';


export default function BarTypePanel(props) {
  return (
  <div 
    className="barTypePanel" 
    onClick={() => {props.setCurrentBarType(props.barType)}} //Sets current bar type state to this panel when anywhere on panel is clicked
  >
      <h1>{props.barType}</h1>
      {/* <div> */}
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
      {/* <input 
        className="quantityOfFaults" 
        type="radio" 
        name="barType"
        value={props.barType}
        // onChange={props.}


        // onChange={(props.barType == props.currentBarType || props.currentBarType == "") 
        //   ? props.setCurrentNumFaults(oldNum => {oldNum + 1}) 
        //   : props.setCurrentNumFaults(oldNum => {oldNum}) } 
        // defaultValue={props.barType == props.currentBarType} 
      /> */}
  </div>
  )

}
