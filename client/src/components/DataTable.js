import React from 'react';
import { Link } from 'react-router-dom';
import CustomCursor from './CustomCursor'; // Ensure this is the correct path

const DataTable = ({ sortedData, handleCopyText, handleSort, sortIcon, searchQuery }) => {
    const isSortable = searchQuery.length > 0;
    return (
        <div className='overflow-x-scroll z-100 overflow-y-auto'>
        <CustomCursor />
        <table className=" bg-gray-500 table-fixed justify-center items-center sm:table-fixed border-collapse">
        <caption class="caption-top text-zinc-500 pb-4 hover:text-zinc-100">
    These Values are per 100 grams of food or per serving. 
  </caption>  
          <thead className="bg-violet-200 sticky top-0">
            <tr className="sticky top-0">
              <th className='border border-slate-200 columns-xs'>Food Code</th>
              <th className='border border-slate-200'>Description</th>
              <th className='border border-slate-200'>WWEIA Category Description</th>
              <th
  scope="col"
  className="py-2 hover:bg-teal-100 duration-300 border border-slate-200 relative"
  onClick={isSortable ? () => handleSort('Protein Classification') : undefined}
>
  <div className="flex items-center justify-center">
    Protein Classification {sortIcon('Protein Classification')}
    {isSortable && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-1">
        {/* Arrow icon or indicator */}
        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )}
  </div>
</th>
              <th
  scope="col"
  className="py-2 hover:bg-teal-100 duration-300 border border-slate-200 relative"
  onClick={isSortable ? () => handleSort('Energy Classification') : undefined}
>
  <div className="flex items-center justify-center">
  Energy Classification {sortIcon('Energy Classification')}
    {isSortable && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-1">
        {/* Arrow icon or indicator */}
        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )}
  </div>
</th>
              <th
  scope="col"
  className="py-2 hover:bg-teal-100 duration-300 border border-slate-200 relative"
  onClick={isSortable ? () => handleSort('Carbohydrate Classification') : undefined}
>
  <div className="flex items-center justify-center">
  Carbohydrate Classification {sortIcon('Carbohydrate Classification')}
    {isSortable && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-1">
        {/* Arrow icon or indicator */}
        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )}
  </div>
</th>
               <th
  scope="col"
  className="py-2 hover:bg-teal-100 duration-300 border border-slate-200 relative"
  onClick={isSortable ? () => handleSort('Total Fat Classification') : undefined}
>
  <div className="flex items-center justify-center">
  Total Fat Classification {sortIcon('Total Fat Classification')}
    {isSortable && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-1">
        {/* Arrow icon or indicator */}
        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )}
  </div>
</th>
           <th
  scope="col"
  className="py-2 hover:bg-teal-100 duration-300 border border-slate-200 relative"
  onClick={isSortable ? () => handleSort('Sugars total Classification') : undefined}
>
  <div className="flex items-center justify-center">
  <text className='whitespace-pre-line'> Sugars total    
  Classification </text>{sortIcon('Sugars total Classification')}
    {isSortable && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-1">
        {/* Arrow icon or indicator */}
        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )}
  </div>
</th>  
 <th
  scope="col"
  className="py-2 hover:bg-teal-100 duration-300 border border-slate-200 relative"
  onClick={isSortable ? () => handleSort('Fiber total dietary Classification') : undefined}
>
  <div className="flex items-center justify-center">
  Fiber total dietary Classification {sortIcon('Fiber total dietary Classification')}
    {isSortable && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-1">
        {/* Arrow icon or indicator */}
        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )}
  </div>
</th>        
              {/* <th className="py-2  hover:bg-teal-100 duration-300 border border-slate-200" onClick={() => handleSort('Cholesterol Classification')}>
                Cholesterol Classification {sortIcon('Cholesterol Classification')}
              </th> */}
              <th
  scope="col"
  className="py-2 hover:bg-teal-100 duration-300 border border-slate-200 relative"
  onClick={isSortable ? () => handleSort('Health Score Male') : undefined}
>
  <div className="flex items-center justify-center">
  Health Score Male {sortIcon('Health Score Male')}
    {isSortable && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-1">
        {/* Arrow icon or indicator */}
        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )}
  </div>
</th>             
<th
  scope="col"
  className="py-2 hover:bg-teal-100 duration-300 border border-slate-200 relative"
  onClick={isSortable ? () => handleSort('Health Score Female') : undefined}
>
  <div className="flex items-center justify-center">
  Health Score Female {sortIcon('Health Score Female')}
    {isSortable && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-1">
        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )}
  </div>
</th>   
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item._id} className="text-center hover:bg-teal-100 odd:bg-white even:bg-slate-50">
              <td 
  className="py-2 border border-slate-200 text-center"
>
  <button 
    className="w-full px-4 py-2 bg-teal-100 text-black font-medium rounded-md hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-150 ease-in-out"
    onClick={() => handleCopyText(item['Food code'])}
  >
    {item['Food code']}
  </button>
</td>

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
    )
};
 export default DataTable;