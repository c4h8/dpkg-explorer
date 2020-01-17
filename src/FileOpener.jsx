import React, { useRef } from 'react';


const fileReader = new FileReader();
const splitRegex = /\n\n/
const parseAttribute = function(name) {return new RegExp(`${name}: ([^]*?)(?=\n[^ ])`)
}
function FileOpener() {
  const fileRef = useRef(null);

  const onFileChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);

    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      //console.log('', fileReader.result.split('\r\n\r\n'))
      let res = fileReader.result
        .split('\r\n').join('\n')
        .split(splitRegex)
        .map(p => p.concat('\n'))

      console.log('res', res)

      const res2 = res.map(p => ({
        status: parseAttribute('Status').exec(''+p),
        version: parseAttribute('Version').exec(''+p),
        package: parseAttribute('Package').exec(''+p),
        description: parseAttribute('Description').exec(''+p),
        maintainer: parseAttribute('Maintainer').exec(''+p),
      }));

      console.log('asd', res2)
    }
    fileReader.readAsText(file)

  };

  return (
    <div style={{width: '100%', minHeight: '100px'}}>
      <input
        ref={fileRef}
        type="file"
        //style={{display:"none"}}
        onChange={onFileChange}
      />

      <button>Open</button>
    </div>
  );
}

export default FileOpener;
