import noImage from '../../images/no-image.png';

function Image(photo) {
  // //localhost:3001/public/1636221072044 - 392962499.jpg"
  const urlPhoto = `//localhost:3001${photo.photo}`;
  if (photo.photo) {
    return (
      <div>
        <img src={urlPhoto} alt={photo.photo} />
      </div>
    );
  } else {
    return (
      <div>
        <img src={noImage} alt="" />
      </div>
    );
  }
}

export default Image;
