import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './FiltersForm.scss';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertsTags } from '../../redux/selectors';
import { loadTags } from '../../redux/actions';

export default function Filters({ advertisements, setFiltersInfo, filtersInfo }) {
  //Calculate minPrice maxPrice price
  const minPrice = advertisements.reduce((a, b) => (a.price < b.price ? a : b), {}).price || 0;
  const maxPrice = advertisements.reduce((a, b) => (a.price > b.price ? a : b), {}).price || 100;

  //Filters config
  const filtersInitialState = {
    name: '',
    sale: 'all',
    price: [minPrice, maxPrice],
    tags: []
  };

  const [filters, setFilters] = useState(filtersInitialState);

  //Name filter
  const [filterName, setFilterName] = useState(filtersInitialState.name);
  const handleInputName = (event) => {
    setFilterName(event.target.value);
  };

  //Sale filter
  const [filterSale, setFilterSale] = useState(filtersInitialState.sale);
  const handleInputSale = (event) => {
    setFilterSale(event.target.value);
  };

  const [filterPriceRange, setFilterPriceRange] = useState(filtersInitialState.price);
  const handleFilterPriceRange = (value) => {
    setFilterPriceRange(value);
  };

  //Tags filter
  const tags = useSelector(getAdvertsTags);
  const [selectTags, setSelectTags] = useState(filters.tags);
  const dispatch = useDispatch();
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
  const saveFilters = () => {
    const selectFiltersInfo = {
      name: filterName,
      sale: filterSale,
      price: filterPriceRange,
      tags: selectTags
    };
    setFiltersInfo(selectFiltersInfo);
    setFilters(selectFiltersInfo);
  };

  const resetInfoFilters = () => {
    setFilters(filtersInitialState);
    setFilterName(filtersInitialState.name);
    setFilterSale(filtersInitialState.sale);
    setFilterPriceRange(filtersInitialState.price);
    setSelectTags(filtersInitialState.tags);
    setFiltersInfo(filtersInitialState);
  };

  //Set data filters in state and localStorage
  const handleFormSubmit = (event) => {
    event.preventDefault();
    saveFilters();
  };

  //Reset filters state and localStorage
  const resetFilters = (event) => {
    event.preventDefault();
    resetInfoFilters();
  };

  useEffect(() => {
    setFilters({
      name: '',
      sale: 'all',
      price: [minPrice, maxPrice],
      tags: []
    });
  }, [minPrice, maxPrice]);

  useEffect(() => {
    setFiltersInfo(filters); //reset page
    setFilterName(filters.name);
    setFilterSale(filters.sale);
    setFilterPriceRange(filters.price);
    setSelectTags(filters.tags);
  }, [filters, setFiltersInfo]);

  return (
    <div id="filters">
      <h3>Filters</h3>
      {/* <p>Filters: {JSON.stringify(filters)}</p>
      <p>filtersInfo: {JSON.stringify(filtersInfo)}</p>
      <p>PriceRange: {JSON.stringify(filterPriceRange)}</p> */}
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
                    min={minPrice}
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
