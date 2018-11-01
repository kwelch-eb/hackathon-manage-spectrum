import React, { Component } from 'react';
import request from 'request';
import querystring from 'querystring';

const OAUTH_URL = 'https://www.eventbrite.com/oauth/token';
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;


export default class Register extends Component {
  componentDidMount() {
    console.log(this.props);
    var url_parts = querystring.parse(this.props.location.search);
    var _code = url_parts['?code'];
    var url = OAUTH_URL;

    var form = {
        code: _code,
        client_secret: CLIENT_SECRET,
        client_id: CLIENT_ID,
        grant_type: 'authorization_code'
    };

    var formData = querystring.stringify(form);
    var contentLength = formData.length;

    console.log(url);
    console.log(_code);
    console.log(form);

    request({
        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: url,
        body: formData,
        method: 'POST'
    }, function (err, resp, body) {
       console.log(err, resp, body);
    });
  }

  render() {
    return (
      <div>
          <h2>Register</h2>
          <code>
            {JSON.stringify(this.props)}
          </code>
      </div>
    );
  }
}