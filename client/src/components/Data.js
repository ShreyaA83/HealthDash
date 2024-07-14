//Table with copy to clipboard
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import CustomCursor from './CustomCursor'; // Update the path based on your project structure
import Layout from './Layout';
import debounce from 'lodash.debounce';
import copy from 'clipboard-copy';



const Data = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [clickCount, setClickCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [copied, setCopied] = useState(false);

  const handleCopyText = (text) => {
    copy(text)
      .then(() => {
        console.log(`Copied ${text} to clipboard successfully`);
        setCopied(true);

        // Hide the notification after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/data');
      setFilteredData(response.data);
      setIsLoading(false);
      setClickCount({});
    } catch (err) {
      console.error('Error fetching data:', err);
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);


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
  const debouncedSearch = debounce(handleSearch, 200); 


  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (value.length > 3) {
      debouncedSearch(value);
    } else {
      // Clear filteredData if search query length is <= 3
      setFilteredData([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery); // Immediately search on Enter key press
    }
  };

  const handleSort = async (columnName) => {
    if (sortBy === columnName) {
      const newOrder = order === 'desc' ? 'asc' : 'desc';
      setOrder(newOrder);
      setClickCount({ ...clickCount, [columnName]: clickCount[columnName] + 1 || 1 });
      if (clickCount[columnName] === 2) {
        setSortBy('');
        setOrder('desc');
        setClickCount({});
      }
    } else {
      setSortBy(columnName);
      setOrder('desc');
      setClickCount({ ...clickCount, [columnName]: 1 });
    }
    try {
      const response = await axios.get('http://localhost:5000/api/data', {
        params: { query: searchQuery, sortBy: columnName, order: order === 'desc' ? 'asc' : 'desc' }
      });
      setFilteredData(response.data);
    } catch (err) {
      console.error('Error sorting:', err);
    }
  };

  const sortIcon = useMemo(() => {
    return (columnName) => {
      if (sortBy === columnName) {
        return order === 'desc' ? '↓' : '↑';
      }
      return null;
    };
  }, [sortBy, order]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
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
          return a[sortBy].localeCompare(b[sortBy]) * (order === 'desc' ? 1 : -1);
        }
      } else {
        const orderValue = order === 'asc' ? 1 : -1;
        const aValue = a[sortBy] || '';
        const bValue = b[sortBy] || '';
        return aValue.localeCompare(bValue) * orderValue;
      }
    });
  }, [filteredData, sortBy, order]);

  return (
    <Layout>
    <div className='pb-5'><Link to="/" className="text-blue-400 hover:text-blue-200 ">&larr; Back to Home</Link>
</div>
        <Link to="/multiplefooddetails" target="_blank" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ">
        Multiple Food Details
      </Link>
      {copied && <span className="text-green-500 ml-2">Copied to clipboard!</span>}

      <div className="mb-3 md:w-96 mx-auto">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch p-4">
          <input
        type="text"
        placeholder="Search by description"
        value={searchQuery}
        onChange={handleSearchInputChange} 
        onKeyDown={handleKeyPress}
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
        <div className='overflow-x-scroll overflow-y-auto'>
        <CustomCursor />
        <table className=" bg-gray-500 table-fixed justify-center items-center sm:table-fixed border-collapse">
        <caption class="caption-top text-zinc-500 pb-4 hover:text-zinc-100">
    These Values are per 100 grams of food or per serving. 
  </caption>
          <thead className="bg-violet-200 border-b ">
            <tr className='sticky top-0 '>
              <th className='border border-slate-200 '>Food Code</th>
              <th className='border border-slate-200'>Description</th>
              <th className='border border-slate-200'>WWEIA Category Description</th>
              <th className="py-2  hover:bg-teal-100 duration-300 border border-slate-200" onClick={() => handleSort('Protein Classification')}>
                Protein Classification {sortIcon('Protein Classification')}
              </th>
              <th className="py-2  hover:bg-teal-100 duration-300 border border-slate-200" onClick={() => handleSort('Energy Classification')}>
                Energy Classification {sortIcon('Energy Classification')}
              </th>
              <th className="py-2  hover:bg-teal-100 duration-300 border border-slate-200" onClick={() => handleSort('Carbohydrate Classification')}>
                Carbohydrate Classification {sortIcon('Carbohydrate Classification')}
              </th>
              <th className="py-2  hover:bg-teal-100 duration-300 border border-slate-200" onClick={() => handleSort('Total Fat Classification')}>
                Total Fat Classification {sortIcon('Total Fat Classification')}
              </th>
              <th className="py-2  hover:bg-teal-100 duration-300 border border-slate-200" onClick={() => handleSort('Sugars total Classification')}>
                Sugars Total Classification {sortIcon('Sugars total Classification')}
              </th>
              <th className="py-2  hover:bg-teal-100 duration-300 border border-slate-200" onClick={() => handleSort('Fiber total dietary Classification')}>
                Fiber Total Dietary Classification {sortIcon('Fiber total dietary Classification')}
              </th> 
              {/* <th className="py-2  hover:bg-teal-100 duration-300 border border-slate-200" onClick={() => handleSort('Cholesterol Classification')}>
                Cholesterol Classification {sortIcon('Cholesterol Classification')}
              </th> */}
              <th className="py-2  hover:bg-teal-100 duration-300 border border-slate-200" onClick={() => handleSort('Health Score Male')}>
                Health Score Male {sortIcon('Health Score Male')}
              </th>
              <th className="py-2  hover:bg-teal-100 duration-300 border border-slate-200" onClick={() => handleSort('Health Score Female')}>
                Health Score Female {sortIcon('Health Score Female')}
              </th>
            </tr>
          </thead>
          <tbody>
          <CustomCursor/>
            {sortedData.map((item) => (
              <tr key={item._id} className="text-center hover:bg-teal-100 odd:bg-white even:bg-slate-50">
              <div class="flex items-center">
                        {/* <input id="checkbox-table-3" 
                        type="checkbox" 
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 p-2" />
                        <label for="checkbox-table-3" class="sr-only">checkbox</label> */}
                    
                <td className="py-2 border border-slate-200 select-all" onClick={() => handleCopyText(item['Food code'])} >
                {item['Food code']}
                </td>
                </div>
                <td className="py-2 border border-slate-200">
                  <Link to={`/details/${item._id}`} className="text-blue-500">
                    {item['Main food description']}
                  </Link>
                </td>
                <td className="py-2 border border-slate-200">{item['WWEIA Category description']}</td>
                <td className="py-2 border border-slate-200">{item['Protein Classification']}</td>
                <td className="py-2 border border-slate-200">{item['Energy Classification']}</td>
                <td className="py-2 border border-slate-200">{item['Carbohydrate Classification']}</td>
                <td className="py-2 border border-slate-200">{item['Total Fat Classification']}</td>
                <td className="py-2 border border-slate-200">{item['Sugars total Classification']}</td>
                <td className="py-2 border border-slate-200">{item['Fiber total dietary Classification']}</td>
                {/* <td className="py-2 border border-slate-200">{item['Cholesterol Classification']}</td> */}
                <td className="py-2 border border-slate-200">{item['Health Score Male'].toFixed(3)}</td>
                <td className="py-2 border border-slate-200">{item['Health Score Female'].toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      </Layout>
  );
};

export default Data;
