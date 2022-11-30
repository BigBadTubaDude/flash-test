//Minimum browser width 590px on Chrome
import './App.css';
import React from 'react'
import BarTypeCard from "./BarTypeCard"
import HeaderPanel1 from './HeaderPanel1';
import ReviewButton from "./ReviewButton"
import AddButton from './AddButton';
import ReviewForm from './ReviewForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PaintDefectItems from './PaintDefectItems';
import FlashDefectItems from './FlashDefectItems';
// import DateObject from 'react-date-object';
// import SubmitButton from './SubmitButton'

export default function App() {
  /////////////////////Local storage
  const sessionDefectBarList = //If session storage is not set, variable is set to empty
    localStorage.getItem('defectBarList')
      ? JSON.parse(localStorage.getItem('defectBarList')) 
      : [];    
  const sessionTotalDayBars = //If seesion storage is not set, set to 0
    localStorage.getItem('totalDayBar')
      ? JSON.parse(localStorage.getItem('totalDayBar'))
      : 0;
  //////////////////////////////////States
  //Retrieved states
  const [firstBarToSubmit, setFirstBarToSubmit] = React.useState();

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
  const [currentDipSprayType, setCurrentDipSprayType] = React.useState("");
  //Panel 2 States
  const [SideArray, setSideArray] = React.useState(["A"]);
  const [locationArray, setLocationArray] = React.useState([""]);
  const [orientationArray, setOrientationArray] = React.useState(["Top"]);
  const [typeDefectArray, setTypeDefectArray] = React.useState([""]);
  const [showAddButton, setShowAddButton] = React.useState(false);
  const [leftRightArray, setLeftRightArray] = React.useState(["Right"])
  //Review Page States
  const [submitFailedBCUserName, setSubmitFailedBCUserName] = React.useState(false);
  
  ///////////////////////////////EFFECTS
  //Submitted data EFFECTS
  
// React.useEffect( () => {
    
// }, [firstBarToSubmit]

// )
function defectInsert(requestOptions) {
  // alert(requestOptions)
    let insertDefectRequestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'query': requestOptions })
    };
    if (defectBarList.length > 0) {   //Only insert if there are bars to insert

      fetch(url, insertDefectRequestOption)
      .then(/*async*/ response => {
        const isJson = response.headers.get('content-type').includes('application/json');
        const data = isJson && /*await*/ response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          // alert(response.ok)
          return Promise.reject(error);
        } else {
          return Promise.resolve(response.ok)
        }
      }            
      ).then(ok => ok,error => {
        console.error('an error!defect', error);
        return error;
      })
      //   //  setDefectBarList([]); //Resets list of bars on review page and in state !!!!!!!!UNCOMMENT
    }
  };

  React.useEffect( () => { //Updates session storage every time total bars or defect bar list state changes
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
      //Review Page
      ////////////Form not ready to be submitted functions
      function onSubmitUserNameNotSet(event) {
        event.preventDefault();
        setSubmitFailedBCUserName(true)
        setTimeout(() => {
            setSubmitFailedBCUserName(false)
        }, 5000);
      }


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
      /////////////////////SQL Variables
      const url = "https://prod-255.westeurope.logic.azure.com:443/workflows/cb8b8807926b4b5da2815dc4c1ca90b4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RqlOaUPwWhyuiXszWUXKPWhpkDfnjgJhccGJUwjw1BY"; 


      //////////////////SQL functions
      function selectSetFirstBarFetchSQL(requestOptions) { //Submits SQL queries and resets / 
        // alert(requestOptions)
        fetch(url, requestOptions)
            .then( response => async function(resolve, reject) {
              response.json().then(data => {
                // set State  
                setFirstBarToSubmit((data.Table1[data.Table1.length - 1].BarId) + 1);//
              });
              const isJson = response.headers.get('content-type').includes('application/json');
              const data = isJson && await response.json();
              if (!response.ok) {
                const error = (data && data.message) || response.status;
                alert("middle of selectfirstbar")
                return Promise.reject(error);
              } else {
                var currentBarId = firstBarToSubmit;
                var insertDefectsQuery = `
                    INSERT INTO [US_Project_Management_Test].[dbo].[Coleman_Paint_Defect_Data]
                    (BarId, Location, DefectType, TopBot, Side, LeftRight, DateEntered)
                    VALUES `;
                for (let b = 0; b < defectBarList.length; b++) {
                  for (let d = 0; d < defectBarList[b]['defects'].length; d++) {
                    insertDefectsQuery += `(
                      ${currentBarId},
                      '${defectBarList[b]['defects'][d]['location']}',
                      '${defectBarList[b]['defects'][d]['typeDefect']}',
                      '${defectBarList[b]['defects'][d]['orientation'][0]}',
                      '${defectBarList[b]['defects'][d]['side']}',
                      '${defectBarList[b]['defects'][d]['leftRight'][0]}',
                      '${submitDate.toISOString().split('T')[0]}'),`
                      ;
                    }
                    currentBarId += 1; //after defects for one bar have all been added, increment BarId for next set of defects
                  }
                  insertDefectsQuery = insertDefectsQuery.slice(0, insertDefectsQuery.length - 1) + ";"
                  alert(insertDefectsQuery + " select")
                  return Promise.resolve(insertDefectsQuery)
              }
            })
        }
      function insertFetchSQL(requestOptions) { //Submits SQL queries and resets 
        if (userName == "Not set") { //checks that userName is set. Does nothing (returns) if not
          return;
        } else {
          fetch(url, requestOptions)
            .then(async response => {                  
              const isJson = response.headers.get('content-type').includes('application/json');
              const data = isJson && await response.json();

              if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              } else {
                var getDataFromDB = "SELECT * FROM [US_Project_Management_Test].[dbo].[Coleman_Paint_Bar_Data]";
                return Promise.resolve( {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({'query': getDataFromDB})
                });

                // return "bars successfully inserted"
              }
              // this.setState({ postId: data.id })
            },error => {
              console.error('an error!bar', error);
              alert("no")
              return error;
            })
            .then(selRequestOptions => selectSetFirstBarFetchSQL(selRequestOptions))
            .then(defRequestOptions => {
              alert(defRequestOptions)
              defectInsert(defRequestOptions)})
          
        }
      }
      // async function fetchSQLTotalBars(requestOptions) { //Submits SQL queries and resets 
      //   return fetch(url, requestOptions)
      //     .then(async response => {
      //       // console.log(response);
      //       const isJson = response.headers.get('content-type').includes('application/json');
      //       const data = isJson &&  await response.json();
      //       if (!response.ok) {
      //         const error = (data && data.message) || response.status;
      //         return Promise.reject(error);
      //       } else return response;
      //       // this.setState({ postId: data.id })
      //     }).catch(error => {
      //       // this.setState({ errorMEssage: error.toString() })
      //       console.error('Already an entry for this user/date', error);
      //     })
      // }
        //Sends data to Paint database tables

      function submitPaintDayToDatabase(event) {
        event.preventDefault();            
        ////////////////////////Insert bars into SQL
        //make string with queries to insert each bar
        var insertBarsQuery = `INSERT INTO [US_Project_Management_Test].[dbo].[Coleman_Paint_Bar_Data]
        (UserName, BarType, Material, Width, Humidity, Temperature, Phase, Rack, DippedSprayed, dateEntered) VALUES `;
        for (let i = 0; i < defectBarList.length; i++) {
          insertBarsQuery += `
             ('${userName}',
              '${defectBarList[i].barType}',
             '${defectBarList[i].materialType}',
             ${parseInt(defectBarList[i].width)},
             ${parseInt(defectBarList[i].humidity)},
             '${parseInt(defectBarList[i].temp)}',
             '${defectBarList[i].phase}','${defectBarList[i].rackPosition}',
             '${defectBarList[i].dipSpray[0]}',
             '${submitDate.toISOString().split('T')[0]}')`
             ;
          // console.log(insertBarsQuery);
          if (i != defectBarList.length - 1) {
            insertBarsQuery += ",";
          } else {
            insertBarsQuery += ";";
          }
        }
        
        ///////////////////Insert Defects into SQL Query

  
        
        ///////Create requestOptions 
        //insert bars request options
        let insertBarRequestOption = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 'query': insertBarsQuery })
        };

        //insert defects request options

        if (defectBarList.length > 0) {   //Only insert if there are bars to insert
          insertFetchSQL(insertBarRequestOption)

          //  setDefectBarList([]); //Resets list of bars on review page and in state !!!!!!!!UNCOMMENT
        }
      }
       //Sends data to Flash Test database tables
  function submitFlashDayToDatabase(event) {
    event.preventDefault();
  }
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
    //On adding a defect, adds "" item to locationArray State.
    setLocationArray( oldArray => {
      return([
        ...oldArray,
        ""
      ])
    })
    //On adding a defect, adds default "Right" item to locationArray State.
    setLeftRightArray( oldArray => {
      return([
        ...oldArray,
        "Right"
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
  //On change of left right toggle
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
  
  function clickAddBar(event) {
    event.preventDefault();
    setDefectBarList(oldList => { //Sets all defects and bar info to an object and puts object in defectBarList. #ADD# -> Also resets all fields
      
      let defectObjects = []//Puts each defect for the bar being added into an object 
      for (let i = 0; i < orientationArray.length; i++) { 
        defectObjects.push({
          orientation: orientationArray[i],
          side: SideArray[i],
          location:locationArray[i],
          typeDefect:typeDefectArray[i],
          leftRight:leftRightArray[i]
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
          dipSpray: currentDipSprayType
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


  


 

  function returnToBarInputScreen(event) {
    event.preventDefault();
    setShowReview(false);
  }
  /////////////////////////////////////Panel 2
  function changeLeftRightState(event, number) {
    
    setLeftRightArray(oldArray => {
      let newArray = [...oldArray];  
      if (event == true) {
        newArray[number - 1] = "Right"; //Changes State associated with defect item changed
      } else {
        newArray[number - 1] = "Left";
      }
      return newArray;
    });
  }
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
    <Router>
      <div 
        className='appContainer'>
          {/*Panel 1*/}
          <div className="Panel1">
            <HeaderPanel1 
              setCurrentPhaseSelected={setCurrentPhaseSelected}
              changeWidthState={changeWidthState}
              changeRackState={changeRackState}
              currentWidth={currentWidth}
              setCurrentDipSprayType={setCurrentDipSprayType}
              currentDipSprayType={currentDipSprayType}
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
            <div className={"barTypeCardContainer"}
            >
              {barTypeCards}
            </div>
            <div className='buttonsContainer'>
              <ReviewButton 
                showReviewButton={totalDayBars >= 0}
                setShowReviewButton={setShowReviewButton}
                showReview={showReview}
                clickReview={clickReview}
                />
                <Switch>
                  <Route path="/flash">
                    <ReviewForm 
                      defectBarList={defectBarList}
                      showReview={showReview}
                      submitDate={submitDate}
                      setSubmitDate={setSubmitDate}
                      userName={userName}
                      setUserName={setUserName}
                      totalDayBars={totalDayBars}
                      setTotalDayBars={setTotalDayBars}
                      returnToBarInputScreen={returnToBarInputScreen}
                      submitDayToDatabase={submitFlashDayToDatabase}
                      onSubmitUserNameNotSet={onSubmitUserNameNotSet}
                      submitFailedBCUserName={submitFailedBCUserName}
                      setSubmitFailedBCUserName={setSubmitFailedBCUserName}
                      submitFailedBCUserName={submitFailedBCUserName}
                    />
                  </Route>
                  <Route path="/paint">
                    <ReviewForm 
                        defectBarList={defectBarList}
                        showReview={showReview}
                        submitDate={submitDate}
                        setSubmitDate={setSubmitDate}
                        userName={userName}
                        setUserName={setUserName}
                        totalDayBars={totalDayBars}
                        setTotalDayBars={setTotalDayBars}
                        returnToBarInputScreen={returnToBarInputScreen}
                        submitDayToDatabase={submitPaintDayToDatabase}
                        onSubmitUserNameNotSet={onSubmitUserNameNotSet}
                        setSubmitFailedBCUserName={setSubmitFailedBCUserName}
                        submitFailedBCUserName={submitFailedBCUserName}
                      />                    
                  </Route>
                </Switch>


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
          <div className='content'>
            <Switch>
              <Route exact path="/flash">
                <FlashDefectItems 
                  typeDefectArray={typeDefectArray}
                  locationArray={locationArray}
                  onDefectChange={onDefectChange}
                  currentDefectCount={currentDefectCount}
                  onOrientationChange={onOrientationChange}
                  onLocationChange={onLocationChange}
                  onSideChange={onSideChange}              
                  />
              </Route>
              <Route exact path="/paint">
                <PaintDefectItems 
                  typeDefectArray={typeDefectArray}
                  locationArray={locationArray}
                  onDefectChange={onDefectChange}
                  currentDefectCount={currentDefectCount}
                  onOrientationChange={onOrientationChange}
                  onLocationChange={onLocationChange}
                  onSideChange={onSideChange}   
                  changeLeftRightState={changeLeftRightState}
                  leftRightArray={leftRightArray}          
                  />
              </Route>
            </Switch>
        </div>
        {/* <DefectItems 
          typeDefectArray={typeDefectArray}
          locationArray={locationArray}
          onDefectChange={onDefectChange}
          currentDefectCount={currentDefectCount}
          onOrientationChange={onOrientationChange}
          onLocationChange={onLocationChange}
          onSideChange={onSideChange}
        /> */}

      </div>
    </Router>
  );
}
