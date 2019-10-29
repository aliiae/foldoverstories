import React from 'react';

const AnimateLoad = (WrappedComponent) => (
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { didMount: false };
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({ didMount: true });
      }, 0);
    }

    render() {
      const { didMount } = this.state;
      return (
        <div className={`section fade-in full-page ${didMount && 'visible'}`}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
);

export default AnimateLoad;
