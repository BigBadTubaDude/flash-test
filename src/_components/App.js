import './App.css';
import React from 'react'
import BarTypePanel from "./BarTypePanel"
import MaterialToggle from './MaterialToggle';
function App() {
  //////////////////////////////////States
  const [currentBarType, setCurrentBarType] = React.useState("");
  const [currentMaterialType, setCurrentMaterialType] = React.useState("");
  const [currentNumFaults, setCurrentNumFaults] = React.useState(1);

  ///////////////////////////////EFFECTS
  
  React.useEffect( () => {//On change of current bar type
    setCurrentNumFaults(1);// Resets number of faults to 1
    if (currentBarType == "CU Straight") { //if bar type is switched to CU Straight, current material is set to Copper
      setCurrentMaterialType("Copper");
    }
  },
  [currentBarType]
    );
    React.useEffect( () => {//On change of current material type
      if (currentBarType == "CU Straight") {//If bar type is CU Straight and user tries to change material to AL, will not let them
        setCurrentMaterialType("Copper");
      }
    },  [currentMaterialType]
      
  );

  ////////////////////////////////Variables
  //Holds all bar types. add or subtract from this array and the corresponding panel will be added/deleted automatically
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
  
  /////////////////////////FUNCTIONS
  //These two functions increase and decrease currentNumberFaults State in App
  function increaseFaultCount(event) {
    event.preventDefault();
    //Icon was blocking onClick event (it was grabbing the value of the icon not the button). Used currentTarget to fix this
    console.log(event.currentTarget.value);
    setCurrentBarType(event.currentTarget.value)
    setCurrentNumFaults(oldNum => { return (oldNum + 1)})
  }
  function decreaseFaultCount(event) {
    setCurrentBarType(event.currentTarget.value)
    setCurrentNumFaults(oldNum => { return oldNum > 0 ?  (oldNum - 1) : 0})      
  }


  //////////////////////////Create HTML elements in variables
  //Maps through each bar type in barTypes array to return one panel per bar type
  const barTypePanels = barTypes.map(barType => {
    return (
      <BarTypePanel 
      barNumFaults={currentNumFaults}      
      barType={barType}
      currentBarType={currentBarType}
      increaseFaultCount={increaseFaultCount}
      decreaseFaultCount={decreaseFaultCount}
      setCurrentNumFaults={setCurrentNumFaults}
      setCurrentBarType={setCurrentBarType}
      key={barType}
      />
      )
    })

  /////////////// FINAL HTML
    return (
      <div className="App">
      <header className="App-header">
          <header className='panel1Header'>
            <MaterialToggle 
              selectedMaterial={currentMaterialType} 
              setCurrentMaterialType={setCurrentMaterialType}
            />
          </header>

          <div className="barTypePanelContainer">
            {barTypePanels}
          </div>
      </header>
    </div>
  );
}

export default App;
