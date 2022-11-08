import React from 'react';

export default function ReviewForm(props) {
    
    ///////////////////////STATES
    const [disableChangeTotalButton, setDisableChangeTotalButton] = React.useState(true); //If true, Change Total button is disabled
    
    ////////////////////VARIABLES
    let totalBarsInput = document.getElementsByClassName("totalDayBarsInput")
    let todayDate = props.submitDate;

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
        props.setTotalDayBars(totalBarsInput.totalBars.value);
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
    const DefectedBars = props.defectBarList.map(bar => {
        // const BarDefects = bar.defects.map(defect => {
        //     return (
        //         <li className='reviewFormDefectItem'></li>
        //     )
        // })
        return (
            <div className='reviewFormListItem'>
                <li className='defectedBar '>{bar.barType}</li>
                {BarDefects}
            </div>
        )
    })

    

    return (
        <form className={props.showReview 
        ? 'showReviewForm' : 'popupForm'
        }>
        <div className='defectReviewContainer'>
            <h1>Defects for {`${props.submitDate.getMonth() + 1}/${props.submitDate.getDate()}/${props.submitDate.getFullYear()}`}</h1>
            <ul className='defectReviewList'>
                {DefectedBars}
            </ul>
        </div>
        <div className='textInputContainer'>
            <div className="userNameInputFieldContainer">
                <label htmlFor='userName'>User</label>
                <input 
                    type="text" 
                    id="userName" 
                    name="userName"
                    onChange={onChangeUserName}
                />
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
                <label htmlFor='totalBars'>Total Bars{`(${props.totalDayBars})`}</label>
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
        </div>
        </form>
    )
}