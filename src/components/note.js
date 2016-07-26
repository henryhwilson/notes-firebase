import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = { editingMode: false, editingTitleMode: false };
    this.onToggleEdit = this.onToggleEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onEditTitle = this.onEditTitle.bind(this);
  }

  onToggleEdit() {
    this.setState({ editingMode: !this.state.editingMode });
  }

  // From HW3 assignment
  onDelete() {
    this.props.deleteNote(this.props.id);
  }

  // I had to use a custom element ID, used by the note's ID, to reference its data correctly
  onChange() {
    this.props.saveNote(this.props.id, { text: document.getElementById(`note_edit_${this.props.id}`).value });
  }

  // From HW3 assignment
  onDrag(e, ui) {
    this.props.dragNote(this.props.id, { x: ui.x, y: ui.y });
  }

  onEditTitle() {
    this.setState({ editingTitleMode: true });
  }

  renderNote() {
    // Create position and document ID variables
    const idName = `note_edit_${this.props.id}`;

    if (!this.state.editingMode) {
      return (
        <div className="note">
          <div className="note-options">
            {this.props.note.title}
            <i className="fa fa-trash" aria-hidden="true" onClick={this.onDelete}></i>
            <i className="fa fa-pencil" aria-hidden="true" onClick={this.onToggleEdit}></i>
            <span className="arrows"><i className="note-mover fa fa-arrows" aria-hidden="true"></i></span>
          </div>
          <div className="note_body" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
        </div>
      );
    } else {
      return (
        <div className="note">
          <div className="note-options">
            <span className="title" ondblclick={this.onEditTitle}>{this.props.note.title}</span>
            <i className="fa fa-trash" aria-hidden="true" onClick={this.onDelete}></i>
            <i className="fa fa-check" aria-hidden="true" onClick={this.onToggleEdit}></i>
            <span className="arrows"><i className="note-mover fa fa-arrows" aria-hidden="true"></i></span>
          </div>
          <Textarea id={idName} defaultValue={this.props.note.text} onChange={this.onChange} placeholder="This is a note" />
        </div>
      );
    }
  }

  render() {
    const pos = { x: this.props.note.x, y: this.props.note.y };
    return (
      <Draggable
        handle=".note-mover" grid={[4, 4]} defaultPosition={{ x: 20, y: 20 }} position={pos}
        onStart={this.onStartDrag} onDrag={this.onDrag} onStop={this.onStopDrag}
      >
      {this.renderNote()}
      </Draggable>
    );
  }
}


export default Note;
