# **App Name**: AgroSage AI

## Core Features:

- User Authentication: Secure user authentication using Firebase Auth, including login, signup, and forgot password functionalities.  Supports farmer, expert, and admin roles.
- Crop Disease Detection: AI-powered crop disease detection using uploaded images and YOLOv8.  Generates disease name, severity, AI confidence, and LLM-generated treatment suggestions. The LLM uses information about diseases and treatments as a tool to generate the suggestions.
- Market Price Prediction: Predicts future 7-day price trends using Prophet with mock Indian mandi data.  Generates 'Best Sell Date' and 'Recommended Mandi', visualized in a Plotly line chart.
- Yield & Profit Forecast: Predicts expected yield and income, displaying a 'Profit Forecast Card'.  Generates a digital receipt (PDF) with crop details, price forecast, and buyer suggestion.
- AI Chat Assistant (AgroBot): An AI chatbot using LLM API (DistilGPT2 / Falcon 7B via Hugging Face). Handles queries like 'How to treat leaf curl?' or 'What is today’s rice price in Nagpur?'. The LLM uses crop data, price data, and treatment data as a tool.
- Alert System: Firebase Cloud Messaging sends notifications for disease detection, price drop alerts, and 'Sell now' signals.
- Dashboard & Visualization: Streamlit (or React + Tailwind UI) dashboard with tabs for 'Crop Health', 'Market Insights', 'Receipts', and 'Chatbot'.  Includes Plotly charts for prices, a pie chart of disease severity, and a table of active transactions.

## Style Guidelines:

- Primary color: HSL(48, 90%, 50%) – A vibrant yellow-gold (#F2C94C) evokes the warmth of a sunny field, suggesting wealth from crops without being a literal green. Dark color scheme.
- Background color: HSL(48, 20%, 15%) – A very dark, desaturated yellow-gold (#302D24) creates a grounding dark theme that makes data visualizations pop.
- Accent color: HSL(18, 80%, 60%) – A contrasting orange (#E88A42) will highlight key information and calls to action.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines, 'Inter' (sans-serif) for body.
- Use clear, minimalist icons representing crop health, market trends, and communication to ensure ease of understanding. All iconography shall be white or light gray so that it is legible in the selected dark color scheme.
- A tab-based layout for the farmer dashboard ensures easy navigation between different modules (Crop Health, Market Insights, Receipts, Chatbot).
- Subtle animations, such as transitions when switching between tabs or loading new data, enhance user experience without being distracting.