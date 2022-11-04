import React from 'react'
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default function DefectItems(props) {
    ////////////////Variables
    const defectTypeList = [
        "SELECT TYPE",
        "Delamination",
        "Contamination",
        "Grind/Sand",
        "Plating",
        "Handling/Damage",
        ">2mm/Chip",
        "Epoxy/Pin Holes",
        "Epoxy/Texture",
        "Epoxy/Thin",
        "Epoxy/Edge Dist"
    ]
    var defectItemsArray = []; //Creates an array with the number of items equal to the defect count, elements consisting of 1 through defect count
    for (var i = 0; i < props.currentDefectCount; i++) {
        defectItemsArray.push(i + 1)
    }

    const locationOptionsArray = [
        "Body",
        "Edge",
        "Jog",
        "Tab Edge",
        "Tag"
    ]
    // const locationRadioButtons = locationOptionsArray.map( (option, number) => { could not pass defect number correctly. Had to write each item out in ListItems
    //     return ( 
    //         <div key={`${option} ${number}`}>
    //             <input 
    //                 className='locationRadioButton'
    //                 type="radio"                
    //                 name={`location${number}`} 
    //                 id={number}
    //                 value={option}>
    //             </input>
    //             <label>
    //                 {/* {option} */}{`${option} ${number}`}
    //                 </label>
    //         </div>
    //         )
    // })
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
                        htmlFor="defectType" 
                        id='defectType'                        
                        onChange={(event) => props.onDefectChange(event, defectNumber)}
                        >
                            {DefectOptionsHTML}
                        </select>                
                    </div>
                    <form 
                    className='locationRadioButtons'
                    onChange={(event) => props.onLocationChange(event, defectNumber)}>
                        <div key={`Body ${defectNumber}`}>
                            <input 
                                className='locationRadioButton'
                                type="radio"                
                                name={`location${defectNumber}`} 
                                id={`body${defectNumber}`}
                                value="body">
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
                                    value="edge">
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
                                value="jog">
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
                                value="tabEdge">
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
                                value="tag">
                            </input>
                            <label htmlFor={`tag${defectNumber}`}>
                                Tag
                            </label>
                        </div> {/*Value is saved under name "location" + defectNumber ex. location2 is the name for the location data from the second list item in panel 2 */}                                                                        
                    </form>
                    <Switch 
                        onChange={(event) => props.onOrientationChange(event, defectNumber)}
                        checkedChildren="Top" 
                        unCheckedChildren="Bottom" 
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