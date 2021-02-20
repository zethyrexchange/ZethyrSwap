export const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_addrGetBalance",
				"type": "address"
			}
		],
		"name": "getBEP20Balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addrGetBalance",
				"type": "address"
			}
		],
		"name": "getBNBBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];