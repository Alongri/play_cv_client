import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../services/apiService";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const AssessmentPage = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const url = `${API_URL}/videos/recommendation/personality/${id}`;
        const res = await doApiGet(url);
        setAnalysis(res.data || res);
      } catch (err) {
        console.error("Failed to load assessment:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [id]);

  const radarData =
    analysis?.traits &&
    Object.entries(analysis.traits).map(([key, value]) => ({
      trait: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }));

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-700">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-blue-600 font-medium">Loading assessment...</p>
      </div>
    );

  if (!analysis)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">
        ❌ No assessment found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-purple-200 p-6 md:p-12 text-gray-800">
      <div className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-fuchsia-700">
          🧠 Personality Assessment
        </h2>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-fuchsia-700 mb-2">📄 Summary</h3>
          <p className="text-gray-700">{analysis.summary}</p>
        </div>

        {/* Traits and Radar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-purple-700 mb-4">
              📊 Personality Traits (1–5)
            </h3>
            <ul className="space-y-2">
              {Object.entries(analysis.traits).map(([trait, value]) => (
                <li
                  key={trait}
                  className="flex justify-between text-gray-700 border-b pb-1"
                >
                  <span>{trait.charAt(0).toUpperCase() + trait.slice(1)}</span>
                  <span className="font-semibold text-purple-600">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-blue-700 mb-4 text-center">
              📈 Visual Personality Chart
            </h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="trait" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} />
                  <Radar
                    name="Candidate"
                    dataKey="value"
                    stroke="#9333ea"
                    fill="#e879f9"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-green-600 mb-3">💪 Strengths</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {analysis.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Improvement Areas */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-yellow-600 mb-3">📌 Areas for Improvement</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {analysis.improvementAreas.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Recommendation */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-cyan-700 mb-2">✅ Overall Recommendation</h3>
          <p className="font-semibold text-gray-800">
            {analysis.overallRecommendation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
