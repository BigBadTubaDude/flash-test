import React from 'react'
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default function DefectItems(props) {
    ////////////////Variables
    const defectTypeList = [
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
    const locationRadioButtons = locationOptionsArray.map( (option, number) => {
        return ( 
            <div key={`${option} ${number}`}>
                <input 
                    className='locationRadioButton'
                    type="radio"                
                    name={`location${number}`} 
                    id={number}
                    value={option}>
                </input>
                <label>{option}</label>
            </div>
            )
    })
    //////////////////////Sub-components
    const DefectOptionsHTML =  defectTypeList.map( item => { //Creates each <option> tag for each dropdown. One <option> per item in defectTypeList
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
                        <select htmlFor="defectType" id='defectType'>
                            {DefectOptionsHTML}
                        </select>                
                    </div>
                    <form className='locationRadioButtons'>
                         {locationRadioButtons} {/*Value is saved under name "location" + defectNumber ex. location2 is the name for the location data from the second list item in panel 2 */}
                    </form>
                    <Switch checkedChildren="Top" unCheckedChildren="Bottom" defaultChecked />
                </li>
            )
        })

    /////ANTD radio button
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
      };

    //////////////HTML final Return
    return (
        <ul>
            {ListItems}
        </ul>
    )
}