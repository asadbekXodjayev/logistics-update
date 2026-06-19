import React from "react";

const Construction = () => {
    return (
        <div className="construction-container">
            <div className="construction-card">
                <h1 className="title">🚧 Under Construction 🚧</h1>
                <p className="subtitle">
                    This page is currently being built. We’ll be back soon!
                </p>
                <h1 className="loader"></h1>
            </div>

            <style>{`
        .construction-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          font-family: "Poppins", sans-serif;
        }

        .construction-card {
          text-align: center;
          padding: 40px 60px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
          color: #e2e8f0;
          max-width: 600px;
          width: 90%;
        }

        .title {
          font-size: 2rem;
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        .subtitle {
          font-size: 1rem;
          opacity: 0.8;
          margin-bottom: 30px;
        }

        .loader {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.2);
          border-top: 5px solid ;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
};

export default Construction;