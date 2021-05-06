import React from 'react';
import Loader from '../loader';

const asyncComponent = (importComponent: any): any => {
  class AsyncComponent extends React.Component {
    constructor(props:any) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    render() {
      const { component: C }: any = this.state;

      return C ? <C {...this.props} /> : <Loader />;
    }
  }

  return AsyncComponent;
};

export default asyncComponent;
