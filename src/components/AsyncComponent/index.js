import React from 'react';

function AsyncComponent(getComponent) {
  return class AsyncComponentWrapper extends React.Component {
    static Component = null;

    constructor(props) {
      super(props);
      this.state = { Component: AsyncComponentWrapper.Component };
    }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponentWrapper.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      return Component
        ? <Component {...this.props} />
        : 'Loading...';
    }
  };
}

export default AsyncComponent;
