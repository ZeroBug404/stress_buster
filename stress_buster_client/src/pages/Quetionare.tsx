import React, { useState } from "react";

interface QuestionnaireProps {
  onSubmit: (responses: { [key: string]: string }) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState({
    happiness: "",
    stress: "",
    sleep: "",
    energy: "",
    focus: "",
    gratitude: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="p-6 max-w-md mx-auto space-y-6 bg-white shadow-lg rounded-lg border border-gray-200"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(answers);
      }}
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Mood Tracker
      </h2>
      <p className="text-gray-600 text-center">
        Answer the questions to track your mood and well-being.
      </p>

      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">
            How happy are you today? (1-10)
          </span>
          <input
            type="number"
            name="happiness"
            min="1"
            max="10"
            value={answers.happiness}
            onChange={handleChange}
            className="mt-2 block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">
            How stressed are you today? (1-10)
          </span>
          <input
            type="number"
            name="stress"
            min="1"
            max="10"
            value={answers.stress}
            onChange={handleChange}
            className="mt-2 block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">
            How many hours did you sleep last night?
          </span>
          <input
            type="number"
            name="sleep"
            min="0"
            max="24"
            value={answers.sleep}
            onChange={handleChange}
            className="mt-2 block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">
            How energetic do you feel today? (1-10)
          </span>
          <input
            type="number"
            name="energy"
            min="1"
            max="10"
            value={answers.energy}
            onChange={handleChange}
            className="mt-2 block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">
            How focused are you today? (1-10)
          </span>
          <input
            type="number"
            name="focus"
            min="1"
            max="10"
            value={answers.focus}
            onChange={handleChange}
            className="mt-2 block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">
            What are you most grateful for today?
          </span>
          <textarea
            name="gratitude"
            value={answers.gratitude}
            onChange={handleChange}
            className="mt-2 block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a short note..."
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 active:scale-95 transition"
      >
        Submit Responses
      </button>
    </form>
  );
};

export default Questionnaire;
