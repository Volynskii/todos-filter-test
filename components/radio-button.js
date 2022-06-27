import React from "react";


const RadioButton = ({radioValue,value, label, id, onChange}) => {

    let isSelected = radioValue === value;
    return (
       <>
            <input id={id} onChange={onChange} value={value} type="radio" checked={isSelected} />
            <label htmlFor={id}>{label}</label>
        </>
    );
};

export default RadioButton;
