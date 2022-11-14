import MaterialToggle from './MaterialToggle';
import SideToggle from './SideToggle'
import React from 'react';
import ANTButton from "./ANTRackResetButton.js";
import DipSprayToggle from './DipSprayToggle.js'

export default function HeaderPanel1(props) {


    const widthList = [
        "",
        "200",
        "145",
        "140",
        "125",
        "115",
        "100",
        "90",
        "80"
    ]
 
    function changeDefectCountState(event) {
        props.setCurrentDefectCount(event.target.value);
    }  

    const WidthOptionsHTML =  widthList.map( item => { //Creates each <option> tag for Width selection dropdown.
        return (
            <option 
                value={item}                
                key={item}                
            >{item}
            </option>
        )
    })
    return (
        <header className='panel1Header'>
        <div className='P1HeaderQuarter1'>
        {/* <Switch 
            onChange={props.onMaterialChange}
            checkedChildren="Copper" 
            unCheckedChildren="Aluminum" 
            defaultChecked 
            className='materialSelectSection'
        /> */}
            <MaterialToggle 
                currentMaterialType={props.currentMaterialType} 
                setCurrentMaterialType={props.setCurrentMaterialType}
                currentBarType={props.currentBarType}
            />
            <DipSprayToggle 
                currentDipSprayType={props.currentDipSprayType} 
                setCurrentDipSprayType={props.setCurrentDipSprayType}
            />
        </div>
        <div className='P1HeaderQuarter2'>
            {/* <div className='temp'>  
                <h2>Temp</h2>
                <div>
                    <input  onChange={props.changeTempState} pattern="\d*" maxLength="3" type="text" />
                    <p>F</p>
                </div>
               
            </div> */}
            <div className='humidity'>
                <h2>Humidity</h2>
                <div>
                    <input 
                        onChange={props.changeHumidityState} 
                        className={props.currentHumidity == ""
                            ? "incompleteFieldExtra"
                            : ""
                        }
                        pattern="\d*" 
                        maxLength="3" 
                        type="text" 
                    />
                    <p>%</p>
                </div>
            </div>
            <h1 className='barTypeh1'>{props.currentBarType}</h1>
        </div>
        <div className='P1HeaderQuarter3'>
            <div className='widthSelectContainer'>
                <h3>Width</h3>
                <select 
                    onChange={props.changeWidthState}
                    className={props.currentWidth == ""
                        ? "incompleteFieldExtra"
                        : ""
                    }
                >
                    {WidthOptionsHTML}
                </select>
            </div>
            <div className='defectCountSection'>   
                <h3 className='withLabel'>with</h3>
                <input 
                    type="number" 
                    name="materialInput" 
                    onChange={changeDefectCountState}  
                    className='currentDefectCountInput'
                    min={1}
                    readOnly
                    value={props.currentDefectCountDisplay}
                />
                <h3>defects</h3>
            </div>
        </div>


        <div className='rackPositionSection'>
        <h3>{`Phase ${props.currentPhaseSelected}`}</h3>
        <div 
            className={props.currentPhaseSelected == ""
                ? "incompleteFieldParentOfParent phaseRadioButtons"
                :"phaseRadioButtons" 
            }
            onChange={props.changePhaseState}
        >  
                <input type="radio" id="L1" value="L1" name="phase" className="phaseRadioButton barTypeRadios"></input>
                <label htmlFor="L1">L1</label><br />          
                <input type="radio" id="L2" value="L2" name="phase" className="phaseRadioButton barTypeRadios"></input>
                <label htmlFor="L2">L2</label><br />
                <input type="radio" id="L3" value="L3" name="phase" className="phaseRadioButton barTypeRadios"></input>
                <label htmlFor="L3">L3</label><br />
                <input type="radio" id="N" value="N" name="phase" className="phaseRadioButton barTypeRadios"></input>
                <label htmlFor="N">N</label><br />
                <input type="radio" id="E" value="E" name="phase" className="phaseRadioButton barTypeRadios"></input>
                <label htmlFor="E">E</label><br />
            </div>
            <ANTButton 
                resetRadioButtons={props.resetRadioButtons}
                currentPhaseState={props.currentPhaseState}
                setCurrentPhaseSelected={props.setCurrentPhaseSelected}
                setCurrentRackPosition={props.setCurrentRackPosition}
                currentRackPosition={props.currentRackPosition}
                />
                <h3>{`Rack ${props.currentRackPosition}`}</h3>
            <div className="rackPositionRadioButtons" onChange={props.changeRackState}>  
                <input type="radio" id="1" value="1" name="rackPosition" className="rackPositionRadioButton barTypeRadios"></input>
                <label htmlFor="1">1</label><br />          
                <input type="radio" id="2" value="2" name="rackPosition" className="rackPositionRadioButton barTypeRadios"></input>
                <label htmlFor="2">2</label><br />
                <input type="radio" id="3" value="3" name="rackPosition" className="rackPositionRadioButton barTypeRadios"></input>
                <label htmlFor="3">3</label><br />
                <input type="radio" id="4" value="4" name="rackPosition" className="rackPositionRadioButton barTypeRadios"></input>
                <label htmlFor="4">4</label><br />
            </div>
        </div>

        </header>
    )
}
