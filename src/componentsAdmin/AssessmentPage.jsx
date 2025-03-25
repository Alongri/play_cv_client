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
import "bootstrap/dist/css/bootstrap.min.css";

const AssessmentPage = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const spinnerStyle = {
    width: "60px",
    height: "60px",
    border: "6px solid transparent",
    borderTop: "6px solid transparent",
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderImage: "conic-gradient(from 0deg, #0d6efd, #6610f2) 1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "auto",
  };

  const keyframesSpin = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

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

  if (loading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <style>{keyframesSpin}</style>
        <div style={spinnerStyle}></div>
        <p className="mt-3 text-secondary">Loading assessment...</p>
      </div>
    );

  if (!analysis)
    return (
      <div className="container text-center text-danger mt-5">
        ❌ No assessment found.
      </div>
    );

  const radarData = Object.entries(analysis.traits).map(([key, value]) => ({
    trait: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh", maxWidth: "1080px", padding: "20px 0" }}
    >
      <h2 className="text-center mb-3 fw-bold display-6">
        🧠 Candidate Personality Assessment
      </h2>

      {/* Summary */}
      <div className="card shadow-sm mb-3 w-100" style={{ fontSize: "0.95rem" }}>
        <div className="card-body py-3 px-4">
          <h6 className="text-primary fw-bold mb-2">📄 Summary</h6>
          <p className="mb-0">{analysis.summary}</p>
        </div>
      </div>

      {/* Traits + Chart */}
      <div className="row w-100 mb-2 g-3">
        <div className="col-md-6">
          <div className="card border-success shadow-sm h-100">
            <div className="card-body p-3">
              <h6 className="text-success fw-bold mb-3">
                📊 Personality Traits (1–5)
              </h6>
              <ul className="list-group list-group-flush small">
                {Object.entries(analysis.traits).map(([trait, value]) => (
                  <li
                    key={trait}
                    className="list-group-item d-flex justify-content-between align-items-center px-2 py-1"
                  >
                    <span>{trait.charAt(0).toUpperCase() + trait.slice(1)}</span>
                    <span className="badge bg-primary rounded-pill">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-info shadow-sm h-100 px-2 py-2">
            <div className="card-body d-flex flex-column align-items-center justify-content-center p-2">
              <h6 className="text-info fw-bold mb-2">📈 Visual Personality Chart</h6>
              <div style={{ width: "100%", height: "300px", padding: "10px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="65%"
                    data={radarData}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="trait" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    <Radar
                      name="Candidate"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div className="card mb-2 shadow-sm border-success w-100">
        <div className="card-body py-3 px-4">
          <h6 className="text-success fw-bold">💪 Strengths</h6>
          <ul className="mb-0 small">
            {analysis.strengths.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Improvement Areas */}
      <div className="card mb-2 shadow-sm border-warning w-100">
        <div className="card-body py-3 px-4">
          <h6 className="text-warning fw-bold">📌 Areas for Improvement</h6>
          <ul className="mb-0 small">
            {analysis.improvementAreas.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overall Recommendation */}
      <div className="card shadow-sm border-info w-100">
        <div className="card-body py-3 px-4">
          <h6 className="text-info fw-bold">✅ Overall Recommendation</h6>
          <p className="fw-semibold small mb-0">{analysis.overallRecommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
