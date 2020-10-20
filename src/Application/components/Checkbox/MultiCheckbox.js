import React from 'react';
import SingleCheckBox from './SingleCheckbox';

const MultiCheckbox = (props) => {
  const handleClick = (e) => {
    if (props.onChange) props.onChange({id: e.id, checked: e.checked});
  };
  return props.options.map((item) => {
    return (
      <SingleCheckBox
        {...props}
        label={item.label}
        checked={item.checked}
        id={item.id}
        onChange={handleClick}
        key={item.id}></SingleCheckBox>
    );
  });
};

export default MultiCheckbox;
