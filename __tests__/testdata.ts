export const getOrderRes = {
  success: 1,
  data: {
    order_id: 12345,
    pair: 'btc_jpy',
    side: 'buy',
    type: 'limit',
    start_amount: '0.00100000',
    remaining_amount: '0.00100000',
    executed_amount: '0.00000000',
    price: '500000.0000',
    average_price: '0.0000',
    ordered_at: 1517709357203,
    status: 'UNFILLED'
  }
};

export const sendOrderError = { success: 0, data: { code: 60001 } };

export const sendOrderRes = {
  success: 1,
  data: {
    order_id: 12345,
    pair: 'btc_jpy',
    side: 'buy',
    type: 'limit',
    start_amount: '0.00100000',
    remaining_amount: '0.00100000',
    executed_amount: '0.00000000',
    price: '500000.0000',
    average_price: '0.0000',
    ordered_at: 1517710987242,
    status: 'UNFILLED'
  }
};

export const cancelOrderRes = {
  success: 1,
  data: {
    order_id: 12345,
    pair: 'btc_jpy',
    side: 'buy',
    type: 'limit',
    start_amount: '0.00100000',
    remaining_amount: '0.00100000',
    executed_amount: '0.00000000',
    price: '500000.0000',
    average_price: '0.0000',
    ordered_at: 1517710987242,
    canceled_at: 1517711336374,
    status: 'CANCELED_UNFILLED'
  }
};

export const assetsRes = {
  success: 1,
  data: {
    assets: [
      {
        asset: 'jpy',
        amount_precision: 4,
        onhand_amount: '19140.1450',
        locked_amount: '0.0000',
        free_amount: '19140.1450',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: {
          threshold: '30000.0000',
          under: '540.0000',
          over: '756.0000'
        }
      },
      {
        asset: 'btc',
        amount_precision: 8,
        onhand_amount: '0.00000000',
        locked_amount: '0.00000000',
        free_amount: '0.00000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.00100000'
      },
      {
        asset: 'ltc',
        amount_precision: 8,
        onhand_amount: '0.00000000',
        locked_amount: '0.00000000',
        free_amount: '0.00000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.00100000'
      },
      {
        asset: 'xrp',
        amount_precision: 6,
        onhand_amount: '0.000000',
        locked_amount: '0.000000',
        free_amount: '0.000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.150000'
      },
      {
        asset: 'eth',
        amount_precision: 8,
        onhand_amount: '0.00000000',
        locked_amount: '0.00000000',
        free_amount: '0.00000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.00500000'
      },
      {
        asset: 'mona',
        amount_precision: 8,
        onhand_amount: '0.00000000',
        locked_amount: '0.00000000',
        free_amount: '0.00000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.00100000'
      },
      {
        asset: 'bcc',
        amount_precision: 8,
        onhand_amount: '0.00000000',
        locked_amount: '0.00000000',
        free_amount: '0.00000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.00100000'
      }
    ]
  }
};

export const depthRes = {
  success: 1,
  data: {
    asks: [
      ['942771', '0.0530'],
      ['943998', '0.1651'],
      ['943999', '0.0500']
    ],
    bids: [
      ['940687', '0.0003'],
      ['940643', '0.0180'],
      ['940642', '0.0150']
    ],
    timestamp: 1517741645173
  }
};

export const tickerRes = {
  "success": 1,
  "data": {
    "sell": "947696",
    "buy": "944953",
    "high": "1025699",
    "low": "922039",
    "last": "946005",
    "vol": "863.1516",
    "timestamp": 1517742351610
  }
}; 

export const transactionsRes = {
  "success": 1,
  "data": {
    "transactions": [
      {
        "transaction_id": 3296317,
        "side": "buy",
        "price": "946378",
        "amount": "0.0001",
        "executed_at": 1517742406923
      },
      {
        "transaction_id": 3296316,
        "side": "sell",
        "price": "945393",
        "amount": "0.0010",
        "executed_at": 1517742402964
      },
      {
        "transaction_id": 3296315,
        "side": "buy",
        "price": "947525",
        "amount": "0.0072",
        "executed_at": 1517742397925
      }
    ]
  }
}

export const candleRes = {
  "success": 1,
  "data": {
    "candlestick": [
      {
        "type": "1hour",
        "ohlcv": [
          [
            "1710289",
            "1710294",
            "1665961",
            "1673659",
            "9.4666",
            1514764800000
          ],
          [
            "1673659",
            "1677579",
            "1649888",
            "1650000",
            "9.6489",
            1514768400000
          ],
          [
            "1651109",
            "1658000",
            "1636542",
            "1650021",
            "5.0995",
            1514772000000
          ]
        ]
      }
    ],
    "timestamp": 1514851199932
  }
}