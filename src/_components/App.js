import './App.css';
import React from 'react'
import FaultInput from "./FaultInput"
import RadioButtons from './ANTRadio';
function App() {
  const [currentBarType, setCurrentBarType] = React.useState("");
  const [currentMaterialType, setCurrentMaterialType] = React.useState("");
  const [currentNumFaults, setCurrentNumFaults] = React.useState(0);

  const barTypes = ["DL Straight", "FL Straight", "CU Straight", "OFFSET: EOL/EOR", "PANEL FLANGE", "COMBO FLG", "ELBOW: EL", "ELBOW ER", "FLAT TEE"]
  function updateFaultNumbers() {
    let faultNumberInputs = barTypes.map(barType => {
      function increaseFaultCount(event) {
        event.preventDefault();
        //Icon was blocking onClick event (it was grabbing the value of the icon not the button). Used currentTarget to fix this
        console.log(event.currentTarget.value);
        setCurrentBarType(event.currentTarget.value)
        setCurrentNumFaults(oldNum => { return (oldNum + 1)})
      }
      function decreaseFaultCount(event) {
        setCurrentBarType(event.currentTarget.value)
        setCurrentNumFaults(oldNum => { return (oldNum - 1)})      
      }
        return (
          <FaultInput 
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
  }
  updateFaultNumbers();
  // React.useEffect( updateFaultNumbers(),
  //   [currentBarType]
  // )
      const faultNumberInputs = barTypes.map(barType => {
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
        return (
          <FaultInput 
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
/////////////// FINAL HTML
  return (
    <div className="App">
      <header className="App-header">
        {/* {FaultInput} */}
          <RadioButtons selectedMaterial={currentMaterialType} handleChange={setCurrentMaterialType}/>
      {faultNumberInputs}
      </header>
    </div>
  );
}

export default App;
