// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthcareRecords {
    address owner;

    struct Record {
        uint256 recordID;
        string patientName;
        string email; // Added email
        string mobile; // Added mobile number
        string diagnosis;
        string treatment;
        uint256 timestamp;
    }

    mapping(uint256 => Record[]) private patientRecords; // Mapping from patient ID to their records
    mapping(address => bool) private authorizedProviders; // Mapping for authorized providers

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyAuthorizedProvider() {
        require(authorizedProviders[msg.sender], "Not an authorized patient/doctor");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function authorizedProvider(address provider) public onlyOwner {
        authorizedProviders[provider] = true;
    }

    function addRecord(
        uint256 patientID,
        string memory patientName,
        string memory email,
        string memory mobile,
        string memory diagnosis,
        string memory treatment
    ) public onlyAuthorizedProvider {
        uint256 recordID = patientRecords[patientID].length + 1;
        patientRecords[patientID].push(
            Record(recordID, patientName, email, mobile, diagnosis, treatment, block.timestamp)
        );
    }

    function getPatientRecords(uint256 patientID)
        public
        view
        onlyAuthorizedProvider
        returns (Record[] memory)
    {
        return patientRecords[patientID];
    }
}
