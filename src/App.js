import React, { Component } from 'react'
import Remarkable from 'remarkable'
import './App.css'

class Markdown extends Component {
    constructor() {
        super()
        this.changeText = this.changeText.bind(this)
    }

    changeText(e) {
        this.props.handleChange(e.target.value)
    }

    render() {
        return (
            <div id="markdown">
                <textarea
                    onChange={this.changeText}
                    className="textarea"
                    value={this.props.value} />
            </div>
        )
    }
}

class Preview extends Component {
    constructor() {
        super()
        this.createMarkup = this.createMarkup.bind(this)
    }

    createMarkup() {
        const md = new Remarkable()
        return {
            __html: md.render(this.props.text)
        }
    }

    render() {
        return (
            <div
                id="preview"
                className="preview"
                dangerouslySetInnerHTML={this.createMarkup()} />
        )
    }
}

class Heading extends Component {
    render() {
        return (
            <div id="heading">
                <h1>Markdown Previewer</h1>
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        const defaultText = `
Heading
=======

Sub-heading
-----------

### Another deeper heading

Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a
line break

Text attributes *italic*, **bold**,
\`monospace\`, ~~strikethrough~~ .

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.

*[Herman Fassett](https://freecodecamp.com/hermanfassett)*
        `
        this.state = {
            text: defaultText
        }
    }

    handleChange(value) {
        this.setState({
            text: value
        })
    }

    render() {
        return (
            <div id="app">
                <Heading />
                <Markdown handleChange={this.handleChange} value={this.state.text}/>
                <Preview text={this.state.text}/>
            </div>
        )
    }
}

export default App
