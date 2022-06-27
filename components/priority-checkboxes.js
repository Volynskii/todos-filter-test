import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import CheckboxButton from "./checkbox-button";

const PriorityCheckboxes = ({ checkboxes }) => {

    const router = useRouter();
    const path = router.pathname;
    const { query } = router;
    const queryKey = checkboxes[0].queryKey;
    const state = query[queryKey]?.split('-');
    const [priorityValue, setPriorityValue] = useState( state || []);

    // set active checkboxes state
    const  priorityChangeHandler = (event) => {
        let foundItemIndex = priorityValue.indexOf(event.target.value);
        let updatedValues = Array.from(priorityValue);

        if (foundItemIndex > -1) {
            updatedValues.splice(foundItemIndex, 1);
        } else {
            updatedValues.unshift(event.target.value)
        }

        setPriorityValue(updatedValues.sort())
    };

// push or remove active checkboxes to or from query string
    useEffect(() => {
        const hasKeys = !!priorityValue.length;
        if (hasKeys) {
            query[queryKey] = priorityValue.join('-');
            router.push({ pathname: path, query: query });
        }
        else {
            delete query[queryKey];
            router.push({ pathname: path, query: query });
        }
    },[priorityValue]);
    return (
        <>
        {checkboxes.map(({title,items},index) => (
                <div key={index}>
                    <h1>{title}</h1>
                    {items.map(({id,value,label}) => (
                        <div key={id} >
                            <CheckboxButton onChange={priorityChangeHandler} id={id} value={value} label={label} priorityValue={priorityValue}/>
                        </div>
                    ))}
                </div>
            ))}
            </>
    );
};

export default PriorityCheckboxes;
