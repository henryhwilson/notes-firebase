import React, { Component } from 'react';
import Immutable from 'immutable';
import InputBar from './input_bar';
import Note from './note';
import * as firebase from '../firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };

    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  componentDidMount() {
    console.log('Loading notes');
    firebase.fetchNotes((notes) => {
      this.setState({
        notes: Immutable.Map(notes),
      });
    });
  }

  createNote(title) {
    const y = 10 + this.state.notes.size * 100;
    const note = {
      title,
      text: '',
      x: 0,
      y,
    };
    firebase.createNote(note);
  }

  deleteNote(id) {
    firebase.deleteNote(id);
  }

  updateNote(id, fields) {
    firebase.updateNote(id, fields);
  }

  render() {
    const NotesComponent = this.state.notes.entrySeq().map(([id, note]) => {
      return <Note id={id} key={id} note={note} saveNote={this.updateNote} deleteNote={this.deleteNote} dragNote={this.updateNote} />;
    });

    return (
      <div>
        <h1>Notes</h1>
        <InputBar createNote={title => this.createNote(title)} />
        <div id="notes-component">{NotesComponent}</div>
      </div>
    );
  }
}

export default App;
