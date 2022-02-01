//Filters config
const filtersInitialState = {
  name: '',
  sale: 'all',
  price: [0, 100],
  tags: []
};

const filterByName =
  (filter) =>
  ({ name }) => {
    const cleanFilter = filter.trim();
    return !cleanFilter || new RegExp(cleanFilter, 'gi').test(name);
  };

const filterBySale =
  (filter) =>
  ({ sale }) => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'sale') {
      return sale;
    }
    if (filter === 'buy') {
      return !sale;
    }
  };

const filterByPrice =
  (filter) =>
  ({ price }) => {
    const [min, max] = filter;
    if (!max) {
      return price >= min;
    }
    return price >= min && price <= max;
  };

const filterByTags =
  (filter) =>
  ({ tags }) =>
    !filter.length || filter.every((tag) => tags.includes(tag));

export const filterAdverts = (
  adverts,
  {
    name = filtersInitialState.name,
    price = filtersInitialState.price,
    sale = filtersInitialState.sale,
    tags = filtersInitialState.tags
  }
) => {
  return adverts
    .filter(filterByName(name))
    .filter(filterBySale(sale))
    .filter(filterByPrice(price))
    .filter(filterByTags(tags));
};
