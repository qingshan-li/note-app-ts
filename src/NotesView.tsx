import React, { useState, useEffect } from 'react';
import NoteType from "./type";
// import reducer from "./store";
import NoteItem from "./NoteItem"
// import XmlButton from "./XmlButton";


/** all notes */
const noteList: NoteType[] = JSON.parse(sessionStorage.getItem("notesapp-notes")) || []

export default function NotesView() {

  const [noteLists, setNoteList] = useState<NoteType[]>(noteList);    // all note list
  const [selectId, setSelectId] = useState<number>(null)              // select note id
  const [preview, setPreview] = useState<NoteType>({ title: "", body: "" })     // current select note preview
  const [isCanEdit, setIsCanEdit] = useState<boolean>(true)                    // is edit model
  // const [state, dispatch] = useReducer(reducer, noteList);

  /** add new note */
  const addNewNote = (): void => {
    const noteToSave: NoteType = {
      title: `新建笔记-${noteLists.length + 1}`,
      body: "开始记录..."
    }

    noteToSave.id = Math.floor(Math.random() * 1000000);
    noteToSave.updated = new Date().toLocaleString('en-CN', { timeZone: 'UTC' });
    setNoteList([...noteLists, noteToSave])
  }

  /** delete note */
  const delNote = (id: number): void => {
    const newNotes = noteLists.filter((note) => note.id !== id);
    setNoteList((preList: NoteType[]) =>
      preList.filter((note: NoteType) => {
        return note.id !== id;
      })
    )
    sessionStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    setPreview({ title: "", body: "" })
    setSelectId(0);
  }

  /** pitch on note */
  const selectNote = (id: number): void => {
    setIsCanEdit(true)
    setSelectId(id);
    const currentNote: NoteType = noteLists.find(item => item.id === id)
    setPreview({ title: currentNote.title, body: currentNote.body })
  }

  /** note title change */
  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPreview({ ...preview, title: event.target.value })
  }

  /** note body change */
  const bodyChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setPreview({ ...preview, body: event.target.value })
  }

  /** save modified notes */
  const saveNode = (): void => {
    setIsCanEdit(true)
    setNoteList((preList: NoteType[]) => {
      const arr = preList.map((item: NoteType): NoteType => {
        if (item.id === selectId) {
          item = { ...item, ...preview }
          item.updated = new Date().toLocaleString('en-CN', { timeZone: 'UTC' });
        }
        return item;
      })
      return arr;
    })
  }

  useEffect(() => {
    sessionStorage.setItem("notesapp-notes", JSON.stringify(noteLists));
  }, [noteLists])

  useEffect(() => {
    console.log(selectId)
  }, [selectId])

  const noteItemListDom = noteLists.map((item: NoteType) => (
    <NoteItem
      notesItem={item}
      key={item.id}
      selectId={selectId}
      selectNote={selectNote}
      delNote={delNote}
    />
  ))

  return (
    <div className='out_box'>
      {/* <XmlButton /> */}
      <div className='notes__sidebar'>
        <button className='notes__add' onClick={addNewNote} type='button'>添加新的笔记 📒</button>
        <div className='notes_del_tip'>单击选中/双击删除</div>
        <div className='notes__list' >
          {noteItemListDom}
        </div>
      </div>
      <div className='notes__preview'>
        {isCanEdit
          ? <div className='edit_btn' onClick={() => setIsCanEdit(false)}>编辑</div>
          : <div className='save_btn' onClick={saveNode}>保存</div>
        }
        <input
          className='notes__title'
          disabled={isCanEdit} type='text'
          placeholder='新笔记...'
          value={preview.title}
          onChange={titleChangeHandler}
        />
        <textarea
          className='notes__body'
          disabled={isCanEdit}
          placeholder='编辑笔记...'
          value={preview.body}
          onChange={bodyChangeHandler}
          rows={20}
        ></textarea>
      </div>
    </div>
  )
}