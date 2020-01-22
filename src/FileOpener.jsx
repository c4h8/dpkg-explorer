import React, { useRef } from 'react';
import parseFile from './parseFile';

function FileOpener({setPackageNames, setPackageMap}) {
  const fileRef = useRef(null);

  const onFileChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);

    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      const [packageNames, packageMap] = parseFile(fileReader.result)
      setPackageNames(packageNames)
      setPackageMap(packageMap)
    }
    fileReader.readAsText(file)
  };

  return (
    <div style={{width: '100%', minHeight: '100px'}}>
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
