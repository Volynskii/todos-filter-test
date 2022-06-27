import React from 'react';
import dataPriority from "../utils/priorityData";
import dataTags from "../utils/tagsData";
import dataSort from "../utils/sortData";
import dynamic from "next/dynamic";

const PriorityCheckboxes = dynamic(() => import('./priority-checkboxes'));
const SortRadios = dynamic(() => import('./sort-radios'));

const Form = () => {

    return (
        <>
            <div className="form-wrapper">
                <div className="form-filter">
                    <div className="form-filter__item">
                        <div className="form-filter__item__block">
                            <SortRadios radios={dataSort}/>
                        </div>
                    </div>
                    <div className="form-filter__item">
                        <div className="form-filter__item__block">
                            <PriorityCheckboxes checkboxes={dataPriority}/>
                        </div>
                        <div className="form-filter__item__block">
                            <PriorityCheckboxes checkboxes={dataTags}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form;
