import React, { Component } from 'react';
import Immutable from 'immutable';
import InputBar from './input_bar';
import Note from './note';

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

  createNote(title) {
    const id = this.state.notes.size;
    const note = {
      title,
      text: '',
      x: 0,
      y: 10 + id * 100,
    };
    this.setState({
      notes: this.state.notes.set(id, note),
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  updateNote(id, fields) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
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
