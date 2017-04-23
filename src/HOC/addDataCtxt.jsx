import React from 'react';
import PropTypes from 'prop-types';
import except from 'except';
import { BasicData } from '../PropTypes';

function addDataCtxt(Wrapped) {
  class DataClass extends React.Component {
    constructor(props) {
      super(props);

      this.refresh = this.refresh.bind(this);
      const data = this.props.data;
      if (typeof data.setCallback === 'function') {
        data.setCallback(this.refresh, 'data');
      }

      this.state = {
        data: props.data,
        version: 0,
      };
    }

    getChildContext() {
      return {
        data: this.state.data,
        version: this.state.version,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (JSON.stringify(nextProps.data) !== JSON.stringify(this.state.data)) {
        this.setState({
          data: nextProps.data,
        });
      }
    }

    // Force a refresh or the page doesn't re-render
    //
    // The name of the state variable is irrelevant, it will simply trigger
    // an update event that is propagated into the cells
    refresh() {
      this.setState({
        version: this.state.version + 1,
      });
    }

    render() {
      const other = except(this.props, Object.keys(DataClass.propTypes));
      return (
        <Wrapped
          rowsCount={this.state.data.getSize()}
          {...other}
        />);
    }
  }

  DataClass.childContextTypes = {
    data: BasicData,
    version: PropTypes.number,
  };

  DataClass.propTypes = {
    data: BasicData,
  };

  return DataClass;
}


export default addDataCtxt;
