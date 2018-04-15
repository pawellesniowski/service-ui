import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectRouter, fetch } from 'common/utils';
import { loginAction } from 'controllers/auth';
import { RegistrationPage } from './registrationPage';

const REGISTRATION_URL = '/api/v1/user/registration';

@connect(null, { loginAction })
@connectRouter(({ uuid }) => ({ uuid }))
export class RegistrationPageContainer extends PureComponent {
  static propTypes = {
    uuid: PropTypes.string,
    loginAction: PropTypes.func.isRequired,
  };
  static defaultProps = {
    uuid: undefined,
  };

  state = {
    isTokenActive: false,
    email: '',
    isLoadingFinished: false,
  };

  componentDidMount() {
    const uuid = this.props.uuid;
    if (!uuid) {
      return;
    }
    fetch(REGISTRATION_URL, { params: { uuid } }).then((data) =>
      this.setState({
        isTokenActive: data.isActive,
        email: data.email,
        isLoadingFinished: true,
      }),
    );
  }

  registrationHandler = ({ name, login, password, email }) => {
    const uuid = this.props.uuid;
    const data = {
      full_name: name,
      login,
      password,
      email,
    };
    fetch(REGISTRATION_URL, { method: 'post', data, params: { uuid } }).then(() =>
      this.props.loginAction({ login, password }),
    );
  };

  render() {
    const uuid = this.props.uuid;
    return !uuid || this.state.isLoadingFinished ? (
      <RegistrationPage
        tokenProvided={Boolean(uuid)}
        tokenActive={this.state.isTokenActive}
        email={this.state.email}
        onRegistrationSubmit={this.registrationHandler}
      />
    ) : null;
  }
}
