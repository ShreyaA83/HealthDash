import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import { Pie } from 'react-chartjs-2';
import Spinner from './Spinner';
import Layout from './Layout';
import './FlipCard.css';

const RDA_MALE = {
  'Energy (kcal)': 2400,
  'Protein (g)': 55,
  'Carbohydrate (g)': 130,
  'Sugars, total\n(g)': 50,
  'Fiber, total dietary (g)': 30.8,
  'Total Fat (g)': 73.34,
  'Fatty acids total saturated (g)': 26.67,
  'Fatty acids total monounsaturated (g)': 23.3,
  'Fatty acids total polyunsaturated (g)': 23.3,
  'Cholesterol (g)': 0.5,
  'Vitamin A RAE (g)': 0.0009,
  'Vitamin B6 (g)': 0.0013,
  'Calcium (g)': 1,
  'Magnesium (g)': 0.41,
  'Selenium (g)': 0.055,
  'Potassium (g)': 4.7,
  'Folate total (g)': 0.0004,
  'Riboflavin (g)': 0.0012,
  'Choline total (g)': 0.55,
  'Vitamin K (phylloquinone) (g)': 0.00012,
  'Vitamin E (alpha tocopherol) (g)': 0.015,
  'Vitamin D (D2D3) (g)': 0.015,
  'Vitamin C (g)': 0.09,
  'Copper (g)': 0.0009,
  'Iron (g)': 0.008,
  'Zinc (g)': 0.011,
};

const RDA_FEMALE = {
  'Energy (kcal)': 1800,
  'Protein (g)': 46,
  'Carbohydrate (g)': 130,
  'Sugars, total\n(g)': 50,
  'Fiber, total dietary (g)': 30.8,
  'Total Fat (g)': 55,
  'Fatty acids total saturated (g)': 20,
  'Fatty acids total monounsaturated (g)': 17.5,
  'Fatty acids total polyunsaturated (g)': 17.5,
  'Cholesterol (g)': 0.3,
  'Vitamin A RAE (g)': 0.0007,
  'Vitamin B6 (g)': 0.0013,
  'Calcium (g)': 0.7,
  'Magnesium (g)': 0.315,
  'Selenium (g)': 0.055,
  'Potassium (g)': 4.7,
  'Folate total (g)': 0.0004,
  'Riboflavin (g)': 0.0011,
  'Choline total (g)': 0.425,
  'Vitamin K (phylloquinone) (g)': 0.000009,
  'Vitamin E (alpha tocopherol) (g)': 0.015,
  'Vitamin D (D2D3) (g)': 0.015,
  'Vitamin C (g)': 0.075,
  'Copper (g)': 0.0009,
  'Iron (g)': 0.018,
  'Zinc (g)': 0.008,
};


const MultipleFoodDetails = () => {
  const [foodCodes, setFoodCodes] = useState('');
  const [percentageRDA, setPercentageRDA] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);


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
  const [isHovering, setIsHovering] = useState(false);
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
          const response = await axios.get(`${API_BASE_URL}/api/code/${code}`);
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
      const percentageRDA = {};
    Object.keys(totalNutritionValues).forEach(key => {
      percentageRDA[key] = {
        male: (totalNutritionValues[key] / RDA_MALE[key]) * 100,
        female: (totalNutritionValues[key] / RDA_FEMALE[key]) * 100,
      };
    });

    setTotalNutrition(totalNutritionValues);
    setFoodDescriptions(descriptions);
    setPercentageRDA(percentageRDA);
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
      }, legend: {
        labels: {
          color: 'white', // Change the color of legend labels
        },
      },
    },
  };
  const handleClick = () => {
    setIsFlipped(!isFlipped);
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
        <CustomCursor />
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
          <div className="grid grid-cols-2 p-1 md:grid-cols-2 sm:grid-cols-2 gap-4 mt-20 mb-20 md:max-md:flex xs:min-md:flex md:auto-cols-min  grid-cols-*" >
          <div className="bg-white p-4 rounded-lg shadow-md bg-custom-gradient flip-card ">
          <div className={`flip-card ${isFlipped ? 'flipped' : ''} `} onClick={handleClick}>
        <div className="flip-card-inner">
          <div className="flip-card-back">
          <div className={`rounded-lg shadow-md p-6 ${backgroundColor}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          >
          <h2 className="text-2xl font-bold mb-4">Total Nutritional Information - Male</h2>
          {isHovering && (
                <div className="flex justify-center items-center border-b pb-1 ">
                  <span className="font-bold">Click To Flip</span>
                </div>
              )}
              <div className="overflow-x-auto">
                <h2 className="text-lg font-semibold mb-4">Nutrient Information</h2>
                <div className="mb-2">
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Energy (kcal)</span>
                    <span>{totalNutrition['Energy (kcal)'].toFixed(3)} ({percentageRDA['Energy (kcal)'].male.toFixed(2)}% of male RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Protein (g)</span>
                    <span>{totalNutrition['Protein (g)'].toFixed(3)} ({percentageRDA['Protein (g)'].male.toFixed(2)}% of male RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Carbohydrate (g)</span>
                    <span>{totalNutrition['Carbohydrate (g)'].toFixed(3)} ({percentageRDA['Carbohydrate (g)'].male.toFixed(2)}% of male RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Total Fat (g)</span>
                    <span>{totalNutrition['Total Fat (g)'].toFixed(3)} ({percentageRDA['Total Fat (g)'].male.toFixed(2)}% of male RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Sugars, total (g)</span>
                    <span>{totalNutrition['Sugars, total\n(g)'].toFixed(3)} ({percentageRDA['Sugars, total\n(g)'].male.toFixed(2)}% of male RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Fiber, total dietary (g)</span>
                    <span>{totalNutrition['Fiber, total dietary (g)'].toFixed(3)} ({percentageRDA['Fiber, total dietary (g)'].male.toFixed(2)}% of male RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Cholesterol (g)</span>
                    <span>{totalNutrition['Cholesterol (g)'].toFixed(3)} ({percentageRDA['Cholesterol (g)'].male.toFixed(2)}% of male RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Fatty acids total saturated (g)</span>
                    <span>{totalNutrition['Fatty acids total saturated (g)'].toFixed(3)} ({percentageRDA['Fatty acids total saturated (g)'].male.toFixed(2)}% of male RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Fatty acids total monounsaturated (g)</span>
                    <span>{totalNutrition['Fatty acids total monounsaturated (g)'].toFixed(3)} ({percentageRDA['Fatty acids total monounsaturated (g)'].male.toFixed(2)}% of male RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Fatty acids total polyunsaturated (g)</span>
                    <span>{totalNutrition['Fatty acids total polyunsaturated (g)'].toFixed(3)} ({percentageRDA['Fatty acids total polyunsaturated (g)'].male.toFixed(2)}% of male RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Sodium (g)</span>
                    <span>{totalNutrition['Sodium (g)'].toFixed(3)} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Female Nutrition Card */}
          <div className="flip-card-front">
            <div className={`rounded-lg shadow-md p-6 ${backgroundColor}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            >
              <h2 className="text-2xl font-bold mb-4">Total Nutritional Information - Female</h2>
              <div className="overflow-x-auto ">
              {isHovering && (
                <div className="flex justify-center items-center border-b pb-1">
                  <span className="font-bold">Click To Flip</span>
                </div>
              )}
                <h2 className="text-lg font-semibold mb-4">Nutrient Information</h2>
                <div className="mb-2">
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Energy (kcal)</span>
                    <span>{totalNutrition['Energy (kcal)'].toFixed(3)} ({percentageRDA['Energy (kcal)'].female.toFixed(2)}% of female RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Protein (g)</span>
                    <span>{totalNutrition['Protein (g)'].toFixed(3)} ({percentageRDA['Protein (g)'].female.toFixed(2)}% of female RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Carbohydrate (g)</span>
                    <span>{totalNutrition['Carbohydrate (g)'].toFixed(3)} ({percentageRDA['Carbohydrate (g)'].female.toFixed(2)}% of female RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Total Fat (g)</span>
                    <span>{totalNutrition['Total Fat (g)'].toFixed(3)} ({percentageRDA['Total Fat (g)'].female.toFixed(2)}% of female RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Sugars, total (g)</span>
                    <span>{totalNutrition['Sugars, total\n(g)'].toFixed(3)} ({percentageRDA['Sugars, total\n(g)'].female.toFixed(2)}% of female RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Fiber, total dietary (g)</span>
                    <span>{totalNutrition['Fiber, total dietary (g)'].toFixed(3)} ({percentageRDA['Fiber, total dietary (g)'].female.toFixed(2)}% of female RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Cholesterol (g)</span>
                    <span>{totalNutrition['Cholesterol (g)'].toFixed(3)} ({percentageRDA['Cholesterol (g)'].female.toFixed(2)}% of female RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Fatty acids total saturated (g)</span>
                    <span>{totalNutrition['Fatty acids total saturated (g)'].toFixed(3)} ({percentageRDA['Fatty acids total saturated (g)'].female.toFixed(2)}% of female RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Fatty acids total monounsaturated (g)</span>
                    <span>{totalNutrition['Fatty acids total monounsaturated (g)'].toFixed(3)} ({percentageRDA['Fatty acids total monounsaturated (g)'].female.toFixed(2)}% of female RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Fatty acids total polyunsaturated (g)</span>
                    <span>{totalNutrition['Fatty acids total polyunsaturated (g)'].toFixed(3)} ({percentageRDA['Fatty acids total polyunsaturated (g)'].female.toFixed(2)}% of female RDA)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-semibold">Sodium (g)</span>
                    <span>{totalNutrition['Sodium (g)'].toFixed(3)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

              <div className="bg-white p-6 rounded-lg shadow-md bg-custom-gradient md:max-sm:grid  sm:max-sm:grid">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">Nutritional Information Pie Chart</h2>
                  <Pie data={nutritionalData} options={pieOptions} width={350} height={500} />
                  </div>
      </div>
      
        )}
        </>
      )}
      
      </Layout>
  );
};

export default MultipleFoodDetails;
