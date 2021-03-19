import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import ImportModal from '../components/ImportModal';
import FileCreationModal from '../components/FileCreationModal';
import FolderCreationModal from '../components/FolderCreationModal';

import { downloadWithName } from '../utils/download';

export default function AppPage() {
  const [arr, setArr] = useState([
    { type: "file", name: "test.txt" },
    {
      type: "folder", name: "fold", data: [
        { type: "file", name: "test_in_fold.txt" },
        {
          type: "folder", name: "fold2", data: [
            { type: "file", name: "test_in_fold_2.txt" },
          ]
        }
      ]
    }
  ]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [sort, setSort] = useState("type");
  const [pathArr, setPathArr] = useState([]);

  const getDataToDisplay = (arr, path, i) => {
    if (!arr || !arr.length)
      return [];
    if (path.length <= i)
      return arr;
    const newObj = arr.find(elem => elem.type === "folder" && elem.name === path[i]);
    if (!newObj)
      return [];
    return getDataToDisplay(newObj.data, path, i + 1);
  }

  const addFile = (arr, path, i, name, content) => {
    if (!arr)
      return arr;
    if (path.length <= i)
      return [...arr, { type: "file", name: name, content: content }];
    const idx = arr.findIndex(elem => elem.type === "folder" && elem.name === path[i]);
    if (idx < 0)
      return arr;
    const newPart = addFile(arr[idx].data, path, i + 1, name, content);
    arr[idx] = { ...arr[idx], data: newPart };
    return arr;
  }

  const doAddFile = (name, content) => {
    const newArr = addFile(arr, pathArr, 0, name, content);
    setArr(newArr);
    forceUpdate();
  }

  const addFolder = (arr, path, i, name) => {
    if (!arr)
      return arr;
    if (path.length <= i)
      return [...arr, { type: "folder", name: name, content: [] }];
    const idx = arr.findIndex(elem => elem.type === "folder" && elem.name === path[i]);
    if (idx < 0)
      return arr;
    const newPart = addFolder(arr[idx].data, path, i + 1, name);
    arr[idx] = { ...arr[idx], data: newPart };
    return arr;
  }

  const doAddFolder = (name) => {
    const newArr = addFolder(arr, pathArr, 0, name);
    setArr(newArr);
    forceUpdate();
  }

  const deleteElement = (arr, path, i, name) => {
    if (!arr)
      return arr;
    if (path.length <= i) {
      const idx = arr.findIndex(elem => elem.name === name);
      arr.splice(idx, 1);
      return arr;
    }
    const idx = arr.findIndex(elem => elem.type === "folder" && elem.name === path[i]);
    if (idx < 0)
      return arr;
    const newPart = deleteElement(arr[idx].data, path, i + 1, name);
    arr[idx] = { ...arr[idx], data: newPart };
    return arr;
  }

  const doDeleteElement = (name) => {
    const newArr = deleteElement(arr, pathArr, 0, name);
    setArr(newArr);
    forceUpdate();
  }

  const toDisplay = getDataToDisplay(arr, pathArr, 0);
  const items = toDisplay.map((i, key) => {
    if (i.type == "folder")
      return (
        <li key={key}>
          <a href="#" onClick={() => {
            setPathArr([...pathArr, i.name]);
          }}>
            {i.name}
          </a>{" "}
          <a href="#" onClick={() => doDeleteElement(i.name)}>supprimer</a>
        </li>
      );
    else
      return (
        <li key={key}>
          {i.name}{" "}
          <a href="#" onClick={() => doDeleteElement(i.name)}>supprimer</a>{" "}
          <a href="#" onClick={() => downloadWithName(i.name, i.content)}>télécharger</a>
        </li>
      );
  });
  const displayPath = pathArr.map((i, key) =>
    <span key={key}>{"/"}<a href="#" onClick={() => {
      pathArr.length = key + 1;
      setPathArr(pathArr);
    }}>{i}</a></span>
  );

  return (
    <div>
      <h3><a href="#" onClick={() => { setPathArr([]); }}>Mon Drive</a>{displayPath}</h3>
      <FileCreationModal doAddFile={doAddFile} />{" "}
      <FolderCreationModal doAddFolder={doAddFolder} />{" "}
      <ImportModal doAddFile={doAddFile} />
      {items}
    </div>
  )
}