import React from "react"
import './FaultInput.css'
import { DownOutlined, UpOutlined} from '@ant-design/icons';
import { Button } from 'antd';
import 'antd/dist/antd.css';


export default function(props) {
  const [size, setSize] = React.useState('large');
  return (
  <div className="fault">
      <h1>{props.barType}</h1>
      {/* <div> */}
      <Button 
        type="default" 
        block 
        style={{ border:"1px solid black"}} 
        onClick={props.increaseFaultCount} 
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
        <input 
        
        className="quantityOfFaults" 
        min="0" 
        type="number" 
        // onChange={(props.barType == props.currentBarType || props.currentBarType == "") 
        //   ? props.setCurrentNumFaults(oldNum => {oldNum + 1}) 
        //   : props.setCurrentNumFaults(oldNum => {oldNum}) } 
        defaultValue={props.barType == props.currentBarType 
          ? props.barNumFaults 
          : 0
        } 
        readOnly={true}
        />
  </div>
  )

}
