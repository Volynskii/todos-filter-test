import React, {useState, useEffect} from 'react';
import RadioButton from "./radio-button";
import {useRouter} from "next/router";

const SortRadios = ({radios}) => {

    const queryKey = radios[0].queryKey;
    const router = useRouter();
    const path = router.pathname;
    const { query } = router;
    const state = query[queryKey];
    const [radioValue, setRadioValue] = useState(state || '');

    const  radioChangeHandler = (event) => {
        setRadioValue(event.target.value)
    };

    // push active radio button to query string
    useEffect(() => {
            if (radioValue) {
                query[queryKey] = radioValue;
                router.push({ pathname: path, query: query });
            }
    },[radioValue]);

      return (
          <>
              {radios.map(({title,items},index) =>
                  <React.Fragment key={index}>
                      <h1>{title}</h1>
                      {items.map(({ id, value, label }, index) => (
                          <div key={index} className="form-filter__item__container">
                              <RadioButton onChange={radioChangeHandler} id={id} value={value} label={label} radioValue={radioValue} />
                          </div>
                      ))}
                      </React.Fragment>
              )}
              </>
      )
};

export default SortRadios;

