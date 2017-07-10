// TODO: avoid calling Object.keys so many times

import React, { Component } from 'react';
import matchmedia from './vendor/matchmedia/index.js';

const baseDefaults = {
  width: '1280px',
};

const features = {
  width: 'width',
  minWidth: 'min-width',
  maxWidth: 'max-width',
};

function configToQuery(config) {
  const keys = Object.keys(config);
  const queryParts = [];
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    const value = config[key];
    queryParts.push(`(${features[key]}: ${value})`);
  }
  return queryParts.join(' and ');
}

function configToQueries(config) {
  console.log(config);
  const queryNames = Object.keys(config);
  const queries = {};
  queryNames.forEach((queryName) => {
    const queryConfig = config[queryName];
    const query = configToQuery(queryConfig);
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
function matchWidthFactory(params, localDefaults = null, globalDefaults = null) {
  let defaults = baseDefaults;
  if (localDefaults) {
    defaults = localDefaults;
  } else if (globalDefaults) {
    defaults = globalDefaults;
  }
  const queries = configToQueries(params);
  return function matchWidthHoc(Wrapped) {

    class MatchWidthWrapper extends Component {
      constructor(props) {
        super(props);
        this._mmi = {}; // match media instances
        this.state = {};
        this.update = this.update.bind(this);
      }
      componentWillMount() {
        this.setup();
      }

      componentWillUnmount() {
        console.log('unmount');
        Object.keys(this._mmi).forEach((queryName) => {
          this._mmi[queryName].removeListener(this.update);
          this._mmi[queryName].dispose();
        });
      }

      setup() {
        Object.keys(queries).map((queryName) => {
          const query = queries[queryName];
          const mmi = matchmedia(query, defaults);
          mmi.addListener(this.update);
          this._mmi[queryName] = mmi;
        });
        this.update();
      }

      update() {
        const newState = {};
        Object.keys(this._mmi).forEach((queryName) => {
          newState[queryName] = this._mmi[queryName].matches;
        });

        this.setState(() => {
          return newState;
        });
      }

      render() {
        return (
          <Wrapped {...this.props} {...this.state} />
        );
      }
    }
    return MatchWidthWrapper;
  }
}


function renderIf(params) {
  return matchWidthFactory({theQuery: params})(class Comp extends React.Component{
    render() {
      if (this.props.theQuery) {
        if (typeof this.props.children === 'string') {
          return <div>{this.props.children}</div>
        }
        return this.props.children;
      }
      return null;
    }
  });
}

function matched(Component, params) {
  return matchWidthFactory({theQuery: params})(class Comp extends React.Component{
    render() {
      if (this.props.theQuery) {
        return <Component {...this.props}/>
      }
      return null;
    }
  });
}

function matchWidth (params, localDefaults) {
  return matchWidthFactory(params, localDefaults);
}

function withDefaults(globalDefaults) {
  return {
    matchWidth:  function(params, localDefaults) {
      return matchWidthFactory(params, localDefaults, globalDefaults);
    },
    renderIf: function (params) {
      return matchWidthFactory({theQuery: params}, null, globalDefaults)(class Comp extends React.Component{
        render() {
          if (this.props.theQuery) {
            if (typeof this.props.children === 'string') {
              return <div>{this.props.children}</div>
            }
            return this.props.children;
          }
          return null;
        }
      });
    },
    matched: function(Component, params) {
      return matchWidthFactory({theQuery: params}, null, globalDefaults)(class Comp extends React.Component{
        render() {
          if (this.props.theQuery) {
            return <Component {...this.props}/>
          }
          return null;
        }
      });
    },
  }
}

export {
  matchWidth,
  renderIf,
  matched,
  withDefaults,
}