import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

function addForm(Cell, FormElement = FormControl, ValuePropType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.object,
])) {
  const FormCell = ({ children, value, columnKey, placeholder, onChange, ...other }) => {
    let data = value;
    if (typeof (data) === 'object' &&
        {}.hasOwnProperty.call(data, columnKey)) {
      data = data[columnKey];
    }

    return (
      <Cell columnKey={columnKey} {...other} >
        {children}
        <FormControl
          type="text"
          value={data}
          placeholder={placeholder}
          onChange={e => onChange(columnKey, e.target.value)}
        />
      </Cell>);
  };

  FormCell.propTypes = {
    children: PropTypes.node,
    value: ValuePropType,
    columnKey: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  return FormCell;
}


export default addForm;
