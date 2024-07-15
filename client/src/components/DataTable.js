import React from 'react';
import { Link } from 'react-router-dom';
import CustomCursor from './CustomCursor'; // Ensure this is the correct path

const DataTable = ({ sortedData, handleCopyText, handleSort, sortIcon, searchQuery }) => {
    const isSortable = searchQuery.length > 0;
    return (
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
              <th
            scope="col"
            className="py-2  hover:bg-teal-100 duration-300 border border-slate-200"
            onClick={isSortable ? () => handleSort('Protein Classification') : undefined}>
            Protein Classification {sortIcon('Protein Classification')}
          </th>
              <th
            scope="col"
            className="py-2  hover:bg-teal-100 duration-300 border border-slate-200"
            onClick={isSortable ? () => handleSort('Energy Classification') : undefined}>
            Energy Classification {sortIcon('Energy Classification')}
          </th>
              <th
            scope="col"
            className="py-2  hover:bg-teal-100 duration-300 border border-slate-200"
            onClick={isSortable ? () => handleSort('Carbohydrate Classification') : undefined}>
            Carbohydrate Classification {sortIcon('Carbohydrate Classification')}
          </th>
              <th
            scope="col"
            className="py-2  hover:bg-teal-100 duration-300 border border-slate-200"
            onClick={isSortable ? () => handleSort('Total Fat Classification') : undefined}>
            Total Fat Classification {sortIcon('Total Fat Classification')}
          </th>
              <th
            scope="col"
            className="py-2  hover:bg-teal-100 duration-300 border border-slate-200"
            onClick={isSortable ? () => handleSort('Sugars total Classification') : undefined}>
            Sugars total Classification {sortIcon('Sugars total Classification')}
          </th>
              <th
            scope="col"
            className="py-2  hover:bg-teal-100 duration-300 border border-slate-200"
            onClick={isSortable ? () => handleSort('Fiber total dietary Classification') : undefined}>
            Fiber total dietary Classification {sortIcon('Fiber total dietary Classification')}
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
    )
};
 export default DataTable;