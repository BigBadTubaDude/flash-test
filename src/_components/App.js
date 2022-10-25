import './App.css';
import React from 'react'
import FaultInput from "./FaultInput"
import RadioButtons from './ANTRadio';
function App() {
  const [numfaults, setnumFaults] = React.useState([
    {barType: "DL Straight", numFaults : 0},
    {barType: "FL Straight", numFaults : 0},
    {barType: "CU Straight", numFaults : 0},
    {barType: "OFFSET: EOL/EOR", numFaults : 0},
    {barType: "PANEL FLANGE", numFaults : 0},
    {barType: "COMBO FLG", numFaults : 0},
    {barType: "ELBOW: EL", numFaults : 0},
    {barType: "ELBOW ER", numFaults : 0},
    {barType: "FLAT TEE", numFaults : 0},
  ]);
  const [selectedMaterialType, setSelectedMaterialType] = React.useState("");
  const faultNumberInputs = numfaults.map(barType => {
    function increaseFaultCount(event) {
      event.preventDefault();
       // setnumfaults()
      console.log(event.target.value);
  
      //Sets material type based on FaultInput clicked
      // setSelectedMaterialType((event.target.value).slice(0,2));
      // setnumFaults((event.target.value).slice(2));
      // if () { //depending on first 
      // }
    }
      return (
        <FaultInput 
          barNumFaultsInfo={barType.numFaults}
          barType={barType.barType}
          key={barType.barType}
          increaseFaultCount={increaseFaultCount}
        />
      )
  });

  return (
    <div className="App">
      <header className="App-header">
        {/* {FaultInput} */}
          <RadioButtons selectedMaterial={selectedMaterialType} handleChange={setSelectedMaterialType}/>
      {faultNumberInputs}
      </header>
    </div>
  );
}

export default App;
