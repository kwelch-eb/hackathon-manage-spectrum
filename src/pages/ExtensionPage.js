import React from 'react';
import { parse } from 'query-string';
import jwt from 'jsonwebtoken';
import eventbrite from 'eventbrite';
import { BASE_API_URL, CLIENT_SECRET } from '../constants';

export default class ExtensionPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const query = parse(props.location.search || '');
    const token = query.esr ? jwt.decode(query.esr, CLIENT_SECRET) : null;
    this.state = {
      ...token,
    };
    this.sdk = eventbrite({ baseUrl: BASE_API_URL, token: token.auth_token });
  }

  componentDidMount() {
    this.sdk.request('/users/me/').then(user => this.setState({ user }));
    // this isn't working so it has scroll :sad_panda:
    // window.EB.FrameAPI.init({});
  }

  getUserDetails = () => {
    const { user } = this.state;
    if (user) {
      return (
        <div>
          <h1>{user.name}</h1>
          {user.image_id && <img src={user.image_id} alt="User Avatar" />}
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div>
        <h1>Token details</h1>
        <code>{JSON.stringify(this.state)}</code>
        {Array.from({ length: 10 }).map((_, i) => (
          <br key={i} />
        ))}
        {this.getUserDetails()}
      </div>
    );
  }
}
