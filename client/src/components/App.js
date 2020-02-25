import React, { Fragment, Component } from 'react'
import {
  Grid,
  Responsive,
  Button,
  Header,
  Input,
  Segment,
  Form,
} from 'semantic-ui-react'
import DesktopDisplay from '../containers/DesktopDisplayContainer.js'
import MobileDisplay from '../containers/MobileDisplayContainer.js'
import PropTypes from 'prop-types'

class App extends Component {
  state = {
    id: '',
    password: '',
    error: false,
    section: '',
    sectionError: false,
  }
  getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }
  handleKeyDown = (e, func) => {
    if (e.key === 'Enter') {
      func()
    }
  }
  submitPassword = async () => {
    const { attemptLogin } = this.props
    const { id, password } = this.state
    if (id.length === 0 || password.length === 0) {
      return
    }
    const loginInfo = { id: id, password: password }
    const success = await attemptLogin(loginInfo)
    this.setState({ id: '', password: '' })
    if (!success) {
      this.setState({ error: true })
    }
  }
  componentDidMount() {
    const { attemptLogin } = this.props
    attemptLogin()
  }
  render() {
    const { id, password, error } = this.state
    const { passwordIsEmpty } = this.props
    const display = (
      <Fragment>
        <Responsive
          getWidth={this.getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <DesktopDisplay />
        </Responsive>
        <Responsive
          getWidth={this.getWidth}
          maxWidth={Responsive.onlyMobile.maxWidth}
        >
          <MobileDisplay />
        </Responsive>
      </Fragment>
    )
    return error ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Segment style={{ width: 350 }}>
          <Header>
            There was an error, check your password and try again.
          </Header>
        </Segment>
      </div>
    ) : passwordIsEmpty ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Segment style={{ width: 350 }}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header>Login</Header>
                <Form>
                  <Form.Input
                    label="ID"
                    value={id}
                    onChange={e => this.setState({ id: e.target.value })}
                    onKeyDown={e => this.handleKeyDown(e, this.submitPassword)}
                  />
                  <Form.Input
                    label="Password"
                    value={password}
                    type="password"
                    onChange={e => this.setState({ password: e.target.value })}
                    onKeyDown={e => this.handleKeyDown(e, this.submitPassword)}
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button
                  disabled={!(id.length !== 0 && password.length !== 0)}
                  onClick={this.submitPassword}
                >
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    ) : (
      display
    )
  }
}

App.propTypes = {
  passwordIsEmpty: PropTypes.bool.isRequired,
  attemptLogin: PropTypes.func.isRequired,
}

export default App
