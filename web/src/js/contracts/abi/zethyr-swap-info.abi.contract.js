export const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_cPancakeSwapRouterAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_cBakerySwapRouterAddr",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "cBSwapRouter",
		"outputs": [
			{
				"internalType": "contract IBakerySwapRouter",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "cPSwapRouter",
		"outputs": [
			{
				"internalType": "contract IPancakeSwapRouter",
				"name": "",
				"type": "address"
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
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			}
		],
		"name": "getAmountsIn",
		"outputs": [
			{
				"internalType": "uint256[4]",
				"name": "_data",
				"type": "uint256[4]"
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
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			}
		],
		"name": "getAmountsOut",
		"outputs": [
			{
				"internalType": "uint256[4]",
				"name": "_data",
				"type": "uint256[4]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];