'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var cssMediaquery = _interopDefault(require('css-mediaquery'));

// https://github.com/iceddev/matchmedia

var staticMatch = cssMediaquery.match;
var dynamicMatch = typeof window !== 'undefined' ? window.matchMedia : null;

// our fake MediaQueryList
function Mql(query, values) {
  var self = this;
  if (dynamicMatch) {
    var mql = dynamicMatch.call(window, query);
    this.matches = mql.matches;
    this.media = mql.media;
    // TODO: is there a time it makes sense to remove this listener?
    mql.addListener(update);
  } else {
    this.matches = staticMatch(query, values);
    this.media = query;
  }

  this.addListener = addListener;
  this.removeListener = removeListener;
  this.dispose = dispose;

  function addListener(listener) {
    if (mql) {
      mql.addListener(listener);
    }
  }

  function removeListener(listener) {
    if (mql) {
      mql.removeListener(listener);
    }
  }

  // update ourselves!
  function update(evt) {
    self.matches = evt.matches;
    self.media = evt.media;
  }

  function dispose() {
    mql.removeListener(update);
  }
}

function matchMedia(query, values) {
  return new Mql(query, values);
}

var index = matchMedia;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

// TODO: avoid calling Object.keys so many times

var baseDefaults = {
  width: '1280px'
};

var features = {
  width: 'width',
  minWidth: 'min-width',
  maxWidth: 'max-width'
};

function configToQuery(config) {
  var keys = Object.keys(config);
  var queryParts = [];
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var value = config[key];
    queryParts.push('(' + features[key] + ': ' + value + ')');
  }
  return queryParts.join(' and ');
}

function configToQueries(config) {
  console.log(config);
  var queryNames = Object.keys(config);
  var queries = {};
  queryNames.forEach(function (queryName) {
    var queryConfig = config[queryName];
    var query = configToQuery(queryConfig);
    queries[queryName] = query;
  });
  return queries;
}

/**
 * the main hoc
 * @param params
 * @param localDefaults
 * @param globalDefaults
 * @returns {matchWidthHoc}
 */
function matchWidthFactory(params) {
  var localDefaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var globalDefaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var defaults$$1 = baseDefaults;
  if (localDefaults) {
    defaults$$1 = localDefaults;
  } else if (globalDefaults) {
    defaults$$1 = globalDefaults;
  }
  var queries = configToQueries(params);
  return function matchWidthHoc(Wrapped) {
    var MatchWidthWrapper = function (_Component) {
      inherits(MatchWidthWrapper, _Component);

      function MatchWidthWrapper(props) {
        classCallCheck(this, MatchWidthWrapper);

        var _this = possibleConstructorReturn(this, (MatchWidthWrapper.__proto__ || Object.getPrototypeOf(MatchWidthWrapper)).call(this, props));

        _this._mmi = {}; // match media instances
        _this.state = {};
        _this.update = _this.update.bind(_this);
        return _this;
      }

      createClass(MatchWidthWrapper, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.setup();
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var _this2 = this;

          console.log('unmount');
          Object.keys(this._mmi).forEach(function (queryName) {
            _this2._mmi[queryName].removeListener(_this2.update);
            _this2._mmi[queryName].dispose();
          });
        }
      }, {
        key: 'setup',
        value: function setup() {
          var _this3 = this;

          Object.keys(queries).map(function (queryName) {
            var query = queries[queryName];
            var mmi = index(query, defaults$$1);
            mmi.addListener(_this3.update);
            _this3._mmi[queryName] = mmi;
          });
          this.update();
        }
      }, {
        key: 'update',
        value: function update() {
          var _this4 = this;

          var newState = {};
          Object.keys(this._mmi).forEach(function (queryName) {
            newState[queryName] = _this4._mmi[queryName].matches;
          });

          this.setState(function () {
            return newState;
          });
        }
      }, {
        key: 'render',
        value: function render() {
          return React__default.createElement(Wrapped, _extends({}, this.props, this.state));
        }
      }]);
      return MatchWidthWrapper;
    }(React.Component);

    return MatchWidthWrapper;
  };
}

function renderIf(params) {
  return matchWidthFactory({ theQuery: params })(function (_React$Component) {
    inherits(Comp, _React$Component);

    function Comp() {
      classCallCheck(this, Comp);
      return possibleConstructorReturn(this, (Comp.__proto__ || Object.getPrototypeOf(Comp)).apply(this, arguments));
    }

    createClass(Comp, [{
      key: 'render',
      value: function render() {
        if (this.props.theQuery) {
          if (typeof this.props.children === 'string') {
            return React__default.createElement(
              'div',
              null,
              this.props.children
            );
          }
          return this.props.children;
        }
        return null;
      }
    }]);
    return Comp;
  }(React__default.Component));
}

function matched(Component$$1, params) {
  return matchWidthFactory({ theQuery: params })(function (_React$Component2) {
    inherits(Comp, _React$Component2);

    function Comp() {
      classCallCheck(this, Comp);
      return possibleConstructorReturn(this, (Comp.__proto__ || Object.getPrototypeOf(Comp)).apply(this, arguments));
    }

    createClass(Comp, [{
      key: 'render',
      value: function render() {
        if (this.props.theQuery) {
          return React__default.createElement(Component$$1, this.props);
        }
        return null;
      }
    }]);
    return Comp;
  }(React__default.Component));
}

function matchWidth(params, localDefaults) {
  return matchWidthFactory(params, localDefaults);
}

function withDefaults(globalDefaults) {
  return {
    matchWidth: function matchWidth(params, localDefaults) {
      return matchWidthFactory(params, localDefaults, globalDefaults);
    },
    renderIf: function renderIf(params) {
      return matchWidthFactory({ theQuery: params }, null, globalDefaults)(function (_React$Component3) {
        inherits(Comp, _React$Component3);

        function Comp() {
          classCallCheck(this, Comp);
          return possibleConstructorReturn(this, (Comp.__proto__ || Object.getPrototypeOf(Comp)).apply(this, arguments));
        }

        createClass(Comp, [{
          key: 'render',
          value: function render() {
            if (this.props.theQuery) {
              if (typeof this.props.children === 'string') {
                return React__default.createElement(
                  'div',
                  null,
                  this.props.children
                );
              }
              return this.props.children;
            }
            return null;
          }
        }]);
        return Comp;
      }(React__default.Component));
    },
    matched: function matched(Component$$1, params) {
      return matchWidthFactory({ theQuery: params }, null, globalDefaults)(function (_React$Component4) {
        inherits(Comp, _React$Component4);

        function Comp() {
          classCallCheck(this, Comp);
          return possibleConstructorReturn(this, (Comp.__proto__ || Object.getPrototypeOf(Comp)).apply(this, arguments));
        }

        createClass(Comp, [{
          key: 'render',
          value: function render() {
            if (this.props.theQuery) {
              return React__default.createElement(Component$$1, this.props);
            }
            return null;
          }
        }]);
        return Comp;
      }(React__default.Component));
    }
  };
}

exports.matchWidth = matchWidth;
exports.renderIf = renderIf;
exports.matched = matched;
exports.withDefaults = withDefaults;
