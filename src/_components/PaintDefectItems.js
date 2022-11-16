import React from 'react'
import { Switch } from 'antd';
import parse from 'html-react-parser';

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
        "Jog"
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

    // function LocationOptions(props) {
    //     let htmlLocations = "";

    //     for (let i = 0; i < locationOptionsArray.length; i++)  {//Takes each location option and creates html elements NOT BEING USED, CHECKING RADIO BUTTONS WILL NOT WORK
    //         htmlLocations += 
    //                `<div key="${locationOptionsArray[i].concat(props.defectNumber)}">
    //                     <input 
    //                         className="locationRadioButton"
    //                         type="radio"
    //                         name="${"defect".concat(props.defectNumber)}"
    //                         id="${locationOptionsArray[i].concat(props.defectNumber)}"
    //                         value='${locationOptionsArray[i]}'>
    //                     <label 
    //                         htmlFor="${locationOptionsArray[i].concat(props.defectNumber)}">
    //                         ${locationOptionsArray[i]}
    //                     </label>
    //                 </div>`
    //     }
    //     // htmlLocations = parse(htmlLocations); // React.createElement('p', {}, 'Hello, World!')
    //     console.log(htmlLocations)
    //     return (parse(htmlLocations))
    // }
    const ListItems = defectItemsArray.map( defectNumber => {  //Creates a list item for every defect count passed down from app
            return (
                <li
                className='DefectItem' 
                key={defectNumber}
                >

                        <h2 className='defectNumLabel'>{defectNumber}</h2>
                        <select 
                            className={props.typeDefectArray[defectNumber - 1] == "" || props.typeDefectArray[defectNumber - 1] == "SELECT TYPE" // If field is empty, adds class for css to bring attention to it
                                ? "defectTypeSelect incompleteField"
                                : "defectTypeSelect"
                            }
                            htmlFor="defectType" 
                            id='defectType'                        
                            onChange={(event) => props.onDefectChange(event, defectNumber)}
                        >
                            {DefectOptionsHTML}
                        </select>                

                    <form 
                        className={
                            props.locationArray[defectNumber - 1] == "" // If field is empty, adds class for css to bring attention to it
                            ? "incompleteField locationRadioButtons"
                            : "locationRadioButtons"
                        }
                        onChange={(event) => props.onLocationChange(event, defectNumber)}
                    >
                        {/* <LocationOptions 
                            defectNumber={defectNumber}
                        /> This should create radio options automatically depending on locationOptionList but this wont work. State correctly reports but radio buttons wont check*/}
                         <div key={`Body ${defectNumber}`}>
                            <input 
                                className="locationRadioButton"
                                type="radio"                
                                name={`defect${defectNumber}`} 
                                id={`body${defectNumber}`}
                                value={locationOptionsArray[0]}>
                            </input>
                            <label htmlFor={`body${defectNumber}`}>
                                Body
                            </label>
                        </div> 
                        {/* Value is saved under name "location" + defectNumber ex. location2 is the name for the location data from the second list item in panel 2 */}
                         <div key={`Jog ${defectNumber}`}>
                            <input 
                                className='locationRadioButton'
                                type="radio"                
                                name={`defect${defectNumber}`} 
                                id={`jog${defectNumber}`}
                                value={locationOptionsArray[1]}>
                            </input>
                            <label htmlFor={`jog${defectNumber}`}>
                                Jog
                            </label> 
                        </div>
                        {/* Value is saved under name "location" + defectNumber ex. location2 is the name for the location data from the second list item in panel 2 */} 
                                                                                               
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
                    <Switch 
                        onChange={event => props.changeLeftRightState(event, defectNumber)}
                        checkedChildren="Left" 
                        unCheckedChildren="Right" 
                        defaultChecked 
                        className='leftRight'/>
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