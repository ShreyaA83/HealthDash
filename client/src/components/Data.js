import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import CustomCursor from './CustomCursor'; // Update the path based on your project structure
import Layout from './Layout';

const Data = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [clickCount, setClickCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setFilteredData(response.data);
      setIsLoading(false);
      setClickCount({});
    } catch (err) {
      console.error('Error fetching data:', err);
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await axios.get('http://localhost:5000/api/data', {
        params: { query, sortBy, order }
      });
      setFilteredData(response.data);
      setClickCount({});
    } catch (err) {
      console.error('Error searching:', err);
    }
  };

  const handleSort = async (columnName) => {
    if (sortBy === columnName) {
      const newOrder = order === 'asc' ? 'desc' : 'asc';
      setOrder(newOrder);
      setClickCount({ ...clickCount, [columnName]: clickCount[columnName] + 1 || 1 });
      if (clickCount[columnName] === 2) {
        setSortBy('');
        setOrder('asc');
        setClickCount({});
      }
    } else {
      setSortBy(columnName);
      setOrder('asc');
      setClickCount({ ...clickCount, [columnName]: 1 });
    }
    try {
      const response = await axios.get('http://localhost:5000/api/data', {
        params: { query: searchQuery, sortBy: columnName, order: order === 'asc' ? 'desc' : 'asc' }
      });
      setFilteredData(response.data);
    } catch (err) {
      console.error('Error sorting:', err);
    }
  };

  const sortIcon = (columnName) => {
    if (sortBy === columnName) {
      return order === 'asc' ? ' ↑' : ' ↓';
    }
    return null;
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'Health Score Male' || sortBy === 'Health Score Female') {
      return order === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    } else if (sortBy === 'Protein Classification' || sortBy === 'Energy Classification' ||
               sortBy === 'Carbohydrate Classification' || sortBy === 'Total Fat Classification' ||
               sortBy === 'Sugars total Classification' || sortBy === 'Fiber total dietary Classification' ||
               sortBy === 'Cholesterol Classification') {
      const orderValues = { 'high': 3, 'medium': 2, 'low': 1 };
      const defaultOrderValue = 0;

      const getOrderValue = (value) => orderValues[value] || defaultOrderValue;

      const aValue = getOrderValue(a[sortBy]);
      const bValue = getOrderValue(b[sortBy]);

      if (aValue !== bValue) {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return a[sortBy].localeCompare(b[sortBy]) * (order === 'asc' ? 1 : -1);
      }
    } else {
      const orderValue = order === 'asc' ? 1 : -1;
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      return aValue.localeCompare(bValue) * orderValue;
    }
  });

  return (
    <Layout>
        <Link to="/multiplefooddetails" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Multiple Food Details
      </Link>
      <div className="mb-3 md:w-96 mx-auto">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="text"
            placeholder="Search by description"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          />
          <span className="text-gray-100 input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32 pb-20">
          <Spinner />
        </div>
      ) : (
        <table className="min-w-full bg-gray-300 table-wrp">
        <CustomCursor/>
          <thead className="sticky bg-gray-200 border-b sticky top-0">
            <tr>
              <th>Food Code</th>
              <th>Description</th>
              <th>WWEIA Category Description</th>
              <th className="py-2" onClick={() => handleSort('Protein Classification')}>
                Protein Classification {sortIcon('Protein Classification')}
              </th>
              <th className="py-2" onClick={() => handleSort('Energy Classification')}>
                Energy Classification {sortIcon('Energy Classification')}
              </th>
              <th className="py-2" onClick={() => handleSort('Carbohydrate Classification')}>
                Carbohydrate Classification {sortIcon('Carbohydrate Classification')}
              </th>
              <th className="py-2" onClick={() => handleSort('Total Fat Classification')}>
                Total Fat Classification {sortIcon('Total Fat Classification')}
              </th>
              <th className="py-2" onClick={() => handleSort('Sugars total Classification')}>
                Sugars Total Classification {sortIcon('Sugars total Classification')}
              </th>
              <th className="py-2" onClick={() => handleSort('Fiber total dietary Classification')}>
                Fiber Total Dietary Classification {sortIcon('Fiber total dietary Classification')}
              </th>
              <th className="py-2" onClick={() => handleSort('Cholesterol Classification')}>
                Cholesterol Classification {sortIcon('Cholesterol Classification')}
              </th>
              <th className="py-2" onClick={() => handleSort('Health Score Male')}>
                Health Score Male {sortIcon('Health Score Male')}
              </th>
              <th className="py-2" onClick={() => handleSort('Health Score Female')}>
                Health Score Female {sortIcon('Health Score Female')}
              </th>
            </tr>
          </thead>
          <tbody>
          <CustomCursor/>
            {sortedData.map((item) => (
              <tr key={item._id} className="text-center hover:bg-teal-100 odd:bg-white even:bg-slate-50">
                <td className="py-2">{item['Food code']}</td>
                <td className="py-2">
                  <Link to={`/details/${item._id}`} className="text-blue-500">
                    {item['Main food description']}
                  </Link>
                </td>
                <td className="py-2">{item['WWEIA Category description']}</td>
                <td className="py-2">{item['Protein Classification']}</td>
                <td className="py-2">{item['Energy Classification']}</td>
                <td className="py-2">{item['Carbohydrate Classification']}</td>
                <td className="py-2">{item['Total Fat Classification']}</td>
                <td className="py-2">{item['Sugars total Classification']}</td>
                <td className="py-2">{item['Fiber total dietary Classification']}</td>
                <td className="py-2">{item['Cholesterol Classification']}</td>
                <td className="py-2">{item['Health Score Male']}</td>
                <td className="py-2">{item['Health Score Female']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </Layout>
  );
};

export default Data;
