//Minimum browser width 1250 on Chrome
import './App.css';
import React from 'react'
import BarTypeCard from "./BarTypeCard"
import HeaderPanel1 from './HeaderPanel1';
import DefectItems from './DefecttItems';

export default function App() {



  //////////////////////////////////States
  //Panel 1 States
  const [currentBarType, setCurrentBarType] = React.useState("");
  const [currentMaterialType, setCurrentMaterialType] = React.useState("");
  const [currentDefectCount, setCurrentDefectCount] = React.useState(1);
  const [currentRackPosition, setCurrentRackPosition] = React.useState("")
  //Panel 2 States
  const [locationArray, setLocationArray] = React.useState([""]);
  const [orientationArray, setOrientationArray] = React.useState(["Top"]);
  const [typeDefectArray, setTypeDefectArray] = React.useState([""]);

  ///////////////////////////////EFFECTS
  //Panel 1
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

  //Panel 2
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

// React.useEffect( () => {

// }, []

// );
  ////////////////////////////////REFS


  ////////////////////////////////Variables
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
    "FLAT TEE"
  ]
  var currentDefectCountDisplay = currentDefectCount; //using this variable allows changing of state in one componet(BarTypeCard where up and down buttons are pressed) to be passed up and then passed down as a variable to panel 1 header to be displayed
  /////////////////////////FUNCTIONS
  //Panel1
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
      //   (currentBarType === "" ||
      //   eventValue != currentBarType//if no bartype is selected, or bar type is changing, reset to 1 and increment to 2
      //   )  
      //   ? 1 + 1 
      //   : 
      oldCountParsed + 1 // No reset
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
    //On adding a defect, adds "Top" item to orientationArray State. 
    setOrientationArray( oldArray => { 
      return ([
        ...oldArray,
        "Top"
      ])
    })           
  };
  function decreaseDefectCount(event) {
    event.preventDefault();
    const eventValue = event.currentTarget.value
    var oldCountParsed = parseInt(currentDefectCount, 10);//converts from string to integer
    setCurrentDefectCount(oldCountParsed > 1 ? oldCountParsed - 1 : 1) // Sets defect count State to one lower but does not allow it to go below 1                            
    setTypeDefectArray( oldArray => { //On reducing number of defects by clicking down arrow button, an item from the end of defectTypeArray State is deleted. 
      let newArray = oldArray.slice(0, currentDefectCount - 1);
      
      return (
        newArray
      )
    }) 
    setOrientationArray( oldArray => {
      let newArray = oldArray.slice(0, currentDefectCount - 1);
      return (
        newArray
      )
    }

    );
    setCurrentBarType(event.currentTarget.value)
  }
  //Onchange of rack position radio buttons, sets rack position state
  function changeRackState(event) { 
    setCurrentRackPosition(event.target.value);
  }  

  //Panel 2
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
    // event.preventDefault();
    setOrientationArray(oldArray => {
      let newArray = [...oldArray];
      if (event == true) {
        newArray[number - 1] = "Top" //Changes State associated with defect item changed
      } else {
        newArray[number - 1] = "Bottom"
      }

      

      return (
        newArray
      )
    });
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
            currentRackPosition={currentRackPosition}
            currentMaterialType={currentMaterialType}
            currentBarType={currentBarType}
            changeRackState={changeRackState}
            currentDefectCountDisplay={currentDefectCountDisplay}
            currentDefectCount={currentDefectCount}
            setCurrentMaterialType={setCurrentMaterialType}
            setCurrentRackPosition={setCurrentRackPosition}
            setCurrentDefectCount={setCurrentDefectCount}
          />
          <div className="barTypeCardContainer">
            {barTypeCards}
          </div>
      </div>

        {/*Panel 2*/}
      <DefectItems 
        onDefectChange={onDefectChange}
        currentDefectCount={currentDefectCount}
        onOrientationChange={onOrientationChange}
      />

    </div>
  );
}
