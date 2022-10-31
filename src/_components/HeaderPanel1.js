import MaterialToggle from './MaterialToggle';
import React from 'react';
import ANTButton from "./ANTRackResetButton.js";
export default function HeaderPanel1(props) {
    // var faultCountRef = React.createRef();
    // React.useEffect( () => {

    // }, [props.currentFaultCount]
    // );
 
    function changeFaultCountState(event) {
        props.setCurrentFaultCount(event.target.value);
    }  

    return (
        <header className='panel1Header'>
        {/* <div className='materialSelectSection'>             */}
        <MaterialToggle 
            currentMaterialType={props.currentMaterialType} 
            setCurrentMaterialType={props.setCurrentMaterialType}
            currentBarType={props.currentBarType}
        />
        {/* </div> */}
        <h1 className='barTypeh1'>{props.currentBarType}</h1>
        <div className='faultCountSection'>   
            <h3>with</h3>
            <input 
                type="number" 
                name="materialInput" 
                onChange={changeFaultCountState}  
                className='currentFaultCountInput'
                min={1} 
                value={props.currentFaultCountDisplay}
            />
            <h3>faults</h3>
        </div>


        <div className='rackPositionSection'>
            <div className="rackPositionRadioButtons" onChange={props.changeRackState}>  
                <input type="radio" value="1" name="rackPosition" className="rackPositionRadioButton"></input>
                <label htmlFor="1">1</label><br />          
                <input type="radio" value="2" name="rackPosition" className="rackPositionRadioButton"></input>
                <label htmlFor="2">2</label><br />
                <input type="radio" value="3" name="rackPosition" className="rackPositionRadioButton"></input>
                <label htmlFor="3">3</label><br />
                <input type="radio" value="4" name="rackPosition" className="rackPositionRadioButton"></input>
                <label htmlFor="4">4</label><br />
            </div>
            <h3>{`on rack ${props.currentRackPosition}`}</h3>
            <ANTButton 
                resetRadioButtons={props.resetRadioButtons}
                setCurrentRackPosition={props.setCurrentRackPosition}
                currentRackPosition={props.currentRackPosition}
            />
        </div>

        </header>
    )
}
