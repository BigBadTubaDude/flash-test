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
    props.setCurrentMaterialType(value);
  };

  return (
    <div className='materialToggle'>
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