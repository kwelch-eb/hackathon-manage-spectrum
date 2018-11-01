import React, { Component } from 'react';
import request from 'request';
import querystring from 'querystring';
import { CLIENT_ID, CLIENT_SECRET, BASE_URL } from '../constants';

export default class Register extends Component {
  componentDidMount() {
    console.log(this.props);
    var url_parts = querystring.parse(this.props.location.search);
    var _code = url_parts['?code'];
    var url = `${BASE_URL}/oauth/token`;

    var form = {
      code: _code,
      client_secret: CLIENT_SECRET,
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
    };

    var formData = querystring.stringify(form);
    var contentLength = formData.length;

    console.log(url);
    console.log(_code);
    console.log(form);

    request(
      {
        headers: {
          'Content-Length': contentLength,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        uri: url,
        body: formData,
        method: 'POST',
      },
      function(err, resp, body) {
        console.log(err, resp, body);
      }
    );
  }

  render() {
    const parsedHash = querystring.parse(window.location.hash);
    return (
      <div>
        <h2>Register</h2>
        <code>{JSON.stringify(this.props)}</code>
        <h2>More stuff</h2>
        <code>{JSON.stringify(parsedHash)}</code>
      </div>
    );
  }
}
