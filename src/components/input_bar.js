import React, { Component } from 'react';

class InputBar extends Component {
  constructor(props) {
    super(props);
    this.createNote = this.createNote.bind(this);
  }

  createNote(event) {
    this.props.createNote(document.getElementById('note_title').value);
    document.getElementById('note_title').value = '';
  }

  render() {
    return (
      <div id="input-bar">
        <input type="text" id="note_title" placeholder="Note title..." />
        <input type="button" value="Create" onClick={this.createNote} />
      </div>
    );
  }
}


export default InputBar;
