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
          style={{width:"100%"}}
        />
      </Button>   


      <Button type="default" block style={{color:"white", border:"1px solid black"}} onClick={props.increaseFaultCount} className="OSE/EDecreaseButton" value="OFFSET: EOL/EOR" size={size} icon={<DownOutlined style={{zIndex:-1, color:"white"}}/>} />              
        <input className="quantityOfFaults" min="0" type="number">{}</input>
      {/* </div> */}
  </div>
  )

}
