function convert_to_base64(file_data, type) {
    let file = Buffer.from(file_data, 'binary').toString('base64')
    return `data:${type};base64,${file}`;
}
  
  
/**
 * Creates a blob URL for the given file, depending on its content type.
 * @param {*} file_data 
 * @param {*} contentType 
 */
function create_blob_url(file_data, contentType) {
    const base64ImageData = convert_to_base64(file_data, contentType);
  
    const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
  
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    const blobUrl = URL.createObjectURL(blob);
  
    return blobUrl;
}

  
/**
 * Opens each theory resource in a new tab.
 * @param {*} theory_array 
 */  
function display_theory(theory_array) {
    console.log(theory_array)
  
    for (let theory_piece of theory_array) {
      if (theory_piece.type.startsWith("URL")) {
        window.open(theory_piece.file, "_blank")
  
      } else if (theory_piece.type.startsWith("text/") || theory_piece.type.startsWith("image/")) {
        const blobUrl = create_blob_url(theory_piece.file, theory_piece.type);
        window.open(blobUrl, "_blank")
      }
    }
  
}
  
function remove_theory(theory_array, files) {
  
    let filtered_files = []
    for (let file of files) {
      if (!is_theory(file, theory_array)) {
        filtered_files.push(file)
      }
    }
  
    return filtered_files
}
  
  
/**
* Returns true if:
* the given file *doesn't* have a newPath prop (since binaries like images don't),
* OR it is part of the array of theory paths,
* OR if it is a file commited as part of an arc commit
* @param {*} file 
* @param {*} theory_array 
*/
function is_theory(file, theory_array) {
    if (file.newPath === null || file.newPath === undefined) {
      return true
    }
  
    return theory_array.includes(file.newPath) ||
      file.newPath.toLowerCase().startsWith("arc")
}
  

module.exports={display_theory, remove_theory}