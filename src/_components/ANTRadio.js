import { Radio } from 'antd';
import "./radio.css"
import React, { useState } from 'react';
import { OmitProps } from 'antd/lib/transfer/ListBody';
// const plainOptions = ['Apple', 'Pear', 'Orange'];
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
// const optionsWithDisabled = [
//   {
//     label: 'Apple',
//     value: 'Apple',
//   },
//   {
//     label: 'Pear',
//     value: 'Pear',
//   },
//   {
//     label: 'Orange',
//     value: 'Orange',
//     disabled: true,
//   },
// ];
const RadioButtons = (props) => {
  // const [value1, setValue1] = useState('Apple');
  // const [value2, setValue2] = useState('Apple');
  const [checked, setChecked] = useState('Apple');
  // const [value4, setValue4] = useState('Apple');
  // const onChange1 = ({ target: { value } }) => {
  //   console.log('radio1 checked', value);
  //   setValue1(value);
  // };
  // const onChange2 = ({ target: { value } }) => {
  //   console.log('radio2 checked', value);
  //   setValue2(value);
  // };
  const setType = ({ target: { value } }) => {
    console.log('radio3 checked', value);
    props.handleChange(value);
  };
  // const onChange4 = ({ target: { value } }) => {
  //   console.log('radio4 checked', value);
  //   setValue4(value);
  // };
  return (
    <div>
      {/* <Radio.Group options={plainOptions} onChange={onChange1} value={value1} optionType="button" />
      <br />
      <Radio.Group options={optionsWithDisabled} onChange={onChange2} value={value2} />
      <br />
      <br /> */}
      <Radio.Group className="materialRadio" options={options} onChange={setType} value={checked} optionType="button" />
      {/* <br />
      <br />
      <Radio.Group
        options={optionsWithDisabled}
        onChange={onChange4}
        value={value4}
        optionType="button"
        buttonStyle="solid"
      /> */}
    </div>
  );
};
export default RadioButtons;