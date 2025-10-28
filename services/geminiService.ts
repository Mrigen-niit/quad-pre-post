import { GoogleGenAI } from "@google/genai";
import type { CalibrationPhase, ChartDataPoint, Satellite } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. The application may not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const generatePrompt = (phase: CalibrationPhase, data: ChartDataPoint[], satellite: Satellite): string => {
  const dataString = JSON.stringify(data.map(d => ({ metric: d.name, measured: d.value, expected: d.expected })), null, 2);

  const baseInstruction = `
    You are a world-class satellite systems engineer providing a concise, professional analysis.
    Format your response using Markdown. Use headings, bullet points, and bold text for clarity.
    Do not use code blocks for the report itself.
  `;

  switch (phase) {
    case 'Pre-Launch':
      return `
        ${baseInstruction}
        **Subject: Pre-Launch Calibration Analysis for ${satellite.name}**

        Analyze the following pre-launch thermal vacuum chamber test data for the satellite "${satellite.name}".
        - Identify significant anomalies or deviations from expected performance.
        - Highlight potential issues that require attention before launch.
        - Provide a concise summary with actionable recommendations for recalibration if necessary.

        **Satellite Details:**
        - **Name:** ${satellite.name}
        - **Status:** ${satellite.status}

        **Sensor Test Data (Measured vs. Expected):**
        ${dataString}
      `;
    case 'In-Orbit':
      return `
        ${baseInstruction}
        **Subject: In-Orbit Performance Analysis for ${satellite.name}**

        Analyze the following in-orbit instrument drift data. This data shows performance degradation over several years.
        - Assess the degradation trend and its impact on mission objectives and data quality.
        - Suggest potential operational adjustments or updated calibration parameters to compensate for the drift.
        - Provide a clear summary of the instrument's health.

        **Satellite Details:**
        - **Name:** ${satellite.name}
        - **Status:** ${satellite.status}

        **Instrument Drift Data (Degradation %):**
        ${dataString}
      `;
    case 'Post-Orbit':
      return `
        ${baseInstruction}
        **Subject: End-of-Life Subsystem Analysis for ${satellite.name}**

        Analyze the final diagnostic data from the decommissioned satellite "${satellite.name}".
        - Summarize its end-of-life operational health across key subsystems.
        - Based on the final health data (especially propellant levels), recommend a safe and standard decommissioning procedure (e.g., controlled atmospheric reentry vs. graveyard orbit transfer).
        - Conclude with a final assessment of the satellite's overall performance against its design life.

        **Satellite Details:**
        - **Name:** ${satellite.name}
        - **Status:** ${satellite.status}

        **Final Subsystem Health (% vs. Expected Minimums):**
        ${dataString}
      `;
    default:
      return `Analyze the following data: ${dataString}`;
  }
};

export const getCalibrationAnalysis = async (
  phase: CalibrationPhase,
  data: ChartDataPoint[],
  satellite: Satellite
): Promise<string> => {
  if (!process.env.API_KEY) {
      throw new Error("API Key not found. Please ensure the API_KEY environment variable is set.");
  }

  try {
    const prompt = generatePrompt(phase, data, satellite);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};