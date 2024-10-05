import React, { useEffect, useState, useMemo, useCallback,useContext, lazy, Suspense, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import CustomCursor from './CustomCursor'; // Update the path based on your project structure
import Layout from './Layout';
import debounce from 'lodash.debounce';
import copy from 'clipboard-copy';
import { DataContext } from './DataContext';
import API_BASE_URL from '../config'



const DataTable = lazy(() => import('./DataTable'));

const Data = () => {
  const { data, setData, isLoading, setIsLoading } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [clickCount, setClickCount] = useState({});
  const [copied, setCopied] = useState(false);
  const [clickedFoodCodes, setClickedFoodCodes] = useState([]);
  const [suggestions, setSuggestions] = useState([]); 
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
  const searchInputRef = useRef(null);

  const handleCopyText = (text) => {
    setClickedFoodCodes((prevCodes) => [...prevCodes, text]);
  };
  
  const handleCopyAllFoodCodes = () => {
    const allFoodCodes = clickedFoodCodes.join(', ');
    copy(allFoodCodes)
      .then(() => {
        console.log(`Copied all food codes: ${allFoodCodes}`);
        setCopied(true);
  
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy all food codes:', err);
      });
  };

  const fetchData = useCallback(async () => {
    if (data.length === 0) {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/data`);
        setData(response.data);
        setFilteredData(response.data);
        setIsLoading(false);
        setClickCount({});
      } catch (err) {
        console.error('Error fetching data:', err);
        setIsLoading(false);
      }
    } else {
      setFilteredData(data);
      setIsLoading(false);
    }
  }, [data, setData, setIsLoading]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await axios.get((`${API_BASE_URL}/api/data`), {
        params: { query, sortBy, order }
      });
      setFilteredData(response.data);

      const suggestionsResponse = await axios.get(`${API_BASE_URL}/api/suggestions`, { 
        params: { query } 
      });
      setSuggestions(suggestionsResponse.data); 
      setIsDropdownVisible(true); 
    } catch (err) {
      console.error('Error searching:', err);
    }
  };
  const debouncedSearch = debounce(handleSearch, 300);
 
  const handleSearchInputChange = () => {
    const value = searchInputRef.current.value; 
    if (value.length > 3) {
      debouncedSearch(value); 
    } else {
      setSuggestions([]); 
      setIsDropdownVisible(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setIsDropdownVisible(false);
    handleSearch(suggestion); 
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };
  

  const handleSort = async (columnName) => {
    if (!searchQuery) return; 
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
      const response = await axios.get((`${API_BASE_URL}/api/data`), {
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
    <div className='pb-5'><Link to="/welcome" className="text-blue-400 hover:text-blue-200 ">&larr; Back to Home</Link>
</div>
        <Link to="/multiplefooddetails" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ">
        Multiple Food Details
      </Link>
      {copied && <span className="text-green-500 ml-2">Copied to clipboard!</span>}

      <div className="mb-3 md:w-96 mx-auto">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch p-4">
        <CustomCursor />
        <input
            type="text"
            placeholder="Search by description"
            ref={searchInputRef} 
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyPress}
            className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          />
          <span className="text-gray-100 input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </span>

          {isDropdownVisible && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="cursor-pointer hover:bg-blue-200 p-2"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32 pb-20">
          <Spinner />
        </div>
      ) : (
        <Suspense fallback={<Spinner />}>
        <CustomCursor />
        <div className="relative mb-4 flex w-full flex-wrap items-stretch p-4">
    <div className="flex-1 border border-gray-300 p-2 rounded">
      <p className="text-sm text-gray-300">[Click on desired FoodCodes to insert here]<br></br>Selected Food Codes: </p>
      <p className="text-sm text-gray-100">{clickedFoodCodes.join(', ')}</p>
    </div>
    <button
      onClick={handleCopyAllFoodCodes}
      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      Copy All Food Codes
    </button>
  </div>
            <DataTable
            sortedData={sortedData}
            handleCopyText={handleCopyText}
            handleSort={handleSort}
            sortIcon={sortIcon}
            searchQuery={searchQuery}
          />
        </Suspense>
      )}
    </Layout>
  );
};

export default Data;