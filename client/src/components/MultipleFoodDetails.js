import React, { useState } from 'react';
import axios from 'axios';
  import { Link } from 'react-router-dom';
// import CustomCursor from './CustomCursor';
import { Pie } from 'react-chartjs-2';
import Spinner from './Spinner';
import Layout from './Layout';

const MultipleFoodDetails = () => {
  const [foodCodes, setFoodCodes] = useState('');
  const [totalNutrition, setTotalNutrition] = useState({
    'Energy (kcal)': 0,
    'Protein (g)': 0,
    'Carbohydrate (g)': 0,
    'Total Fat (g)': 0,
    'Sugars, total\n(g)': 0,
    'Fiber, total dietary (g)': 0,
    'Cholesterol (g)': 0,
    'Fatty acids total saturated (g)': 0,
    'Fatty acids total monounsaturated (g)': 0,
    'Fatty acids total polyunsaturated (g)': 0,
    'Sodium (g)': 0,
    'Health Score Male': 0,
    'Health Score Female': 0,
    'Vitamin A RAE (g)': 0, 
    'Vitamin B6 (g)': 0, 
    'Calcium (g)': 0, 
    'Magnesium (g)': 0,
    'Selenium (g)': 0, 
    'Potassium (g)': 0,
    'Folate total (g)': 0, 
    'Riboflavin (g)': 0,
    'Choline total (g)': 0,
    'Vitamin K (phylloquinone) (g)': 0, 
    'Vitamin E (alpha tocopherol) (g)': 0,
    'Vitamin D (D2D3) (g)': 0,
    'Vitamin C (g)': 0,
    'Copper (g)' : 0
  });
  const [foodDescriptions, setFoodDescriptions] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  let averageHealthScore = (totalNutrition['Health Score Male'] + totalNutrition['Health Score Female']) / 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(''); 

    try {
      const foodCodesArray = foodCodes.split(',').map(code => code.trim()).filter(code => /^\d+$/.test(code)).map(code => parseInt(code));

      if (foodCodesArray.length === 0) {
        setError('Please enter valid numeric food codes separated by commas.');
        setLoading(false);
        return;
      }

      let totalNutritionValues = {
        'Energy (kcal)': 0,
        'Protein (g)': 0,
        'Carbohydrate (g)': 0,
        'Total Fat (g)': 0,
        'Sugars, total\n(g)': 0,
        'Fiber, total dietary (g)': 0,
        'Cholesterol (g)': 0,
        'Fatty acids total saturated (g)': 0,
        'Fatty acids total monounsaturated (g)': 0,
        'Fatty acids total polyunsaturated (g)': 0,
        'Sodium (g)': 0,
        'Health Score Male': 0,
        'Health Score Female': 0,
        'Vitamin A RAE (g)': 0, 
        'Vitamin B6 (g)': 0, 
        'Calcium (g)': 0, 
        'Magnesium (g)': 0,
        'Selenium (g)': 0, 
        'Potassium (g)': 0,
        'Folate total (g)': 0, 
        'Riboflavin (g)': 0,
        'Choline total (g)': 0,
        'Vitamin K (phylloquinone) (g)': 0, 
        'Vitamin E (alpha tocopherol) (g)': 0,
        'Vitamin D (D2D3) (g)': 0,
        'Vitamin C (g)': 0,
        'Copper (g)' : 0
      };

      let descriptions = [];
      for (let code of foodCodesArray) {
        try {
          const response = await axios.get(`http://localhost:5000/api/code/${code}`);
          const foodDetails = response.data;
          descriptions.push(foodDetails[0]['Main food description']);

          Object.keys(totalNutritionValues).forEach(key => {
            totalNutritionValues[key] += foodDetails[0][key] || 0;
          });
        } catch (err) {
          console.error(`Error fetching food details for code ${code}:`, err);
          setError(prev => `${prev}\nError fetching food details for code ${code}. Skipping this code.`);
        }
      }

      totalNutritionValues['Health Score Male'] /= foodCodesArray.length;
      totalNutritionValues['Health Score Female'] /= foodCodesArray.length;

      setTotalNutrition(totalNutritionValues);
      setFoodDescriptions(descriptions);
    } catch (error) {
      console.error('Error fetching food details:', error);
      setError('An error occurred while fetching food details. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  let backgroundColor = '';
  if (averageHealthScore >= 0 && averageHealthScore < 30) {
    backgroundColor = 'bg-red-200';
  } else if (averageHealthScore >= 30 && averageHealthScore < 50) {
    backgroundColor = 'bg-yellow-200';
  } else if (averageHealthScore >= 50 && averageHealthScore < 65) {
    backgroundColor = 'bg-blue-200';
  } else if (averageHealthScore >= 65 && averageHealthScore < 80) {
    backgroundColor = 'bg-green-200';
  } else if (averageHealthScore >= 80 && averageHealthScore <= 100) {
    backgroundColor = 'bg-purple-200';
  }

  const handleChange = (e) => {
    setFoodCodes(e.target.value);
  };

  const nutritionalData = {
    labels: [
      'Protein (g)',
      'Carbohydrate (g)',
      'Total Fat (g)',
      'Sugars, total\n(g)',
      'Fiber, total dietary (g)',
      'Fatty acids total saturated (g)',
      'Fatty acids total monounsaturated (g)',
      'Fatty acids total polyunsaturated (g)',
      'Micronutrients (%)',
    ],
    datasets: [
      {
        label: 'Nutritional Values',
        data: [
          totalNutrition['Protein (g)'],
          totalNutrition['Carbohydrate (g)'],
          totalNutrition['Total Fat (g)'],
          totalNutrition['Sugars, total\n(g)'],
          totalNutrition['Fiber, total dietary (g)'],
          totalNutrition['Fatty acids total saturated (g)'],
          totalNutrition['Fatty acids total monounsaturated (g)'],
          totalNutrition['Fatty acids total polyunsaturated (g)'],
          0.1 + (
            totalNutrition['Cholesterol (g)'] + 
            totalNutrition['Vitamin A RAE (g)'] + 
            totalNutrition['Vitamin B6 (g)'] + 
            totalNutrition['Calcium (g)'] + 
            totalNutrition['Magnesium (g)'] +
            totalNutrition['Selenium (g)'] + 
            totalNutrition['Potassium (g)'] +
            totalNutrition['Sodium (g)'] +
            totalNutrition['Folate total (g)'] + 
            totalNutrition['Riboflavin (g)'] +
            totalNutrition['Choline total (g)'] +
            totalNutrition['Vitamin K (phylloquinone) (g)'] + 
            totalNutrition['Vitamin E (alpha tocopherol) (g)'] +
            totalNutrition['Vitamin D (D2D3) (g)'] +
            totalNutrition['Vitamin C (g)'] +
            totalNutrition['Copper (g)']
          ),
        ],
        backgroundColor: [
          '#FF6384', // Red for Protein
          '#36A2EB', // Blue for Carbohydrate
          '#FFCE56', // Yellow for Total Fat
          '#4BC0C0', // Cyan for Sugars
          '#FFA500', // Orange for Fiber
          '#9966FF', // Purple for Saturated Fatty Acids
          '#FF9F40', // Orange for Monounsaturated Fatty Acids
          '#FFCD56', // Yellow for Polyunsaturated Fatty Acids
          '#C9CBCF', // Grey for Micronutrients
        ],
      },
    ],
  };
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            let label = nutritionalData.labels[tooltipItem.index] || '';
            if (label) {
              label += ': ';
            }
            // label += Math.round(nutritionalData.datasets[0].data[tooltipItem.index] * 100) / 100 + ' g'; // Assuming the unit is 'g' for grams
            return label;
          },
        },
      },
    },
  };

  return (
    <Layout>
    <div className='pb-3'>
        <Link to="/" className="text-blue-400 hover:text-blue-200 ">&larr; Back to Home</Link>
        </div>
        <div className=' px-15  flex items-center justify-center'>
      <div className="bg-custom-gradient flex px-5 py-5 justify-center w-1/3 items-center p-1 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <label htmlFor="foodCodes" className="block text-lg font-medium text-gray-100 text-center ">
            Enter Food Codes (comma-separated):
          </label>
          <input
            type="text"
            id="foodCodes"
            value={foodCodes}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Nutritional Information
          </button>
        </form>
      </div>
      </div>
      {error && (
        <div className="bg-red-200 p-4 mt-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <>
        <div className={`mb-4`}>
            <h2 className="text-2xl font-bold mb-4 text-white flex flex-cols items-center">Food Descriptions</h2>
            <ul className="list-disc ml-6">
              {foodDescriptions.map((description, index) => (
                <li key={index} className="text-lg text-gray-100">{description}</li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-md text-gray-100">Average Health Score: {averageHealthScore.toFixed(2)}</p>
            </div>
          </div>
        {foodDescriptions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 ">
            <div className="bg-white p-6 rounded-lg shadow-md bg-custom-gradient">
            <div className={`rounded-lg shadow-md p-6 ${backgroundColor}`}>
              <h2 className="text-2xl font-bold mb-4">Total Nutritional Information</h2>
              <div className="overflow-x-auto">
              <h2 className="text-lg font-semibold mb-4">Nutrient Information</h2>
            <div className="mb-4">
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Energy (kcal)</span>
                <span>{totalNutrition['Energy (kcal)'].toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Protein (g)</span>
                <span>{totalNutrition['Protein (g)'].toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Carbohydrate (g)</span>
                <span>{totalNutrition['Carbohydrate (g)'].toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Total Fat (g)</span>
                <span>{totalNutrition['Total Fat (g)'].toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Sugars, total (g)</span>
                <span>{totalNutrition['Sugars, total\n(g)'].toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Fiber, total dietary (g)</span>
                <span>{totalNutrition['Fiber, total dietary (g)'].toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Cholesterol (g)</span>
                <span>{totalNutrition['Cholesterol (g)'].toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Fatty acids total saturated (g)</span>
                <span>{totalNutrition['Fatty acids total saturated (g)'].toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Fatty acids total monounsaturated (g)</span>
                <span>{totalNutrition['Fatty acids total monounsaturated (g)'].toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Fatty acids total polyunsaturated (g)</span>
                <span>{totalNutrition['Fatty acids total polyunsaturated (g)'].toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Sodium (g)</span>
                <span>{totalNutrition['Sodium (g)'].toFixed(3)}</span>
              </div>
              </div>
              </div>
            </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md bg-custom-gradient">
              <h2 className="text-2xl font-bold mb-4 text-gray-100">Nutritional Information Pie Chart</h2>
              <div className="flex justify-center items-center bg-custom-gradient">
                <Pie data={nutritionalData} options={pieOptions} width={370} height={500}/>
              </div>
            </div>
          </div>
        )}
        </>
      )}
      
      </Layout>
  );
};

export default MultipleFoodDetails;
