import React, { Component } from 'react'
import { Grid, Button, Header, Input, Segment } from 'semantic-ui-react'
import FileList from './FileList.js'
import APIRequest from './APIRequest.js'
import File from './File.js'
import PDFViewer from './PDFViewer.js'
import PDFJs from './pdfjs.js'

class App extends Component {
  state = {
    input: '',
    password: '',
    files: [],
    error: false,
    selected: undefined
  }
  submitPassword = () => {
    this.setState(prevState => ({ password: prevState.input }))
    APIRequest.index(this.state.input).then(json => {
      if (json.error) {
        this.setState({ error: true })
      } else {
        const files = json.data.map(file => new File(file.name, file.hash))
        console.log(files)
        this.setState({ files: files })
      }
    })
  }
  selectFile = hash => {
    console.log(`File selected: ${hash}`)
    APIRequest.request(hash, this.state.password).then(json => {
      if (json.error) {
        this.setState({ error: true })
      } else {
        console.log(json.data)
        this.setState({ selected: json.data })
      }
    })
  }
  render() {
    const { password, input, files, error, selected } = this.state
    const file =
      typeof selected !== 'undefined' ? (
        <PDFViewer backend={PDFJs} src={selected} />
      ) : (
        <p>No file selected</p>
      )
    return password.length === 0 ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Segment style={{ width: 350 }}>
          <Header>Password:</Header>
          <Input
            value={input}
            onChange={e => this.setState({ input: e.target.value })}
            type="password"
          />
          <Button onClick={this.submitPassword}>Submit</Button>
        </Segment>
      </div>
    ) : error ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Segment style={{ width: 350 }}>
          <Header>
            There was an error, check your password and try again.
          </Header>
        </Segment>
      </div>
    ) : (
      <Grid>
        <Grid.Column width={4}>
          <FileList files={files} selectFile={this.selectFile} />
        </Grid.Column>
        <Grid.Column width={12}>{file}</Grid.Column>
      </Grid>
    )
  }
}

export default App
