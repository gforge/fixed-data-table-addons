import React, { PropTypes } from 'react';

const FormControl = ({ value, placeholder, onChange }) => {
  const style = {
    display: 'block',
    borderRadius: '0.3em',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#d3d3d3',
    padding: '3px',
  };

  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={style}
    />);
};

FormControl.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // The onChange should take 2 arguments - the columnKey + value
  onChange: PropTypes.func.isRequired,
};

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
