import React from 'react';
import SubmitButton from "./SubmitButton"
import BackButton from "./BackButton"

export default function ReviewForm(props) {
    //////////////////////////Variables
    const users = [
        "SAMMY",
        "EDDIE",
        "CORY",
        "SHARON",
        "TRAVIS",
        "BERJENATO",
        "TEMP"
    ];
    const userOptionsHTML = users.map( user => {
        return (
            <option
            value={user}
            key={user}
            >
                {user}
            </option>
        )
    })
    let totalBarsInput = document.getElementsByClassName("totalDayBarsInput")
    // let todayDate = props.submitDate;
    
    ///////////////////////STATES
    const [disableChangeTotalButton, setDisableChangeTotalButton] = React.useState(true); //If true, Change Total button is disabled
    

    //////ON CHANGE FUNCTIONS
    function onChangeSubmitDateState(event) {
        let value = event.target.value
        let newDateString = value.slice(5, 7) + "-" + value.slice(8) + "-" + value.slice(0, 4); //had to rearange the date string so date wouldnt be one day off (was happening when doing it this way: newDate Date(value))
        let newDate = new Date(newDateString);
        props.setSubmitDate(newDate)
      }

      function onChangeUserName(event) { //When user name field is typed into, userName state is changed
        props.setUserName(event.target.value)
      }

      function changeTotalBarsState(event) {
        event.preventDefault();
        // console.log(document.getElementsByClassName("totalDayBarsInput").totalBars.placeholder)
        props.setTotalDayBars(parseInt(totalBarsInput.totalBars.value));
        // console.log(typeof totalBarsInput.totalBars.value)
        if (totalBarsInput.totalBars.value == props.totalDayBars || event.target.value == "") {
            setDisableChangeTotalButton(true);
        } else {
            setDisableChangeTotalButton(false);
        }
      }
      function onChangeTotalDayBarsInput(event) {
        event.preventDefault();
        if (event.target.value == props.totalDayBars || event.target.value == "") {
            setDisableChangeTotalButton(true);
        } else {
            setDisableChangeTotalButton(false);
        }
      }

      ////////////CREATE HTML Functions
      var countArray = [];
    const DefectedBars = props.defectBarList.map(bar => {
        countArray.push("count") // This keeps a running number for displaying next to each bar. Use .length each iteration of .map 
        const BarDefects = bar.defects.map((defect, index) => { //Creates each bar's individual defect list items
            return (
                <li 
                    className='reviewFormDefectItem'
                    key={`${index}-${defect.location}-${defect.side}-${defect.orientation}-${defect.typeDefect}`}
                >
                    <h3>{defect.location}</h3>
                    <h3>{defect.orientation}</h3>
                    <h3>{defect.side}</h3>
                    <h3>{defect.typeDefect}</h3>
                </li>
            )
        })
        return ( //Creates each bar list item on the review page 
            <div 
                className='reviewFormListItem'
                key={`ReviewBar${countArray.length}`}
            >
                <li className='defectiveBar '>
                    <h2>{countArray.length}</h2>
                    <h2>{bar.barType}</h2>
                    <h2>{bar.materialType}</h2>
                    <h2>Phase {bar.phase}</h2>
                    {/* <h2>{bar.temp}°F</h2> */}{/*will be used for paint app*/}  
                    <h2>{bar.humidity}%</h2>
                    <h2>{bar.width}mm</h2>
                    <h2>Rack {bar.rackPosition}</h2>
                </li>
                {BarDefects}
            </div>
        )
    })

    

    return (
        <form className={props.showReview 
        ? 'showReviewForm' : 'popupForm'}
        onKeyDown={(event) => {if (event.key == 'Enter') event.preventDefault();}} //Prevents user from submitting form with enter key
        >
        <div className='textInputContainer'>
            <button                             
                className={`${props.showReview && "showSubmit"} finalSubmitButton reviewButton`}
                onClick={props.userName != 'Not set' 
                        ? props.submitDayToDatabase
                        : props.onSubmitUserNameNotSet}
                >
                Submit
            </button>
            <div 
                className="userNameInputFieldContainer"
                style={props.submitFailedBCUserName && props.userName == "Not set" 
                    ? {boxShadow: '3px 10px 42px 26px rgba(140,71,71,0.8)'} 
                    : {}}
            >
                <label htmlFor='userName'>User</label>
                <select
                    type="text" 
                    id="userName" 
                    name="userName"
                    // defaultValue={props.userName} did not help ( username selection reverts to Not set when bar is added even though State stays the same)
                    onChange={onChangeUserName}
                >               
                <option
                    value="Not set"
                    key="NotSet"
                    >
                        Not set
                </option>
                    {userOptionsHTML}
                </select>

            </div>
            <div className="submitDateInputFieldContainer">
                <label htmlFor='submitDate'>Date</label>
                <input 
                    type="date" 
                    id="submitDate" 
                    name="submitDate"
                    onChange={onChangeSubmitDateState} 
                />
            </div>
            <div className="totalDayBarsInputFieldContainer">
                <label htmlFor='totalBars'>Total Bars{` = ${props.totalDayBars} `}<br></br> {`(${props.totalDayBars - props.defectBarList.length} good + ${props.defectBarList.length} defective)`}</label>
                <input
                    type="number"  
                    id="totalBars" 
                    name="totalBars"
                    className="totalDayBarsInput"
                    placeholder={props.totalDayBars}
                    onChange={onChangeTotalDayBarsInput}
                />
                <button 
                    onClick={changeTotalBarsState}
                    disabled = {disableChangeTotalButton
                        ? "disabled" 
                        : ""}
                >
                Change Total
                </button>
            </div>
                <BackButton 
                    returnToBarInputScreen={props.returnToBarInputScreen}
                />
        </div>
        <div className='defectReviewContainer'>
            <h1>Defects for {`${props.submitDate.getMonth() + 1}/${props.submitDate.getDate()}/${props.submitDate.getFullYear()}`}</h1>
            <ul className='defectReviewList'>
                {DefectedBars}
            </ul>
        </div>
        </form>
    )
}