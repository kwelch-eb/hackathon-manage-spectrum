import React from 'react';

export default class ExtensionPage extends React.PureComponent {
  state = {
    user: null,
  };

  componentDidMount() {
    this.props.sdk.request('/users/me/').then(user => this.setState({ user }));
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
