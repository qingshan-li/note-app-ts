import React, { useRef } from "react";
import NoteType from "./type";
const xmlbuilder = require('xmlbuilder');
const FileSaver = require('file-saver');

export default function XmlButton(props: any) {
  const importNotes = useRef<HTMLInputElement>(null); // upload ref

  /** upload file */
  const importFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file", event);
    // const fileData = event.target.files[0];
    // let xmlDoc = new ActiveXObject("Msxml2.DOMDocument.3.0");

    // xmlDoc.async = false;

    // xmlDoc.load(fileData.);
  }

  /** export notes event */ 
  const exportFile = (): void => {
    let xmlDom = props.noteLists.map((item: NoteType) => {
      return {
        title: item.title ,
        body: item.body,
        id: item.id,
        updated: item.updated,
      }
    })
    const xmlObj = {
      root: { 
        xmlDom
      }
    };
    const xml = xmlbuilder.create(xmlObj, { encoding: 'utf-8' }).end({ pretty: true });
    const blob = new Blob([xml], { type: 'text/xml;charset=utf-8' });
    FileSaver.saveAs(blob, `noteLists.xml`);
  }

  return (
    <div className='xml_button'>
      <div className='export_btn' onClick={exportFile}>Export Notes</div>
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