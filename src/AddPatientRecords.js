import React, { useState } from 'react';

const AddPatientRecords = ({ contract }) => {
    const [patientIDD, setPatientIDD] = useState("");
    const [patientName, setPatientName] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");

    const addRecord = async () => { 
        if (patientIDD && patientName && diagnosis && treatment) {
            try {
                const tx = await contract.addRecord(patientIDD, patientName, email, mobile ,diagnosis, treatment);
                await tx.wait();
                alert(`Patient Record added with ID: ${patientIDD}`);
            } catch (error) {
                console.error("Error adding patient record: ", error);
            }
        } else {
            alert("All fields are required!");
        }
    };

    return (
        <div className='rectangle-box'>
            <h3>Add Patient Records</h3>
            <input
                type='text'
                placeholder='Patient ID'
                value={patientIDD}
                onChange={(e) => setPatientIDD(e.target.value)}
            />
            <input
                type='text'
                placeholder='Patient Name'
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
            />
            <input
                type='text'
                placeholder='Diagnosis'
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
            />
            <input
                type='text'
                placeholder='Treatment'
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
            />
            <input
                type='text'
                placeholder='Phone no.'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={addRecord}>Add</button>
        </div>
    );
};

export default AddPatientRecords;
