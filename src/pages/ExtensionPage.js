import React from 'react';
import {parse} from 'query-string';
import jwt from 'jsonwebtoken';
import {CLIENT_SECRET} from '../constants';

export default class ExtensionPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const query = parse(props.location.search);
    this.state = {
      token: query.esr ? jwt.decode(query.esr, CLIENT_SECRET): null,
    }
  }

  render() {
    return (
      <div>
        <h1>Token details</h1>
        <code>{JSON.stringify(this.state.token)}</code>
      </div>
    );
  }
}
