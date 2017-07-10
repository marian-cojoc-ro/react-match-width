import React, { Component } from 'react';

import { matchWidth } from '../../../src/';

class TestHoc extends Component{
  render() {
    return (
      <div>
        isBig: { this.props.isBig ? 'yes' : 'no' }
        <br />
        isMedium: { this.props.isMedium ? 'yes' : 'no' }
        <br />
        isSmall: { this.props.isSmall ? 'yes' : 'no' }
        <br />
      </div>
    );
  }
}

export default matchWidth({
  isBig: { minWidth: '700px' },
  isMedium: { minWidth: '420px', maxWidth: '700px' },
  isSmall: { maxWidth: '420px' },
})(TestHoc);