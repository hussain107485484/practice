// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

// Import the BlockRx contract
import "./BlockRx.sol";

contract project_hospital {
    // Declare a state variable of type BlockRx
    BlockRx public blockRxContract;
    address public owner;

    // Initialize the BlockRx contract address
    constructor(address _blockRxContractAddress) {
        blockRxContract = BlockRx(_blockRxContractAddress);
        owner = msg.sender;
    }

    struct hospital_record {
        address patient;
        string hospital;
        string doctor_name;
        uint256 time;
        string disease;
        string prescription;
    }
    mapping(address => bool) public ownerOnlyMapping;
    mapping(address => hospital_record[]) private patients;
    mapping(address => mapping(string => bool)) public managers;
    mapping(address => mapping(string => mapping(address => bool)))
        public docter_mapping; // 1 function bny ga jis sy docter apni assigning check kr skay
    mapping(address => mapping(address => bool)) public accessAllowed; // allow other to read

    function addToMapping(address _newAddress) public {
        require(msg.sender == owner, "Only owner can call this function");

        ownerOnlyMapping[_newAddress] = true;
    }

    // Function to retrieve the mapping, restricted to the owner
    function getOwnerOnlyMapping(address _address) public view returns (bool) {
        require(msg.sender == owner, "Only owner can call this function");

        return ownerOnlyMapping[_address];
    }

    function transferToOwner(string memory hospital_name) public {
        require(ownerOnlyMapping[msg.sender] = true, "Not eligible");
        // require(msg.value == 1 ether, "Incorrect amount sent");
        // payable(owner).transfer(msg.value);
        blockRxContract.transfer(owner, 5000);
        // when eth is sent then the msg.sender will be stored in array
        managers[msg.sender][hospital_name] = true; // true means eligible
    }

    function assign_docters(string memory hospital_name, address _docter)
        public
    {
        // hospital name maa woo hi name pass ho skay joo manager k hein
        // jsy CMH wala manager JAMIAT wly ka naa add kr dyy
        require(
            managers[msg.sender][hospital_name] == true,
            "You are not a manager"
        );

        docter_mapping[msg.sender][hospital_name][_docter] = true; //hospital name maa woo hi name enter hoo jis ka owner hy msg.sender
    }

    function Write_by_docter(
        address _manager,
        address _patient,
        string memory _hospital,
        string memory _name,
        string memory _disease,
        string memory _prescription
    ) public {
        require(
            docter_mapping[_manager][_hospital][msg.sender] == true,
            "Not a docter"
        );
        uint256 _time = block.timestamp;
        hospital_record memory record = hospital_record(
            _patient,
            _hospital,
            _name,
            _time,
            _disease,
            _prescription
        );
        patients[_patient].push(record);
    }

    function user2_accept(address _user2) public {
        accessAllowed[msg.sender][_user2] = true;
    }

    function user2_reject(address _user2) public {
        accessAllowed[msg.sender][_user2] = false;
    }

    function Read(address _patient)
        public
        view
        returns (hospital_record[] memory)
    {
        address patient;
        patient = patients[msg.sender][0].patient;
        address cal = msg.sender;
        require(
            patient == cal || accessAllowed[_patient][msg.sender] == true,
            "no"
        );
        return patients[msg.sender];
    }
}

// owner 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

// manager 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2

// docter 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db

// patient 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB

// patient access 0x617F2E2fD72FD9D5503197092aC168c91465E7f2

// manager address khud ko docter assign  nai kr skta

// manager blockRX token sy purchase kry

// incentive method

