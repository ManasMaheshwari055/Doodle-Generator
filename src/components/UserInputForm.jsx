import React, { useState } from "react";

const UserInputForm = ({ setCustomText, setOccasion }) => {
    const [textInput, setTextInput] = useState("");
    const [selectedOccasion, setSelectedOccasion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setCustomText(textInput);
        setOccasion(selectedOccasion);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your custom message"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    required
                />
                <select
                    value={selectedOccasion}
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                    required
                >
                    <option value="">Select Occasion</option>
                    <option value="birthday">Birthday</option>
                    <option value="congratulations">Congratulations</option>
                    <option value="anniversary">Anniversary</option>
                </select>
                <button type="submit">Generate Doodle</button>
            </form>
        </>
    );
};

export default UserInputForm;
