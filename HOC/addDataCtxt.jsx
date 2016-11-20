import React from 'react';
import except from 'except';
import { PropTypeData } from '../Data/PropTypes';

function addDataCtxt(Wrapped) {
  class ContextClass extends React.Component {
    constructor(props) {
      super(props);

      this.refresh = this.refresh.bind(this);
      const data = this.props.data;
      data.setCallback(this.refresh, 'data');

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
      const other = except(this.props, Object.keys(ContextClass.propTypes));
      return (
        <Wrapped
          rowsCount={this.state.data.getSize()}
          {...other}
        />);
    }
  }

  ContextClass.childContextTypes = {
    data: PropTypeData,
    version: React.PropTypes.number,
  };

  ContextClass.propTypes = {
    data: PropTypeData,
  };

  return ContextClass;
}


export default addDataCtxt;
