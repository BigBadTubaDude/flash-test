//Minimum browser width 590px on Chrome
import './App.css';
import React from 'react'
import BarTypeCard from "./BarTypeCard"
import HeaderPanel1 from './HeaderPanel1';
import DefectItems from './DefecttItems';
import ReviewButton from "./ReviewButton"
import AddButton from './AddButton';
import ReviewForm from './ReviewForm';
import DateObject from 'react-date-object';
import SubmitButton from './SubmitButton'

export default function App() {

  /////////////////////Local storage
  const sessionDefectBarList = //If session storage is not set, variable is set to empty
    localStorage.getItem('defectBarList')
      ? JSON.parse(localStorage.getItem('defectBarList')) 
      : [];    
  const sessionTotalDayBars = //If seesion storage is not set, set to 0
    localStorage.getItem('totalDayBar')
      ? JSON.parse(localStorage.getItem('totalDayBar'))
      : 0
  //////////////////////////////////States
  //Submitted States
  const [defectBarList, setDefectBarList] = React.useState(sessionDefectBarList);
  const [totalDayBars, setTotalDayBars] = React.useState(sessionTotalDayBars);
  const [userName, setUserName] = React.useState("Not set");
  const [showReview, setShowReview] = React.useState(false);
  const todayDate = new Date();
  const [submitDate, setSubmitDate] = React.useState(todayDate)

  //Panel 1 States
  const [currentBarType, setCurrentBarType] = React.useState("");
  const [currentMaterialType, setCurrentMaterialType] = React.useState("");
  const [currentDefectCount, setCurrentDefectCount] = React.useState(1);
  const [currentRackPosition, setCurrentRackPosition] = React.useState("");
  const [currentPhaseSelected, setCurrentPhaseSelected] = React.useState("");
  const [currentTemp, setCurrentTemp] = React.useState("");
  const [currentHumidity, setCurrentHumidity] = React.useState("");
  const [currentWidth, setCurrentWidth] = React.useState("");
  const [showReviewButton, setShowReviewButton] = React.useState(false);
  //Panel 2 States
  const [SideArray, setSideArray] = React.useState(["A"]);
  const [locationArray, setLocationArray] = React.useState([""]);
  const [orientationArray, setOrientationArray] = React.useState(["Top"]);
  const [typeDefectArray, setTypeDefectArray] = React.useState([""]);
  const [showAddButton, setShowAddButton] = React.useState(false);

  ///////////////////////////////EFFECTS
  //Submitted data EFFECTS

  React.useEffect( () => {
    localStorage.setItem('defectBarList', JSON.stringify(defectBarList))
    localStorage.setItem('totalDayBar', JSON.stringify(totalDayBars))
  }, [defectBarList, totalDayBars]

  )
  //Panel 1 EFFECTS
  React.useEffect( () => {//On change of current bar type
    if(currentBarType == "CU Straight") {
      setCurrentMaterialType("Copper")
    }
    },  [currentBarType]
  );

  React.useEffect( () => {//On change of current material type
      if (currentBarType == "CU Straight") {//If bar type is CU Straight and user tries to change material to AL, will not let them
        setCurrentMaterialType("Copper");
      }
    },  [currentMaterialType]
  );

  React.useEffect( () => {//On change of current number of Defects
      currentDefectCountDisplay = currentDefectCount;
  },  [currentDefectCount]
  );

  React.useEffect( () => {
    // if(currentRackPosition == "") {
        document.getElementsByClassName("rackPositionRadioButton").checked = false;
    // }
  }, [currentRackPosition]
  );

  //Panel 2 EFFECTS
  React.useEffect( () => { //When number of defects is reduced, State arrays are truncated so as not to include extra data
    if (currentDefectCount != "") {
      setLocationArray(oldArray => {
        return oldArray.slice(0, currentDefectCount)
      })
      setOrientationArray(oldArray => {
        return oldArray.slice(0, currentDefectCount)
      })
      setTypeDefectArray(oldArray => {
        return oldArray.slice(0, currentDefectCount)
      })
    }

  }, [currentDefectCount]
  );
  React.useEffect(() => {
      if (currentBarType != "" 
      && currentMaterialType != "" 
      && !locationArray.includes("")
      && !typeDefectArray.includes("")
      && currentPhaseSelected != ""
      && currentHumidity != ""
      && currentWidth != "") {
          setShowAddButton(true);
      } else {
          setShowAddButton(false);
      }
  }, [locationArray, typeDefectArray, currentMaterialType, currentBarType, currentDefectCount, currentPhaseSelected, currentWidth, currentHumidity]
  )

  ////////////////////////////////Variables
  //Panel1 Variables
  //Holds all bar types. add or subtract from this array and the corresponding card will be added/deleted automatically
  const barTypes = [
    "DL Straight", 
    "FL Straight", 
    "CU Straight", 
    "OFFSET: EOL/EOR", 
    "PANEL FLANGE", 
    "COMBO FLG", 
    "OFFSET: FOU/FOD",
    "ELBOW: FED/FEU", 
    "ELBOW ER/EL", 
    "COMBO ELBOW",
    "FLAT TEE",
  ]
  var currentDefectCountDisplay = currentDefectCount; //using this variable allows changing of state in one componet(BarTypeCard where up and down buttons are pressed) to be passed up and then passed down as a variable to panel 1 header to be displayed
  /////////////////////////FUNCTIONS
  //Panel 1 Functions
  /////////ON CHANGE FUNCTIONS
  //These two functions increase and decrease currentNumberDefects State in App
  function increaseDefectCount(event) {
    event.preventDefault();
    //Icon was blocking onClick event (it was grabbing the value of the icon not the button). Used currentTarget to fix this
    const eventValue = event.currentTarget.value
    setCurrentDefectCount((oldCount) => { 
      if (oldCount == "") {
        return 1;
      } else {
      let oldCountParsed = parseInt(oldCount, 10);//converts from string to integer
      return (
      oldCountParsed + 1
      )}
    })
    setCurrentBarType(event.currentTarget.value)  //Adjusts bar type State
    //On adding a defect, adds an empty item to defectTypeArray State. 
    setTypeDefectArray( oldArray => { 
      return ([
        ...oldArray,
        ""
      ])
    });
    //On adding a defect, adds an empty item to defectTypeArray State. 
    setSideArray( oldArray => { 
      return ([
        ...oldArray,
        "A"
      ])
    });
    //On adding a defect, adds "Top" item to orientationArray State. 
    setOrientationArray( oldArray => { 
      return ([
        ...oldArray,
        "Top"
      ])
    })  
    setLocationArray( oldArray => {
      return([
        ...oldArray,
        ""
      ])
    })         
  };
  function decreaseDefectCount(event) {
    event.preventDefault();
    const eventValue = event.currentTarget.value
    var oldCountParsed = parseInt(currentDefectCount, 10);//converts from string to integer
    setCurrentDefectCount(oldCountParsed > 1 ? oldCountParsed - 1 : 1) // Sets defect count State to one lower but does not allow it to go below 1                            
    setTypeDefectArray( oldArray => { //On reducing number of defects by clicking down arrow button, an item from the end of defectTypeArray State is deleted. 
      let newArray = oldArray.slice(0, currentDefectCount - 1 != 0 ? currentDefectCount - 1 : 1);
      return (
        newArray
      )
    }) 
    setOrientationArray( oldArray => {
      let newArray = oldArray.slice(0, currentDefectCount - 1 != 0 ? currentDefectCount - 1 : 1);
      return (
        newArray
      )
    })
    setSideArray( oldArray => {
      let newArray = oldArray.slice(0, currentDefectCount - 1 != 0 ? currentDefectCount - 1 : 1);
      return (
        newArray
      )
    })
    setLocationArray( oldArray => {
      let newArray = oldArray.slice(0, currentDefectCount - 1 != 0 ? currentDefectCount - 1 : 1);
      return (
        newArray
      )
    })

    setCurrentBarType(event.currentTarget.value)
  }
  //Onchange of rack position radio buttons, sets rack position state
  function changeRackState(event) { 
    setCurrentRackPosition(event.target.value);
  }  
  //Onchange of Phase selection, changes CurrentPhaseSelected State
  function changePhaseState(event) {
    setCurrentPhaseSelected(event.target.value);
  }
  function changeTempState(event) {
    setCurrentTemp(event.target.value);
  }
  function changeHumidityState(event) {
    setCurrentHumidity(event.target.value);
  }
  function changeWidthState(event) {
    setCurrentWidth(event.target.value);
  }
  function clickReview() {
    setShowReview(oldVal => !oldVal);
  }

  function clickAddBar() {
    setDefectBarList(oldList => { //Sets all defects and bar info to an object and puts object in defectBarList. #ADD# -> Also resets all fields
      
      let defectObjects = []//Puts each defect for the bar being added into an object 
      for (let i = 0; i < orientationArray.length; i++) { 
        defectObjects.push({
          orientation: orientationArray[i],
          side: SideArray[i],
          location:locationArray[i],
          typeDefect:typeDefectArray[i]
        });
      }
      return ([
        ...oldList,
        {
          barType: currentBarType,
          materialType: currentMaterialType,
          phase: currentPhaseSelected,
          temp: currentTemp,
          humidity: currentHumidity,
          width: currentWidth,
          rackPosition: currentRackPosition,
          defects: defectObjects,
      }
      ])
    });
    
    /////RESET ALL FIELDS AFTER ADDING TO DEFECT BAR LIST
    // resetRadioButtons();
    let radios = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radios.length; i++) {
      radios[i].checked = false;
    }
    let inputFields = document.getElementsByTagName("input");
    for(let i = 0; i < inputFields.length; i++) {
      inputFields[i].value = "";
    }
    let selectFields = document.getElementsByTagName("select");
    for (let i = 0; i < selectFields.length; i++) {
      selectFields[i].options[0].selected = true; //Sets all select fields to first options
    } 
    
    //Reset states
    setCurrentBarType("");
    setCurrentMaterialType("");
    setCurrentDefectCount(1);
    setCurrentTemp("");
    setCurrentHumidity("");
    setCurrentWidth("");
    setShowReviewButton(false);
    setSideArray(["A"]);
    setLocationArray([""]);
    setOrientationArray(["Top"]);
    setTypeDefectArray([""]);
    setShowAddButton(false);
    setShowReview(false);
    setCurrentRackPosition("");
    setCurrentPhaseSelected("");
    
    //Add 1 count to total day bars
    setTotalDayBars(oldcount => oldcount + 1);
    //Save defective bar list to session local storage
  }

  function submitDayToDatabase(event) {
    ///////////////////////Write code to send to data base
    event.preventDefault();
    console.log("Submited (not really)")
  }
  function returnToBarInputScreen(event) {
    event.preventDefault();
    setShowReview(false);
  }
  /////////////////////////////////////Panel 2
  function onDefectChange(event, number) {
    event.preventDefault();
    setTypeDefectArray(oldArray => {
      let newArray = [...oldArray];
      newArray[number - 1] = event.target.value //Changes State associated with defect item changed
      return (
        newArray
      )
    });
  }
  function onOrientationChange(event, number) {
    setOrientationArray(oldArray => {
      let newArray = [...oldArray];
      if (event == true) {
        newArray[number - 1] = "Top"; //Changes State associated with defect item changed
      } else {
        newArray[number - 1] = "Bot";
      }
      return newArray;
    });
  }
  function onSideChange(event, number) {
    setSideArray(oldArray => {
      let newArray = [...oldArray];
      if (event == true) {
        newArray[number - 1] = "A";
      } else {
        newArray[number - 1] = "B";
      }
      return newArray;
    })
  }
  function onLocationChange(event, number) {
    setLocationArray(oldArray => {
      let newArray = [...oldArray];
      newArray[number - 1] = event.target.value
      return newArray;
    })

  }
  function increaseTotalDayBars() {
    setTotalDayBars(oldCount => {
      return (
        oldCount + 1)});
        
  }
  function decreaseTotalDayBars() {
    setTotalDayBars(oldCount => {
      if (oldCount > 0) {
      return oldCount - 1
      }
      else {
        return oldCount;
      }          
    })  
  }
  //////////////////////////Create HTML elements in variables
  //Maps through each bar type in barTypes array to return one card per bar type
  const barTypeCards = barTypes.map(barType => {
    return (
      <BarTypeCard 
        barNumDefects={currentDefectCount}      
        barType={barType}
        currentBarType={currentBarType}
        increaseDefectCount={increaseDefectCount}
        decreaseDefectCount={decreaseDefectCount}
        setCurrentDefectCount={setCurrentDefectCount}
        setCurrentBarType={setCurrentBarType}
        key={barType}
      />
      )
    })

  /////////////// FINAL HTML
  return (
    <div className='appContainer'>
        {/*Panel 1*/}
        <div className="Panel1">
          <HeaderPanel1 
            setCurrentPhaseSelected={setCurrentPhaseSelected}
            changeWidthState={changeWidthState}
            changeRackState={changeRackState}
            currentWidth={currentWidth}
            changeTempState={changeTempState}
            changeHumidityState={changeHumidityState}
            currentTemp={currentTemp}
            currentHumidity={currentHumidity}
            changePhaseState={changePhaseState}
            currentPhaseSelected={currentPhaseSelected}
            currentRackPosition={currentRackPosition}
            currentMaterialType={currentMaterialType}
            currentBarType={currentBarType}
            currentDefectCountDisplay={currentDefectCountDisplay}
            currentDefectCount={currentDefectCount}
            setCurrentMaterialType={setCurrentMaterialType}
            setCurrentDefectCount={setCurrentDefectCount}
            setCurrentRackPosition={setCurrentRackPosition}
          />
          <div className="barTypeCardContainer">
            {barTypeCards}
          </div>
          <div className='buttonsContainer'>
            <ReviewButton 
              showReviewButton={totalDayBars >= 0}
              setShowReviewButton={setShowReviewButton}
              showReview={showReview}
              clickReview={clickReview}
              />
            <ReviewForm 
              defectBarList={defectBarList}
              showReview={showReview}
              submitDate={submitDate}
              setSubmitDate={setSubmitDate}
              userName={userName}
              setUserName={setUserName}
              totalDayBars={totalDayBars}
              setTotalDayBars={setTotalDayBars}
              submitDayToDatabase={submitDayToDatabase}
              returnToBarInputScreen={returnToBarInputScreen}
            />

            <AddButton 
              clickAddBar={clickAddBar}
              showReview={showReview}
              showAddButton={showAddButton}              
            />
            <div className='totalDayBarsDiv'>
              <label 
                htmlFor='totalDailyBars'
                className='totalDayBarsLabel'
              >Total Daily Bars
              </label>
              <button 
                className='decreseTotalButton totalInputButton'
                onClick={decreaseTotalDayBars}
                >-
              </button>
                <input 
                    type="number" 
                    name="materialInput" 
                    // onChange={changeDefectCountState}  
                    className='totalBarsInput'
                    min={1}
                    id="totalDailyBars"
                    readOnly
                    value={totalDayBars}
                />
              <button 
                className='increaseTotalButton totalInputButton'
                onClick={increaseTotalDayBars}
                >+
              </button>
            </div>
          </div>
      </div>

        {/*Panel 2*/}
      <DefectItems 
        onDefectChange={onDefectChange}
        currentDefectCount={currentDefectCount}
        onOrientationChange={onOrientationChange}
        onLocationChange={onLocationChange}
        onSideChange={onSideChange}
      />

    </div>
  );
}
