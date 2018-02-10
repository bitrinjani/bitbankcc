import BitbankccBroker from '../lib/BrokerAdapterImpl';
import BitbankCcApi from '@bitr/bitbankcc-api';
import { nocksetup } from './nocksetup';
import * as nock from 'nock';
import { BrokerConfigType, CashMarginType, Broker, OrderSide, OrderType, TimeInForce } from '../lib/types';

function createOrder(
  broker: Broker,
  side: OrderSide,
  size: number,
  price: number,
  cashMarginType: CashMarginType,
  type: OrderType,
  leverageLevel: number
) {
  return {
    broker,
    side,
    size,
    price,
    cashMarginType,
    type,
    leverageLevel,
    symbol: 'BTC/JPY',
    timeInForce: TimeInForce.None
  };
}

const brokerConfig: BrokerConfigType = {
  broker: 'Bitbankcc',
  enabled: true,
  maxLongPosition: 0.1,
  maxShortPosition: 0.1,
  key: 'key',
  secret: 'secret',
  cashMarginType: CashMarginType.Cash
};

beforeAll(() => {
  nocksetup();
});

afterAll(() => {
  nock.restore();
});

test('fetchQuotes', async () => {
  const ba = new BitbankccBroker(brokerConfig);
  const quotes = await ba.fetchQuotes();
  expect(quotes).toEqual([
    { broker: 'Bitbankcc', price: 942771, side: 'Ask', volume: 0.053 },
    { broker: 'Bitbankcc', price: 943998, side: 'Ask', volume: 0.1651 },
    { broker: 'Bitbankcc', price: 943999, side: 'Ask', volume: 0.05 },
    { broker: 'Bitbankcc', price: 940687, side: 'Bid', volume: 0.0003 },
    { broker: 'Bitbankcc', price: 940643, side: 'Bid', volume: 0.018 },
    { broker: 'Bitbankcc', price: 940642, side: 'Bid', volume: 0.015 }
  ]);
});

test('send', async () => {
  const ba = new BitbankccBroker(brokerConfig);
  const order = createOrder('Bitbankcc', OrderSide.Buy, 0.001, 500000, CashMarginType.Cash, OrderType.Limit, undefined);
  await ba.send(order);
  expect(order.brokerOrderId).toBe('12345');
});
