import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database"; // ✅ Added getDatabase
import { app } from "../components/Firebase"; // ✅ your existing Firebase app

const ContentList = () => {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const db = getDatabase(app); // ✅ Initialize database
    const cardRef = ref(db, "users"); // reference to 'users' node
    onValue(cardRef, (snapshot) => {
      const retrievedData = snapshot.val();
      console.log(retrievedData);
      setCardData(retrievedData);
    });
  }, []);

  const deleteCard = (key) => {
    const db = getDatabase(app);
    const cardRef = ref(db, "users/" + key);
    remove(cardRef);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        User Job Cards
      </h2>

      {cardData ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(cardData).map(([key, value]) => (
            <div
              key={key}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-5 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {value.companyName}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium text-gray-700">Job Title:</span>{" "}
                {value.jobTitle}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium text-gray-700">Location:</span>{" "}
                {value.location}
              </p>
              <p className="text-gray-600 mb-1 truncate">
                <span className="font-medium text-gray-700">Link:</span>{" "}
                <a
                  href={value.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-600"
                >
                  {value.link}
                </a>
              </p>
              <p className="text-gray-600 mb-3">
                <span className="font-medium text-gray-700">Status:</span>{" "}
                {value.status}
              </p>

              <button
                onClick={() => deleteCard(key)}
                className="w-full py-2 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all duration-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No data available.</p>
      )}
    </div>
  );
};

export default ContentList;
