/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import Questionnaire from "./Quetionare";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const ChartAndSuggestion = () => {
  const [chartData, setChartData] = useState<any | null>(null); // You can define a more specific type if needed
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleQuestionnaireSubmit = async (responses: { [key: string]: string }) => {
    setLoading(true);
    try {
      // Assuming API returns { suggestions: string[], chartData: { labels: string[], values: number[] } }
      const result = {
        suggestions: [
          "Take a 10-minute meditation break.",
          "Drink plenty of water today.",
          "Try a 30-minute walk in nature."
        ],
        chartData: {
          labels: ["Happiness", "Stress", "Sleep", "Energy", "Focus"],
          values: [8, 5, 7, 6, 8]
        }
      };

      setSuggestions(result.suggestions);
      setChartData({
        labels: result.chartData.labels,
        datasets: [
          {
            label: "Mood Metrics",
            data: result.chartData.values,
            backgroundColor: ["#4CAF50", "#FF9800", "#F44336", "#2196F3", "#FFC107"]
          }
        ]
      });
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <Questionnaire onSubmit={handleQuestionnaireSubmit} />
      </div>

      {loading && <p className="text-center text-gray-600 mt-4">Loading...</p>}

      {suggestions && (
        <div className="mt-6 bg-white p-6 rounded shadow-lg max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Health Suggestions</h2>
          <ul className="list-disc pl-5 space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-700">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {chartData && (
        <div className="mt-6 bg-white p-6 rounded shadow-lg w-full max-w-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Mood Chart</h2>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
};

export default ChartAndSuggestion;
