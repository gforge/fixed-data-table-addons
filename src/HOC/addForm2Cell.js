// @flow
import * as React from 'react';

type FormProps = {
  value: string | number,
  placeholder?: string | number,
  onChange: (columnKey: string | number, value: string | number) => mixed,
}

const FormControl = ({ value, placeholder, onChange }: FormProps) => {
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

FormControl.defaultProps = {
  placeholder: null,
};

type FormCellProps = {
  children: React.Node,
  value: mixed,
  columnKey: string | number,
  placeholder: string,
  onChange: (columnKey: string | number, value: mixed) => void,
}
function addForm(
  Cell: React.ComponentType<any>,
  FormElement: React.ComponentType<any> = FormControl,
) {
  const FormCell = ({
    children, value, columnKey, placeholder, onChange, ...other
  }: FormCellProps) => { // eslint-disable-line
    let data = value;
    if (typeof (data) === 'object' &&
        {}.hasOwnProperty.call(data, columnKey)) {
      data = data[columnKey];
    }

    return (
      <Cell columnKey={columnKey} {...other} >
        {children}
        <FormElement
          type="text"
          value={data}
          placeholder={placeholder}
          onChange={e => onChange(columnKey, e.target.value)}
        />
      </Cell>);
  };

  return FormCell;
}

export default addForm;
