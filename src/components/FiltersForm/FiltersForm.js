import React, { useState, useEffect, useMemo } from 'react';
import Button from '../Button/Button';
import './FiltersForm.scss';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import CustomLocalStorageManager from '../../utils/CustomLocalStorageManager';
import { useDispatch, useSelector } from 'react-redux';
import { getAdverts, getAdvertsTags } from '../../redux/selectors';
import { createFilters, deleteFilters, loadTags } from '../../redux/actions';

export default function Filters() {
  const dispatch = useDispatch();
  const advertisements = useSelector(getAdverts);

  //Calculate minPrice maxPrice price
  const [minPrice, setMinPrice] = useState(
    advertisements.reduce((a, b) => (a.price < b.price ? a : b), {}).price
  );
  const [maxPrice, setMaxPrice] = useState(
    advertisements.reduce((a, b) => (a.price > b.price ? a : b), {}).price
  );

  useMemo(() => {
    setMinPrice(advertisements.reduce((a, b) => (a.price < b.price ? a : b), {}).price);
    setMaxPrice(advertisements.reduce((a, b) => (a.price > b.price ? a : b), {}).price);
  }, [advertisements]);

  //Filters config
  const filtersInitialState = {
    name: '',
    sale: 'all',
    price: [minPrice, maxPrice],
    tags: []
  };

  //Filters
  const [filters, setFilters] = useState(filtersInitialState);

  useEffect(() => {
    if (CustomLocalStorageManager.getItem('filters')) {
      const readFilters = CustomLocalStorageManager.getItem('filters');

      setFilters(readFilters);

      setFilterName(readFilters.name);
      setFilterSale(readFilters.sale);
      setFilterPriceRange(readFilters.price);
      setSelectTags(readFilters.tags);
    }
  }, []);

  //Name filter
  const [filterName, setFilterName] = useState(filters.name);
  const handleInputName = (event) => {
    setFilterName(event.target.value);
  };

  //Sale filter
  const [filterSale, setFilterSale] = useState(filters.sale);
  const handleInputSale = (event) => {
    setFilterSale(event.target.value);
  };

  //Price filter
  const [filterPriceRange, setFilterPriceRange] = useState(filters.price);
  const handleFilterPriceRange = (value) => {
    setFilterPriceRange(value);
  };

  //Tags filter
  const tags = useSelector(getAdvertsTags);
  const [selectTags, setSelectTags] = useState(filters.tags);

  useEffect(() => {
    dispatch(loadTags());
  }, [dispatch]);

  const handleCheckTag = (event) => {
    var listSelectTags = [...selectTags];
    if (event.target.checked) {
      listSelectTags = [...selectTags, event.target.value];
    } else {
      listSelectTags.splice(selectTags.indexOf(event.target.value), 1);
    }
    setSelectTags(listSelectTags);
  };

  //Data filters select by user
  const selectFiltersInfo = {
    name: filterName,
    sale: filterSale,
    price: filterPriceRange,
    tags: selectTags
  };

  //Set data filters in state and localStorage
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(createFilters(selectFiltersInfo));
  };

  //Reset filters state and localStorage
  const resetFilters = (event) => {
    event.preventDefault();
    dispatch(deleteFilters());

    setFilterName(filtersInitialState.name);
    setFilterSale(filtersInitialState.sale);
    setFilterPriceRange(filtersInitialState.price);
    setSelectTags(filtersInitialState.tags);
  };

  return (
    <div id="filters">
      <h3>Filters</h3>
      {/* <p>FilterName: {filters.name}</p>
      <p>filterSale: {filters.sale}</p>
      <p>FilterPriceRange: {filters.price}</p>
      <p>{JSON.stringify(filters.tags)}</p> */}

      <div className="container">
        <div className="filters-line">
          <form onSubmit={handleFormSubmit}>
            <div className="inputs-container">
              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    className=""
                    placeholder="name"
                    value={filterName}
                    onChange={handleInputName}
                  />
                </label>
              </div>

              <div>
                <label>
                  Sale
                  <input
                    name="sale"
                    type="radio"
                    value="sale"
                    checked={filterSale === 'sale'}
                    onChange={handleInputSale}
                  />
                </label>
                <label>
                  Buy
                  <input
                    name="buy"
                    type="radio"
                    value="buy"
                    checked={filterSale === 'buy'}
                    onChange={handleInputSale}
                  />
                </label>
                <label>
                  All
                  <input
                    name="all"
                    type="radio"
                    value="all"
                    checked={filterSale === 'all'}
                    onChange={handleInputSale}
                  />
                </label>
              </div>

              <div>
                <label>Range: {`${filterPriceRange[0]} - ${filterPriceRange[1]}`}</label>
                <div className="slider-range">
                  <Range
                    marks={{
                      [minPrice]: minPrice,
                      [maxPrice]: maxPrice
                    }}
                    min={0}
                    max={maxPrice}
                    value={filterPriceRange}
                    onChange={handleFilterPriceRange}
                  />
                </div>
              </div>

              <div>
                <label>
                  Tags:
                  <ul>
                    {tags.map((tag, index) => (
                      <li key={tag}>
                        <input
                          name={tag}
                          value={tag}
                          type="checkbox"
                          checked={selectTags.includes(tag) ? true : false}
                          onChange={(e) => handleCheckTag(e)}
                        />
                        {tag}
                      </li>
                    ))}
                  </ul>
                </label>
              </div>
              <div className="filters-buttons">
                <Button type="submit" value="filter">
                  Filter
                </Button>
                <Button onClick={resetFilters} value="clearfilter">
                  Clear
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
