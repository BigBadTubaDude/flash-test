import './App.css';
import React from 'react'
import BarTypePanel from "./BarTypePanel"
import MaterialToggle from './MaterialToggle';
function App() {
  //////////////////////////////////States
  const [currentBarType, setCurrentBarType] = React.useState("");
  const [currentMaterialType, setCurrentMaterialType] = React.useState("");
  const [currentNumFaults, setCurrentNumFaults] = React.useState(0);

  ///////////////////////////////EFFECTS
  React.useEffect( () => {
    setCurrentNumFaults(1);
  },
  [currentBarType]
  )
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
  //Maps through each bar type in barTypes array to return one panel per bar type
  const barTypePanels = barTypes.map(barType => {
    return (
      <BarTypePanel 
      barNumFaults={currentNumFaults}
      setCurrentNumFaults={setCurrentNumFaults}
      barType={barType}
      currentBarType={currentBarType}
      key={barType}
      // disable={currentNumFaults > 0 && currentBarType != barType} // passes a true value if 
      increaseFaultCount={increaseFaultCount}
      decreaseFaultCount={decreaseFaultCount}
      />
      )
    })

  //////////////////////FUNCTIONS
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

    /////////////// FINAL HTML
    return (
      <div className="App">
      <header className="App-header">
        {/* {BarTypePanel} */}
          <MaterialToggle selectedMaterial={currentMaterialType} handleChange={setCurrentMaterialType}/>
      {barTypePanels}
      </header>
    </div>
  );
}

export default App;
