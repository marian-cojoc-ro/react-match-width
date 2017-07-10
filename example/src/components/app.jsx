import React, { Component } from 'react';
import TestHoc from 'components/test-hoc';
import TestRenderIf from 'components/test-render-if';
import TestMatched from 'components/test-matched';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      show: true,
    };
  }
  renderIt() {
    if (!this.state.show) {
      return <div>Hidden</div>;
    }
    return (
      <div>
        <h1>react-match-width</h1>
        <TestHoc />
        <hr />
        <TestRenderIf />
        <hr />
        <TestMatched />
        <hr />
      </div>
    );
  }
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              show: !this.state.show,
            });
          }}
        >Show/Hide</button>
        {this.renderIt()}
      </div>
    );
  }
}

export default App;