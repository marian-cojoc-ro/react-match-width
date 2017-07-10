import React, { Component } from 'react';
import { matched } from '../../../src/';


function SomeComponent(/* props */) {
  return <div>Some comp</div>;
}

const ForBig = matched(SomeComponent, {minWidth: '420px'});

class TestMatched extends Component {
  render() {
    return (
      <div>
        Render for not-small:
        <ForBig />
      </div>
    );
  }
}

export default TestMatched;
