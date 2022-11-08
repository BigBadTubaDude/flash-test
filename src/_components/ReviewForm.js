import DateObject from "react-date-object";
export default function ReviewForm(props) {
    let todayDate = props.submitDate;
    function onChangeSubmitDateState(event) {
        let value = event.target.value
        let newDateString = value.slice(5, 7) + "-" + value.slice(8) + "-" + value.slice(0, 4); //had to rearange the date string so date wouldnt be one day off (was happening when doing it this way: newDate Date(value))
        let newDate = new Date(newDateString);
        props.setSubmitDate(newDate)
      }
    return (
        <form className={props.showReview 
        ? 'showReviewForm' : 'popupForm'
        }>
        <div className='defectReviewContainer'>
            <h1>Defects for {`${props.submitDate.getMonth() + 1}/${props.submitDate.getDate()}/${props.submitDate.getFullYear()}`}</h1>
            <ul className='defectReviewList'></ul>
        </div>
        <div className='textInputContainer'>
            <label htmlFor='user'>User</label>
            <input type="text" id="user" name="user"/>
            <label htmlFor='date'>Date</label>
            <input onChange={onChangeSubmitDateState} type="date" placeholder={todayDate} id="date" name="date"/>
            <label htmlFor='totalBars'>Total Bars</label>
            <input type="number"  id="totalBars" name="totalBars"/>
        </div>
        </form>
    )
}