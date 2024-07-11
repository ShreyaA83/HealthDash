import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams} from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import Layout from './Layout';
import Spinner from './Spinner';


Chart.register(ArcElement, Tooltip, Legend);

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/data/${id}`);
        console.log('Fetched Detail Data:', response.data);
        setDetailData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  if (!detailData) {
    return <div><Spinner /></div>;
  }

  // Calculate average health score
  const healthScoreMale = detailData['Health Score Male'];
  const healthScoreFemale = detailData['Health Score Female'];
  const averageHealthScore = (healthScoreMale + healthScoreFemale) / 2;

  // Determine background color based on the average health score
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

  // Prepare data for the pie chart
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
          detailData['Protein (g)'],
          detailData['Carbohydrate (g)'],
          detailData['Total Fat (g)'],
          detailData['Sugars, total\n(g)'],
          detailData['Fiber, total dietary (g)'],
          detailData['Fatty acids total saturated (g)'],
          detailData['Fatty acids total monounsaturated (g)'],
          detailData['Fatty acids total polyunsaturated (g)'],
          0.1 + (
            detailData['Cholesterol (g)'] + 
            detailData['Vitamin A RAE (g)'] + 
            detailData['Vitamin B6 (g)'] + 
            detailData['Calcium (g)'] + 
            detailData['Magnesium (g)'] +
            detailData['Selenium (g)'] + 
            detailData['Potassium (g)'] +
            detailData['Sodium (g)'] +
            detailData['Folate total (g)'] + 
            detailData['Riboflavin (g)'] +
            detailData['Choline total (g)'] +
            detailData['Vitamin K (phylloquinone) (g)'] + 
            detailData['Vitamin E (alpha tocopherol) (g)'] +
            detailData['Vitamin D (D2D3) (g)'] +
            detailData['Vitamin C (g)'] +
            detailData['Copper (g)']
          ),
        ],
        backgroundColor: [
          '#FF6384', // Red for Protein
          '#36A2EB', // Blue for Carbohydrate
          '#FFCE56', // Yellow for Total Fat
          '#4BC0C0', // Cyan for Sugars
          '#FFA500', // Orange for Fiber
          '#FF6347', // Tomato for Saturated Fatty Acids
          '#FFD700', // Gold for Monounsaturated Fatty Acids
          '#00BFFF', // DeepSkyBlue for Polyunsaturated Fatty Acids
          '#808080', // Grey for Other Nutrients
        ],
        hoverOffset: 8,
      },
    ],
  };

  // Custom options for the pie chart
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
    <div class="flex flex-col space-y-4">
        <div><Link to="/" className="text-blue-400 hover:text-blue-200 pb-10">&larr; Back to Home</Link>
</div>
      <div><Link to="/multiplefooddetails" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Multiple Food Details
      </Link>
      </div>
      </div>
      <div className="mb-4">
      </div>
      <h1 className="text-2xl font-bold mb-4 text-gray-100">{detailData['Main food description']}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div
            className={`rounded-lg shadow-md p-6 ${backgroundColor}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <h2 className="text-lg font-semibold mb-4">Nutrient Information</h2>
            <div className="mb-4">
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Energy (kcal)</span>
                <span>{detailData['Energy (kcal)']}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Protein (g)</span>
                <span>{detailData['Protein (g)']}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Carbohydrate (g)</span>
                <span>{detailData['Carbohydrate (g)']}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Total Fat (g)</span>
                <span>{detailData['Total Fat (g)']}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Sugars, total (g)</span>
                <span>{detailData['Sugars, total\n(g)']}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Fiber, total dietary (g)</span>
                <span>{detailData['Fiber, total dietary (g)']}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Cholesterol (g)</span>
                <span>{detailData['Cholesterol (g)']}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Fatty acids total saturated (g)</span>
                <span>{detailData['Fatty acids total saturated (g)']}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Fatty acids total monounsaturated (g)</span>
                <span>{detailData['Fatty acids total monounsaturated (g)']}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Fatty acids total polyunsaturated (g)</span>
                <span>{detailData['Fatty acids total polyunsaturated (g)']}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">Sodium (g)</span>
                <span>{detailData['Sodium (g)']}</span>
              </div>
              {isHovering && (
                <div className="flex justify-between border-b pb-2 mb-2">
                  <span className="font-semibold">Average Health Score</span>
                  <span>{averageHealthScore}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Nutrient Distribution</h2>
            <Pie data={nutritionalData} options={pieOptions} width={470} height={600} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
