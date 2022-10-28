//Minimum browser width 1250 on Chrome
import './App.css';
import React from 'react'
import BarTypeCard from "./BarTypeCard"
import HeaderPanel1 from './HeaderPanel1';

export default function App() {
  //////////////////////////////////States
  const [currentBarType, setCurrentBarType] = React.useState("");
  const [currentMaterialType, setCurrentMaterialType] = React.useState("");
  const [currentFaultCount, setCurrentFaultCount] = React.useState(1);
  const [currentRackPosition, setCurrentRackPosition] = React.useState("")

  ///////////////////////////////EFFECTS
  
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

  React.useEffect( () => {//On change of current number of faults
      currentFaultCountDisplay = currentFaultCount;
  },  [currentFaultCount]
  );

  React.useEffect( () => {
    // if(currentRackPosition == "") {
        document.getElementsByClassName("rackPositionRadioButton").checked = false;
        console.log("hi")
    // }


}, [currentRackPosition]

);
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
  var currentFaultCountDisplay = currentFaultCount; //using this variable allows changing of state in one componet(BarTypeCard where up and down buttons are pressed) to be passed up and then passed down as a variable to panel 1 header to be displayed
  /////////////////////////FUNCTIONS
  //These two functions increase and decrease currentNumberFaults State in App
  function increaseFaultCount(event) {
    event.preventDefault();
    //Icon was blocking onClick event (it was grabbing the value of the icon not the button). Used currentTarget to fix this
    const eventValue = event.currentTarget.value
    setCurrentFaultCount((oldCount) => { 
      var oldCountParsed = parseInt(oldCount, 10);//converts from string to integer
      return (
      //   (currentBarType === "" ||
      //   eventValue != currentBarType//if no bartype is selected, or bar type is changing, reset to 1 and increment to 2
      //   )  
      //   ? 1 + 1 
      //   : 
      oldCountParsed + 1 // No reset
      )
    })
    setCurrentBarType(event.currentTarget.value)
        
  }
  function decreaseFaultCount(event) {
    event.preventDefault();
    const eventValue = event.currentTarget.value
    setCurrentFaultCount(oldCount => { 
      var oldCountParsed = parseInt(oldCount, 10);//converts from string to integer
      return (
        // (currentBarType === "" || // reset feature removed
        // eventValue != currentBarType //if no bartype is selected, or bar type is changing, reset to 1
        // )  
        // ? 1
        // :
         oldCountParsed > 1 // does not allow state to go below 1
          ? 
          oldCountParsed - 1
          : 1
      )
    })      
    setCurrentBarType(event.currentTarget.value)
  }

  function changeRackState(event) { //Onchange of rack position radio buttons
    setCurrentRackPosition(event.target.value);
  }  

  // function changeFaultCountState(event) {
  //   console.log(event.target.value);
  //   setCurrentFaultCount(event.target.value);
  // }  

  //////////////////////////Create HTML elements in variables
  //Maps through each bar type in barTypes array to return one card per bar type
  const barTypeCards = barTypes.map(barType => {
    return (
      <BarTypeCard 
        barNumFaults={currentFaultCount}      
        barType={barType}
        currentBarType={currentBarType}
        increaseFaultCount={increaseFaultCount}
        decreaseFaultCount={decreaseFaultCount}
        setCurrentFaultCount={setCurrentFaultCount}
        setCurrentBarType={setCurrentBarType}
        key={barType}
      />
      )
    })

  /////////////// FINAL HTML
    return (
      <div className="Panel1">
        <HeaderPanel1 
          currentRackPosition={currentRackPosition}
          currentMaterialType={currentMaterialType}
          currentBarType={currentBarType}
          changeRackState={changeRackState}
          currentFaultCountDisplay={currentFaultCountDisplay}
          currentFaultCount={currentFaultCount}
          setCurrentMaterialType={setCurrentMaterialType}
          setCurrentRackPosition={setCurrentRackPosition}
          setCurrentFaultCount={setCurrentFaultCount}
        />
        <div className="barTypeCardContainer">
          {barTypeCards}
        </div>
    </div>
  );
}
