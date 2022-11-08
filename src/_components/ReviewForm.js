export default function ReviewForm(props) {
    const todayDate = new Date();
    return (
        <form className={props.showReview 
        ? 'showReviewForm' : 'popupForm'
        }>
        <div className='defectReviewContainer'>
            <h1>Defects for {`date`}</h1>
            <ul className='defectReviewList'></ul>
        </div>
        <div className='textInputContainer'>
            <label htmlFor='user'>User</label>
            <input type="text" id="user" name="user"/>
            <label htmlFor='date'>Date</label>
            <input type="date" placeholder={todayDate} id="date" name="date"/>
            <label htmlFor='totalBars'>Total Bars</label>
            <input type="number"  id="totalBars" name="totalBars"/>
        </div>
        </form>
    )
}