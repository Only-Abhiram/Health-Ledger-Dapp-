import React, { useState } from 'react';
import ab from './ab.jpg'
import Chatbot from './chatbot/chatbot';
const FetchPatientRecords = ({ contract }) => {
    const [patientID, setPatientID] = useState("");
    const [patientRecords, setPatientRecords] = useState([]);
    const [diagnosis, setDiagnosis] = useState(""); // State for chatbot input
    const [chatResponse, setChatResponse] = useState(""); // State for chatbot response
    const [loading, setLoading] = useState(false); // Loading state

    const fetchPatientRecords = async () => {
        if (patientID !== "") {
            try {
                const records = await contract.getPatientRecords(patientID);
                setPatientRecords(records);
            } catch (error) {
                console.error("Error fetching patient records: ", error);
                alert("You are not authorized or entered an invalid patient ID!");
            }
        } else {
            alert("Patient ID is required");
        }
    };

    const handleChat = () => {
        if (!diagnosis) {
            alert("Please enter a diagnosis to get tips.");
            return;
        }
    
        const tips = {
            "fever": "Stay hydrated, rest well, and take fever-reducing medication like paracetamol as needed.",
            "diabetes": "Monitor your blood sugar regularly, maintain a balanced diet, and exercise daily.",
            "cold": "Drink warm fluids, rest, and consider using a saline nasal spray to ease congestion.",
            "headache": "Ensure you're well-hydrated, avoid bright lights, and take over-the-counter pain relief if necessary.",
            "high blood pressure": "Reduce sodium intake, manage stress, and incorporate regular exercise into your routine.",
            "Sore Throat": "Gargle with warm salt water and use throat lozenges",
            "Diarrhea": "Drink oral rehydration solution (ORS) and avoid spicy foods.",
	        "Constipation": "Increase fiber intake and drink plenty of water",
            "Minor Cuts": "Clean the wound, apply antiseptic, and use a bandage.",
            "Toothache":" Rinse with warm salt water and use pain relievers until treated.",
            "Sprain":" Rest, apply ice, and elevate the affected area.",
	        "Skin Rash": "Use soothing creams and avoid irritants.",
            "cough":"Drink warm water, and use cough syrup.",
        };
    
        setLoading(true); 
        setTimeout(() => {
            const response = tips[diagnosis.toLowerCase()] || 
                "No specific tips are available for the entered diagnosis. Please consult a healthcare professional.";
            setChatResponse(response);
            setLoading(false);
        }, 5000);
    };
    

    return (
        <div className='rectangle-box'>
            <h3>Fetch Patient Records</h3>
            <input
                type='text'
                placeholder='Enter Patient ID'
                value={patientID}
                onChange={(e) => setPatientID(e.target.value)}
            />
            <button onClick={fetchPatientRecords}>Fetch</button>
            <div className='patientrecords'>
                {patientRecords.map((record, index) => (
                    <table key={index}>
                        <tr><td>Record ID </td><td>:  {patientID}</td></tr>
                        <tr><td>Patient Name </td><td>:  {record.patientName}</td></tr>
                        <tr><td>Diagnosis</td><td>:  {record.diagnosis}</td></tr>
                        <tr><td>Treatment</td><td>:  {record.treatment}</td></tr>
                        <tr><td>Phone no.</td><td>:  {record.mobile}</td></tr>
                        <tr><td>email</td><td>:  {record.email}</td></tr>
                        <tr><td>Date</td><td>:  {new Date(record.timestamp.toNumber() * 1000).toLocaleDateString()}</td></tr>
                    </table>
                ))}
            </div>

            <div className='chatbot-secton'>
                <Chatbot/>
            </div>
            
        </div>
    );
};

export default FetchPatientRecords;
