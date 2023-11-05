import React from 'react';
import './FilterCheckbox.css';
import filterCheckboxSwitchOn from '../../images/filter-checkbox__switch-on.svg';
import filterCheckboxSwitchOff from '../../images/filter-checkbox__switch-off.svg';

function FilterCheckbox(props) {
    return (
        <label className='filter-checkbox app-text'>
            <input type='checkbox' className='filter-checkbox__checkbox' onChange={props.onChange} checked={props.checked} />

            {props.checked ? (
                <img className='filter-checkbox__switch filter-checkbox__switch-on app-link'
                    src={filterCheckboxSwitchOn} alt='Выбрано' />
            ) : (
                <img className='filter-checkbox__switch filter-checkbox__switch-off app-link'
                    src={filterCheckboxSwitchOff} alt='Не выбрано' />
            )}
            {props.checkboxLabel}
        </label>
    );
}

export default FilterCheckbox;
