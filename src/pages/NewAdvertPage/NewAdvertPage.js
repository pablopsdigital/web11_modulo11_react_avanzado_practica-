import Layout from '../../containers/Layout/Layout';
import { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import './NewAdvertPage.scss';
import InputFile from '../../components/InputFile/InputFile';
import imageNoPhoto from '../../images/no-image.png';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';
import Alert from '../../components/Alert/Alert';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { createAdvert, loadTags } from '../../redux/actions';
import { getAdvertsTags, getUi } from '../../redux/selectors';

function NewAdvertPage({ ...props }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  //Name
  const [name, setName] = useState('');
  const handleInputName = (event) => {
    setName(event.target.value);
  };

  //Sale
  const [type, setSale] = useState(null);
  const handleInputSale = (event) => {
    setSale(event.target.value);
    console.log(type);
  };

  //Price
  const [price, setPrice] = useState(0);
  const handleInputPrice = (event) => {
    setPrice(event.target.value);
  };

  //Tags
  const tags = useSelector(getAdvertsTags) || [];
  const [selectTags, setSelectTags] = useState([]);

  useEffect(() => {
    dispatch(loadTags());
  }, [dispatch]);

  const handleCheckTag = (event) => {
    var listTags = [...selectTags];
    if (event.target.checked) {
      listTags = [...selectTags, event.target.value];
    } else {
      listTags.splice(selectTags.indexOf(event.target.value), 1);
    }
    setSelectTags(listTags);
  };

  //Photo
  const [photo, setPhoto] = useState();
  const [photoRender, setRenderPhoto] = useState({ imageNoPhoto });
  const handleInputPhoto = (event) => {
    const reader = new FileReader();

    if (event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }

    reader.onload = () => {
      if (reader.readyState === 2) {
        setRenderPhoto({ imageNoPhoto: reader.result });
      }
    };

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  //Send form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectTags.length) {
      alert('Select one tags');
    } else {
      const newAdvertFormData = new FormData();
      newAdvertFormData.set('name', name);
      newAdvertFormData.set('sale', type);
      newAdvertFormData.set('price', price);
      newAdvertFormData.set('tags', selectTags);
      if (photo) {
        newAdvertFormData.set('photo', photo);
      }
      dispatch(createAdvert(newAdvertFormData));
    }
  };

  return (
    <Layout {...props}>
      <div id="new-advert-page">
        <div className="container">
          <div className="header">
            <h2>NewAdvertPage</h2>
          </div>

          <div className="body">
            <form onSubmit={handleFormSubmit}>
              <div className="columns">
                <div className="colum">
                  <div className="input-container">
                    <label>Name</label>
                    <input
                      type="text"
                      className=""
                      placeholder="name"
                      value={name}
                      onChange={handleInputName}
                      required
                    />
                  </div>

                  <div className="input-container">
                    <label>Price (€)</label>
                    <input
                      type="number"
                      className=""
                      placeholder="price"
                      value={price}
                      onChange={handleInputPrice}
                      required
                    />
                  </div>

                  <div>
                    <div className="input-container">
                      <label>Type advert: </label>
                      <input
                        name="sale"
                        type="radio"
                        value="true"
                        checked={type === 'true'}
                        onChange={handleInputSale}
                        required
                      />
                      Sale
                      <input
                        name="sale"
                        type="radio"
                        value="false"
                        checked={type === 'false'}
                        onChange={handleInputSale}
                        required
                      />
                      Buy
                    </div>
                  </div>

                  <div className="input-container">
                    <label>Tags: </label>
                    <ul>
                      {tags.map((tag, index) => (
                        <li key={tag}>
                          <input
                            name="type"
                            type="checkbox"
                            onChange={(e) => handleCheckTag(e)}
                            value={tag}
                          />
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="colum">
                  <div className="input-container">
                    <label>Image: </label>
                    <InputFile
                      onChange={handleInputPhoto}
                      imageNoPhoto={photoRender}
                      validFormats={'image/*'}
                      name={'image-upload'}
                      {...props}
                    />
                  </div>
                </div>
              </div>
              <div className="footer">
                <div>
                  <Link to="/">
                    <Button>Cancel</Button>
                  </Link>
                </div>
                <div>
                  <Button type="submit">Create Advert</Button>
                </div>
              </div>
            </form>

            {isLoading && <SpinnerLoading />}
            {error && <Alert>{error.message}</Alert>}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewAdvertPage;
