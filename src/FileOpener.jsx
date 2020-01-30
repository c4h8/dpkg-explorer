import React, { useRef, useContext } from 'react';
import parseFile from './parseFile';
import { setPackageData } from './actions';
import { dispatchContext } from './StoreProvider';

function FileOpener() {
  const fileRef = useRef(null);
  const dispatch = useContext(dispatchContext);

  const onFileChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onloadend = (_e) => {
        const [error, packageNames, packageMap] = parseFile(fileReader.result)

        if(error) {
          console.log('error in parsing file', error)
        } else {
          dispatch(setPackageData(packageNames, packageMap));
        }
      }

      fileReader.readAsText(file)
    }
  };

  return (
    <div className="appbar">
      <input
        ref={fileRef}
        type="file"
        onChange={onFileChange}
      />
      <button>Open</button>
    </div>
  );
}

export default FileOpener;
