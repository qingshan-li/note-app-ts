import React from 'react';

export default function NoteItem(props: any) {
  const MAX_BODY_LENGTH = 60

  let count = 0;

  const noteClickHandler = () => {
    count += 1;
    setTimeout(() => {
      if (count === 1) {
        props.selectNote(props.notesItem.id);
      } else if (count === 2) {
        props.delNote(props.notesItem.id);
      }
      count = 0;
    }, 300);
  }

  return (
    <div
      className={["notes__list-item",props.selectId === props.notesItem.id?"bg":null].join(" ")}
      onClick={noteClickHandler}
      title="双击删除笔记"
    >
      <div className="notes__small-title">{props.notesItem.title}</div>
      <div className="notes__small-body">
        {props.notesItem.body.substring(0, MAX_BODY_LENGTH)}
        {props.notesItem.body.length > MAX_BODY_LENGTH ? "..." : ""}
      </div>
      <div className="notes__small-updated">
        {props.notesItem.updated}
      </div>
    </div>
  )
}