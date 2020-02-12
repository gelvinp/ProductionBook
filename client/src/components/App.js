import React, { Fragment, Component } from 'react'
import {
  Grid,
  Responsive,
  Button,
  Header,
  Input,
  Segment,
} from 'semantic-ui-react'
import DesktopDisplay from './DesktopDisplay.js'
import MobileDisplay from '../containers/MobileDisplayContainer.js'
import PropTypes from 'prop-types'

class App extends Component {
  state = {
    input: '',
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
    const { setPassword, getIndex, createSection, createDocument } = this.props
    const { input } = this.state
    setPassword(input)
    const json = await getIndex()
    if (json.error) {
      this.setState({ error: true })
    } else {
      json.data.forEach(section => {
        createSection(section.id, section.name)
        section.files.forEach(file => {
          createDocument(section.id, file.uuid, file.name)
        })
      })
    }
  }
  render() {
    const { input, error } = this.state
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
    return passwordIsEmpty ? (
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
                <Header>Password:</Header>
                <Input
                  value={input}
                  onKeyDown={e => this.handleKeyDown(e, this.submitPassword)}
                  onChange={e => this.setState({ input: e.target.value })}
                  type="password"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button onClick={this.submitPassword}>Submit</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    ) : error ? (
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
    ) : (
      display
    )
  }
}

App.propTypes = {
  passwordIsEmpty: PropTypes.bool.isRequired,
  setPassword: PropTypes.func.isRequired,
  createSection: PropTypes.func.isRequired,
  createDocument: PropTypes.func.isRequired,
  getIndex: PropTypes.func.isRequired,
}

export default App
