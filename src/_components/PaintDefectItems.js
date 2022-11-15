import React from 'react'
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default function PaintDefectItems(props) {
    ////////////////Variables
    const defectTypeList = [
        "SELECT TYPE",
        "Thick Paint",
        "Thin Paint"
    ]
    var defectItemsArray = []; //Creates an array with the number of items equal to the defect count, elements consisting of 1 through defect count
    for (var i = 0; i < props.currentDefectCount; i++) {
        defectItemsArray.push(i + 1)
    }

    const locationOptionsArray = [
        "Body",
        "Jog",
    ]
    //////////////////////Sub-components
    const DefectOptionsHTML =  defectTypeList.map( item => { //Creates each <option> tag for each defect type. One <option> per item in defectTypeList
        return (
            <option 
                value={item}                
                key={item}                
            >{item}
            </option>
        )
    })

    const ListItems = defectItemsArray.map( defectNumber => {  //Creates a list item for every defect count passed down from app
            return (
                <li
                className='DefectItem' 
                key={defectNumber}
                >
                    <div className='defectNumTypeContainer'>
                        <h2>{defectNumber}</h2>
                        <select 
                            className={props.typeDefectArray[defectNumber - 1] == "" || props.typeDefectArray[defectNumber - 1] == "SELECT TYPE" // If field is empty, adds class for css to bring attention to it
                                ? "incompleteField"
                                : ""
                            }
                            htmlFor="defectType" 
                            id='defectType'                        
                            onChange={(event) => props.onDefectChange(event, defectNumber)}
                        >
                            {DefectOptionsHTML}
                        </select>                
                    </div>
                    <form 
                        className={
                            props.locationArray[defectNumber - 1] == "" // If field is empty, adds class for css to bring attention to it
                            ? "incompleteField locationRadioButtons"
                            : "locationRadioButtons"
                        }
                        onChange={(event) => props.onLocationChange(event, defectNumber)}>
                        <div key={`Body ${defectNumber}`}>
                            <input 
                                className="locationRadioButton"
                                type="radio"                
                                name={`location${defectNumber}`} 
                                id={`body${defectNumber}`}
                                value={locationOptionsArray[0]}>
                            </input>
                            <label htmlFor={`body${defectNumber}`}>
                                Body
                            </label>
                        </div> {/*Value is saved under name "location" + defectNumber ex. location2 is the name for the location data from the second list item in panel 2 */}
                        <div key={`Edge ${defectNumber}`}>
                                <input 
                                    className='locationRadioButton'
                                    type="radio"                
                                    name={`location${defectNumber}`} 
                                    id={`edge${defectNumber}`}
                                    value={locationOptionsArray[1]}>
                                </input>
                            <label htmlFor={`edge${defectNumber}`}>
                                Edge
                            </label>
                        </div> {/*Value is saved under name "location" + defectNumber ex. location2 is the name for the location data from the second list item in panel 2 */}
                        <div key={`Jog ${defectNumber}`}>
                            <input 
                                className='locationRadioButton'
                                type="radio"                
                                name={`location${defectNumber}`} 
                                id={`jog${defectNumber}`}
                                value={locationOptionsArray[2]}>
                            </input>
                            <label htmlFor={`jog${defectNumber}`}>
                                Jog
                            </label>
                        </div> {/*Value is saved under name "location" + defectNumber ex. location2 is the name for the location data from the second list item in panel 2 */}
                        <div key={`Tab Edge ${defectNumber}`}>
                            <input 
                                className='locationRadioButton'
                                type="radio"                
                                name={`location${defectNumber}`} 
                                id={`tabEdge${defectNumber}`}
                                value={locationOptionsArray[3]}>
                            </input>
                            <label htmlFor={`tabEdge${defectNumber}`}>
                                Tab Edge
                            </label>
                        </div> {/*Value is saved under name "location" + defectNumber ex. location2 is the name for the location data from the second list item in panel 2 */}
                        <div key={`Tag ${defectNumber}`}>
                            <input 
                                className='locationRadioButton'
                                type="radio"                
                                name={`location${defectNumber}`} 
                                id={`tag${defectNumber}`}
                                value={locationOptionsArray[4]}>
                            </input>
                            <label htmlFor={`tag${defectNumber}`}>
                                Tag
                            </label>
                        </div> {/*Value is saved under name "location" + defectNumber ex. location2 is the name for the location data from the second list item in panel 2 */}                                                                        
                    </form>
                    <Switch 
                        onChange={(event) => props.onOrientationChange(event, defectNumber)}
                        checkedChildren="Top" 
                        unCheckedChildren="Bot" 
                        defaultChecked 
                        className='orientation'/>
                    <Switch 
                        onChange={(event) => props.onSideChange(event, defectNumber)} 
                        checkedChildren="A" 
                        unCheckedChildren="B" 
                        defaultChecked 
                        className='side'/>
                </li>
            )
        })

    /////ANTD radio button


    //////////////HTML final Return
    return (
        <ul className='Panel2'>
            {ListItems}
        </ul>
    )
}