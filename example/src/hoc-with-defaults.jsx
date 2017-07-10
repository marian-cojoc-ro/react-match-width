// get the default maker
import { withDefaults } from '../../src/';

// produce a default enabled version of the module
const { matchWidth, renderIf, matched } = withDefaults({
  width: '1200px',
});

// export new version
export {
  matchWidth,
  renderIf,
  matched,
}