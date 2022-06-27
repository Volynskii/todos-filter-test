import React from 'react';

const CheckboxButton = ({priorityValue,value, label, id, onChange}) => {
    let isChecked = priorityValue.includes(value);
    return (
       <>
           <div className="form-filter__item__container">
           <input onChange={onChange} checked={isChecked} value={value} type="checkbox"  id={id} />
           <label htmlFor={id}>{label}</label>
           </div>
           </>
    );
};

export default CheckboxButton;
