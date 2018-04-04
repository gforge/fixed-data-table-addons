// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { BasicData } from '../PropTypes';
import type { BasicDataType } from '../PropTypes/BasicData';

function addDataCtxt<P: { data: BasicDataType }>(
  Wrapped: React.ComponentType<P & { rowsCount: number }>,
): React.Component<P, { data: BasicDataType, version: number }> {
  class DataClass extends React.Component<
    P,
    { data: BasicDataType, version: number }>
  {
    constructor(props) {
      super(props);

      this.refresh = this.refresh.bind(this);
      const { data } = this.props;
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

    refresh: Function
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
      return (
        <Wrapped
          rowsCount={this.state.data.getSize()}
          {...this.props}
        />);
    }
  }

  DataClass.childContextTypes = {
    data: BasicData,
    version: PropTypes.number,
  };

  // $FlowFixMe
  return DataClass;
}


export default addDataCtxt;
