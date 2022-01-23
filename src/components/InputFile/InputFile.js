import './InputFile.scss';
function DragAndDropInputFile(props) {
  return (
    <div className="container-input-file">
      <h3 className="input-file-head">Add your Image</h3>
      <div className="img-holder">
        <img src={props.imageNoPhoto.imageNoPhoto} alt="" id="img" className="img" />
      </div>
      <input
        onChange={props.onChange}
        formats={props.validFormats}
        name={props.name}
        id="input-file"
        type="file"
        value={props.value}
      />

      <div className="input-field-label">
        <label className="image-upload" htmlFor="input-file">
          Choose your image
        </label>
      </div>
    </div>
  );
}

export default DragAndDropInputFile;
