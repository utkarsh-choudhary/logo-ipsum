// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BarChart = () => {
//   const data = {
//     labels: ['1', '1', '1', '1'],
//     datasets: [
//       {
//         label: 'S.length',
//         data: [1, 0, 0, 1],
//         backgroundColor: '#1E90FF', // blue
//       },
//       {
//         label: 'S-width',
//         data: [0, 1, 0, 0],
//         backgroundColor: '#FF6347', // red
//       },
//       {
//         label: 'P.length',
//         data: [0, 0, 1, 0],
//         backgroundColor: '#BA55D3', // purple
//       },
//       {
//         label: 'P.width',
//         data: [1, 0, 0, 0],
//         backgroundColor: '#20B2AA', // teal
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'right',
//         labels: {
//           color: '#FFFFFF', // White color for labels
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           color: '#FFFFFF', // White color for x-axis ticks
//         },
//       },
//       y: {
//         grid: {
//           color: '#444444', // Dark grey grid lines
//         },
//         ticks: {
//           color: '#FFFFFF', // White color for y-axis ticks
//         },
//       },
//     },
//   };

//   return (
//     <div className=" flex justify-center items-center p-4 rounded-lg w-full h-full ">
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default BarChart;

import React from 'react';

const data = [
  { label: 'S.length', value: 1, color: 'bg-blue-500' },
  { label: 'S-width', value: 0.8, color: 'bg-red-500' },
  { label: 'P.length', value: 1, color: 'bg-purple-500' },
  { label: 'p.width', value: 1, color: 'bg-green-400' },
];

export default function BarChart() {
  return (
    <div className=" p-6 rounded-lg w-full h-full flex">
      <div className="flex-grow">
        <div className="relative h-64">
          {[1, 0.75, 0.5, 0.25, 0].map((tick, index) => (
            <div key={index} className="absolute w-full border-t border-gray-700" style={{bottom: `${tick * 100}%`}}>
              <span className="text-xs text-white absolute -left-6">{tick}</span>
            </div>
          ))}
          <div className="absolute inset-0 flex justify-between items-end">
            {data.map((item, index) => (
              <div key={index} className="w-16 flex justify-center items-end h-full">
                <div 
                  className={`w-12 ${item.color}`} 
                  style={{height: `${item.value * 100}%`}}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-2">
          {data.map((item, index) => (
            <div key={index} className="text-white text-xs w-16 text-center">1</div>
          ))}
        </div>
      </div>
      <div className="ml-8 flex flex-col justify-center">
        {data.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <div className={`w-4 h-4 ${item.color} mr-2`}></div>
            <span className="text-white text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}