# react-match-width

A react utility (in the form of a higher order component) that makes it easy use the width media query allowing a higher degree of flexibility than CSS Media Queries

## Installation

```bash
yarn add react-match-width
```

or

```bash
npm install react-match-width --save
```

## Features

### Basic usage
```javascript
import { matchWidth } from 'react-match-width';

class MyComp extends Component {
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
})(MyComp);
```

### Setting global defaults

When rendering on the server, there is no `window` to query so we need to set some defaults in order to have an answer. This can be achieved by wrapping this component

```javascript
// helpers/match-width-with-defaults.js
import { withDefaults } from 'react-match-width';

// produce a default enabled version of the module
const { matchWidth } = withDefaults({
  width: '1200px', // default is: 1280px
});


// app.js
import { matchWidth } from 'helpers/match-width-with-defaults.js'
// ... use it as usual
```

### Setting local defaults

Each use of the higher order component can specify the defaults for that use, just add a second parameter to the HOC call

```javascript
//... define your component MyComp then wrap it:
export default matchWidth({
  isBig: { minWidth: '700px' },
  isMedium: { minWidth: '420px', maxWidth: '700px' },
  isSmall: { maxWidth: '420px' },
}, {
  width: '500px',
})(MyComp);
```

### The _matched_ API

```javascript
import { matched } from 'react-match-width';


function SomeComponent(/* props */) {
  return <div>Some comp</div>;
}

const ForNotSmall = matched(SomeComponent, {minWidth: '420px'});

class TestMatched extends Component {
  render() {
    return (
      <div>
        Render for not-small:
        <ForNotSmall />
      </div>
    );
  }
}
```

### The _renderIf_ API

```javascript
import { renderIf } from 'react-match-width';

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
```

## Future

Because this is a higher order component, it's config --the queries themselves-- is defined statically, maybe find a way of defining them dynamically 

# Credits

It uses [matchmedia](https://github.com/iceddev/matchmedia), a wrapper over [matchMedia API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) that also supports server rendering

# Related projects

* https://github.com/viruschidai/react-match-media - supports only the `matched` API style
* https://github.com/contra/react-responsive - similar project but does not expose a HoC
* https://github.com/paulirish/matchMedia.js/ - polifill
* https://github.com/weblinc/media-match - another polifill


# TODOs:

* pass in the defaults at runtime (dev purposes, no dynamic)
* maybe add a defaults provider
* support local default also for non hoc apis
* tests
* types
* CI
* document node and browser compatibility