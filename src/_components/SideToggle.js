import { Radio } from 'antd';
import "./radio.css"
import React, { useState } from 'react';
// import { OmitProps } from 'antd/lib/transfer/ListBody';
const options = [
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'B',
    value: 'B',
  }
];
const SideToggle = (props) => {
  const [checked, setChecked] = useState('');
  const setType = ({ target: { value } }) => {
    props.setCurrentSideSelected(() => {
      return (
        value

      )
    })

  };

  return (
    <div className='materialSelectSection'>
      <h1>{`${props.currentSideSelected} Side`}</h1>
      <Radio.Group 
        className="materialRadio" 
        options={options} 
        onChange={setType} 
        value={checked} 
        optionType="button" />
    </div>
  );
};
export default SideToggle;