import React from 'react'

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

    const locationOptions = [
        "Body",
        "Edge",
        "Jog",
        "Tab Edge",
        "Tag"
    ]
    //////////////////////Sub-components
    const DefectOptions =  defectTypeList.map( item => { //Creates each <option> tag for each dropdown. One <option> per item in defectTypeList
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
                    <div className='DefectNumTypeContainer'>
                        <h2>{defectNumber}</h2>
                        <select htmlFor="defectType" id='defectType'>
                            {DefectOptions}
                        </select>                
                    </div>
                    <form>
                        <input 
                        type="radio" 
                        id={defectNumber}>

                        </input>
                    </form>
                </li>
            )
        })

    //////////////HTML final Return
    return (
        <ul>
            {ListItems}
        </ul>
    )
}