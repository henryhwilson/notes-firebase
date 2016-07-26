import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBKl84aLOM8iqqW5oQ5qTAStile2AD-WZM',
  authDomain: 'henrywilson-notes.firebaseapp.com',
  databaseURL: 'https://henrywilson-notes.firebaseio.com',
  storageBucket: '',
};
Firebase.initializeApp(config);

const database = Firebase.database();

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function updateNote(id, fields) {
  database.ref('notes').child(id).update(fields);
}

export function createNote(note) {
  const newNoteId = database.ref('notes').push().key;
  const updates = {};
  updates[newNoteId] = note;
  database.ref('notes').update(updates);
}
