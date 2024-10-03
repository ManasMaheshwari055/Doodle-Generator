import React, { useState } from 'react';

const ImageGenerator = () => {
    const [inputText, setInputText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const generateImage = async () => {
        try {
            const response = await fetch('https://api.stability.ai/v1/generate/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `sk-257hijOuzU9B1a8PVRSd3zZtEFeePgVFDJK4cl9KMesef5dv` // Replace with your API key
                },
                body: JSON.stringify({
                    prompt: inputText, // The user input to generate the image
                    width: 512, // Image width
                    height: 512, // Image height
                    style: 'realistic', // You can change the style based on API capabilities
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setImageUrl(data.imageUrl); // Assuming the API returns the image URL correctly
        } catch (error) {
            console.error('Error generating image:', error);
        }
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'doodle-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="image-generator">
            <textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter your message here..."
                rows="4"
            />
            <button onClick={generateImage}>Generate Image</button>
            {imageUrl && (
                <div className="image-container">
                    <img src={imageUrl} alt="Generated Doodle" />
                    <button onClick={downloadImage}>Download Image</button>
                </div>
            )}
        </div>
    );
};

export default ImageGenerator;
