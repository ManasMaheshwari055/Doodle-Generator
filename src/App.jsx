import React, { useState } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import "./App.css"; // Import your CSS for styling

// Define the API key and endpoint path
const apiKey = "sk-MNaq3TRCQmuFpKbNhSLfkIkikhN2qqjSLJo3pxOHsQwsZr3q"; // Replace with your actual API key
const path = "https://api.stability.ai/v2beta/stable-image/generate/core";

function App() {
  // State management for user input, generated image, loading status
  const [text, setText] = useState(""); // For the user's prompt input
  const [imageUrl, setImageUrl] = useState(""); // Stores the generated image URL
  const [loading, setLoading] = useState(false); // Loading state for the button

  // Function to fetch doodle image from API
  const fetchDoodle = async () => {
    if (text.trim()) { // Check if the user has entered text
      setLoading(true); // Set loading to true to disable button
      try {
        // Prepare the data to send in the API request
        const payload = {
          prompt: text, // Use the user-provided text
          output_format: "jpeg", // Specify output format
        };

        // Create a FormData object to send as request body
        const formData = new FormData();
        Object.keys(payload).forEach((key) => {
          formData.append(key, payload[key]);
        });

        // Send the POST request to Stability AI API with the user's text
        const response = await axios.post(path, formData, {
          validateStatus: undefined,
          responseType: "arraybuffer", // Expect the response to be an image in binary format
          headers: {
            Authorization: `Bearer ${apiKey}`, // Pass the API key in the Authorization header
            Accept: "image/*", // Expecting an image as the response
          },
        });

        // If the request is successful (status code 200)
        if (response.status === 200) {
          // Convert the response (binary image) to a blob
          const blob = new Blob([response.data], { type: "image/jpeg" });
          const url = URL.createObjectURL(blob); // Create a URL for the image blob
          setImageUrl(url); // Set the image URL for display
        } else {
          throw new Error(`${response.status}: ${response.data.toString()}`); // Handle errors
        }
      } catch (error) {
        // Log errors and show alert if the request fails
        console.error("Error fetching doodle:", error);
        alert("Failed to generate doodle. Please check the console for details.");
      }
      setLoading(false); // Set loading to false after the request is complete
    } else {
      alert("Please enter some text to generate a doodle."); // Prompt user if input is empty
    }
  };

  return (
    <div className="App">
      <h1>Text to Doodle Generator</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your doodle prompt here..."
        value={text}
        onChange={(e) => setText(e.target.value)} // Update text state as user types
      />
      <button onClick={fetchDoodle} disabled={loading}>
        {loading ? "Generating..." : "Generate Doodle"} {/* Button text changes based on loading state */}
      </button>
      {imageUrl && ( // Conditionally render the image if available
        <div className="image-container">
          <h2>Your Doodle:</h2>
          <img src={imageUrl} alt="Generated Doodle" className="doodle-image" />
        </div>
      )}
    </div>
  );
}

export default App;