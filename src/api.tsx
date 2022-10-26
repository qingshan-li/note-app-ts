import NoteType from "./type";

export default class NotesAPI {

  static getAllNotes() {
    const notes: NoteType[] = JSON.parse(sessionStorage.getItem("notesapp-notes") || "[]");

    return notes.sort((a: NoteType, b: NoteType) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave: NoteType): void {
    const notes = NotesAPI.getAllNotes();
    const existing = notes.find((note) => note.id === noteToSave.id);

    // Edit/Update
    if (existing) {
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
    } else {
      noteToSave.id = Math.floor(Math.random() * 1000000);
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    sessionStorage.setItem("notesapp-notes", JSON.stringify(notes));
  }

  static deleteNote(id: number): void {
    const notes = NotesAPI.getAllNotes();
    const newNotes = notes.filter((note) => note.id !== id);

    sessionStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
  }
}