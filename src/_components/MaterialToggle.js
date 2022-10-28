import { Radio } from 'antd';
import "./radio.css"
import React, { useState } from 'react';
// import { OmitProps } from 'antd/lib/transfer/ListBody';
const options = [
  {
    label: 'AL',
    value: 'Aluminum',
  },
  {
    label: 'CU',
    value: 'Copper',
  }
];
const MaterialToggle = (props) => {
  const [checked, setChecked] = useState('');
  const setType = ({ target: { value } }) => {
    props.setCurrentMaterialType(() => {
      return (
        props.currentBarType != "CU Straight" // Use effect in App was setting back to Copper, but user could see Aluminum flash for a split second, this disallows switching in the first place
          ? value
          : "Copper"
      )
    })

  };

  return (
    <div className='materialSelectSection'>
      <h1>{props.currentMaterialType}</h1>
      <Radio.Group 
        className="materialRadio" 
        options={options} 
        onChange={setType} 
        value={checked} 
        optionType="button" />
    </div>
  );
};
export default MaterialToggle;