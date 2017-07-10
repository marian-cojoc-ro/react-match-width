import React, { Component } from 'react';
import { renderIf } from '../../../src/';

const IfSmall = renderIf({maxWidth: '420px'});

class TestRenderIf extends Component {
  render() {
    return (
      <div>
        Will render if small:
        <IfSmall>
          This is small
        </IfSmall>
      </div>
    );
  }
}
export default TestRenderIf;