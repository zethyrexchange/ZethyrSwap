const TOKEN_BEP20_WBNB = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';
const TOKEN_BEP20_USDT = '0x55d398326f99059ff775485246999027b3197955';
const TOKEN_BEP20_CAKE = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82';
const TOKEN_BEP20_BUSDT = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
const TOKEN_BEP20_ETH = '0x2170ed0880ac9a755fd29b2688956bd959f933f8';
const TOKEN_BEP20_BETH = '0x250632378e573c6be1ac2f97fcdf00515d0aa91b';

const ZETHYR_PANCAKE_SWAP = '0x02585818d8f02b4C7bA0228F977d42cd89849176';
const ZETHYR_BAKERY_SWAP = '0x5D6e9a147dC1057B20aD3c66101A89eDF743A6F1';

const swapConfig = {
    tokenList : {
        0: 'BNB',
        1: 'USDT',
        2: 'CAKE',
        3: 'BUSDT',
        4: 'ETH',
        5: 'BETH',
        6: 'WBNB',
    },
    typeOfSwap: {
        '12': 1, // BNB to Token BEP20
        '21': 2, // Token BEP20 to BNB
        '22': 3, // Token BEP20 to Token BEP20
    },
    swapData : [ 
        {
            tokenName: 'BNB',
            tokenBEP20: TOKEN_BEP20_WBNB,
            type: 1, // 1: BNB, 2: BEP20
            to: [1, 2, 3, 4, 5],
            tokenDecimals : 18,
            quantityDecimals: 1
        },
        {
            tokenName: 'USDT',
            tokenBEP20: TOKEN_BEP20_USDT,
            type: 2, // 1: BNB, 2: BEP20
            to: [0, 3, 4, 5, 6],
            tokenDecimals : 18,
            quantityDecimals: 1
        },
        {
            tokenName: 'CAKE',
            tokenBEP20: TOKEN_BEP20_CAKE,
            type: 2, // 1: BNB, 2: BEP20
            to: [0, 6],
            tokenDecimals : 18,
            quantityDecimals: 1
        },
        {
            tokenName: 'BUSDT',
            tokenBEP20: TOKEN_BEP20_BUSDT,
            type: 2, // 1: BNB, 2: BEP20
            to: [0, 1, 4, 5, 6],
            tokenDecimals : 18,
            quantityDecimals: 1
        },
        {
            tokenName: 'ETH',
            tokenBEP20: TOKEN_BEP20_ETH,
            type: 2, // 1: BNB, 2: BEP20
            to: [0, 1, 3, 5, 6],
            tokenDecimals : 18,
            quantityDecimals: 1
        },
        {
            tokenName: 'BETH',
            tokenBEP20: TOKEN_BEP20_BETH,
            type: 2, // 1: BNB, 2: BEP20
            to: [0, 1, 3, 4, 6],
            tokenDecimals : 18,
            quantityDecimals: 1
        },
         {
            tokenName: 'WBNB',
            tokenBEP20: TOKEN_BEP20_WBNB,
            type: 2, // 1: BNB, 2: BEP20
            to: [1, 2, 3, 4, 5],
            tokenDecimals : 18,
            quantityDecimals: 1
        },
    ],
    dexListConfig  : [
        {
            dexName      : 'Pancake',
            dexLogo      : '',
            cZSwapAddr   : ZETHYR_PANCAKE_SWAP, 
            priceByPair : 0,
            diff        : '',
            typeOfDex   : 0,
        },
        {
            dexName      : 'Bakery',
            dexLogo      : '',
            cZSwapAddr   : ZETHYR_BAKERY_SWAP,
            priceByPair : 0,
            diff        : '',
            typeOfDex   : 1,
        }
    ],

}
export default swapConfig;