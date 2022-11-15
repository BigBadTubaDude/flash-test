import { Radio } from 'antd';
import "./radio.css"
import React, { useState } from 'react';

const options = [
    {
      label: 'Dip',
      value: 'Dipped',
    },
    {
      label: 'Spray',
      value: 'Sprayed',
    }
  ];

  const DipSprayToggle = (props) => {
    const [checked, setChecked] = useState('');
    const setType = ({ target: { value } }) => {
      props.setCurrentDipSprayType(value)
  
    };
  
    return (
      <div className='dipSpraySelectSection'>
        <h1>{props.currentDipSprayType}</h1>
        <Radio.Group 
          className={props.currentDipSprayType == ""
            ? "materialRadio incompleteFieldParentOfParent" //Change this and css to dipSprayRadio
            : "materialRadio" 
          }  
          options={options} 
          onChange={setType} 
          value={checked} 
          optionType="button" />
      </div>
    );
  };
  export default DipSprayToggle;