import React, { useRef } from "react";

export default function XmlButton() {
  const importNotes = useRef<HTMLInputElement>(null); // upload ref

  /** upload file */
  const importFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file", event.target.files[0]);
    const fileData = event.target.files[0];
}

return (
  <div className='xml_button'>
    <div className='export_btn'>Export Notes</div>
    <div
      className='import_btn'
      onClick={() => importNotes.current.click()}
    >Import Notes</div>
    <input
      style={{ display: "none" }}
      type="file"
      accept=".xml"
      ref={importNotes}
      onChange={importFile}
    />
  </div>
)
} 