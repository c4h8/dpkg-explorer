import React, { useContext } from 'react';
import parseFile from '../parseFile';
import { setPackageData, deletePackageData } from '../actions';
import { dispatchContext, storeContext } from '../StoreProvider';

import '../Styles/FileInput.css';

function FileOpener() {
  const dispatch = useContext(dispatchContext);
  const state = useContext(storeContext);

  const onFileChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = (_e) => {
        const [error, packageNames, packageMap] = parseFile(fileReader.result);

        if(error)
          console.log('error in parsing file', error);
        else
          dispatch(setPackageData(packageNames, packageMap, file.name));
      }

      fileReader.readAsText(file);
    }
  };

  const closeFile = () => dispatch(deletePackageData());

  if(state.fileName) return (
    <div className="appbar">
      <div className="close-file">
        <button
          className="close-file__button"
          onClick={closeFile}
        >
          X
        </button>
        {state.fileName || 'asdasd'}
      </div>
    </div>
  );

  return (
    <div className="appbar">
      <input
        type="file"
        onChange={onFileChange}
        id="file-upload"
      />
      <label htmlFor="file-upload" className="file-upload">
        Upload File
      </label>
    </div>
  );
}

export default FileOpener;
