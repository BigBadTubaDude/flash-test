import React from "react"
import './BarTypePanel.css'
import { DownOutlined, UpOutlined} from '@ant-design/icons';
import { Button } from 'antd';
import 'antd/dist/antd.css';


export default function BarTypePanel(props) {
  const [size, setSize] = React.useState('large');
  return (
  <div 
    className="barTypePanel" 
    // onClick={}
  >
      <h1>{props.barType}</h1>
      {/* <div> */}
      <Button 
        type="default" 
        block 
        style={{ border:"1px solid black"}} 
        onClickCapture={props.increaseFaultCount} 
        // className="OSE/EIncreaseButton" 
        value={props.barType}
        size={size}>
        <UpOutlined 
        />
      </Button>   
      <Button 
        type="default" 
        block 
        style={{ border:"1px solid black"}} 
        onClickCapture={props.decreaseFaultCount} 
        // className="OSE/EIncreaseButton" 
        value={props.barType}
        size={size}
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
