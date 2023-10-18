import React from 'react';
import './FilterCheckbox.css';
import filterCheckboxSwitchOn from '../../images/filter-checkbox__switch-on.svg';
import filterCheckboxSwitchOff from '../../images/filter-checkbox__switch-off.svg';

function FilterCheckbox(props) {
    return (
        <label className='filter-checkbox app-text'>
            <input type='checkbox' className='filter-checkbox__checkbox' />
            <img className='filter-checkbox__switch filter-checkbox__switch-off app-link'
                src={filterCheckboxSwitchOff} alt='Не выбрано' />
            <img className='filter-checkbox__switch filter-checkbox__switch-on app-link'
                src={filterCheckboxSwitchOn} alt='Выбрано' />
           {props.checkboxLabel}
        </label>
    );
}

export default FilterCheckbox;