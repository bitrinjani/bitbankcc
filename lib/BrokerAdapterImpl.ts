import {
  BrokerAdapter,
  OrderStatus,
  OrderType,
  OrderSide,
  CashMarginType,
  QuoteSide,
  Order,
  Quote,
  BrokerConfigType
} from './types';
import * as _ from 'lodash';
import BrokerApi from '@bitr/bitbankcc-api';
import { getLogger } from '@bitr/logger';
import { eRound } from './util';
import { SendOrderRequest, DepthResponse } from '@bitr/bitbankcc-api/dist/apiTypes';

export default class BrokerAdapterImpl implements BrokerAdapter {
  private readonly log = getLogger('Bitbankcc.BrokerAdapter');
  private readonly brokerApi: BrokerApi;
  readonly broker = 'Bitbankcc';

  constructor(private readonly config: BrokerConfigType) {
    this.brokerApi = new BrokerApi(this.config.key, this.config.secret);
    this.brokerApi.on('private_request', req =>
      this.log.debug(`Sending HTTP request... URL: ${req.url} Request: ${JSON.stringify(req)}`)
    );
    this.brokerApi.on('private_response', (response, request) =>
      this.log.debug(`Response from ${request.url}. Content: ${JSON.stringify(response)}`)
    );
  }

  async send(order: Order): Promise<void> {
    if (order.broker !== this.broker) {
      throw new Error();
    }

    const request = this.mapOrderToSendOrderRequest(order);
    const reply = await this.brokerApi.sendOrder(request);
    order.brokerOrderId = String(reply.order_id);
    order.status = OrderStatus.New;
    order.sentTime = new Date();
    order.lastUpdated = new Date();
  }

  async refresh(order: Order): Promise<void> {
    const orderId = order.brokerOrderId;
    const request = { pair: this.mapSymbolToPair(order.symbol), order_id: Number(orderId) };
    const response = await this.brokerApi.getOrder(request);
    order.filledSize = eRound(response.executed_amount);
    switch (response.status) {
      case 'CANCELED_UNFILLED':
        order.status = OrderStatus.Canceled;
        break;
      case 'CANCELED_PARTIALLY_FILLED':
        order.status = OrderStatus.Canceled;
        break;
      case 'FULLY_FILLED':
        order.status = OrderStatus.Filled;
        break;
      case 'PARTIALLY_FILLED':
        order.status = OrderStatus.PartiallyFilled;
        break;
    }
    order.lastUpdated = new Date();
    order.executions = [
      {
        broker: order.broker,
        brokerOrderId: order.brokerOrderId,
        cashMarginType: order.cashMarginType,
        side: order.side,
        symbol: order.symbol,
        size: order.filledSize,
        price: _.round(response.average_price),
        execTime: new Date(0)
      }
    ];
  }

  async cancel(order: Order): Promise<void> {
    const pair = this.mapSymbolToPair(order.symbol);
    this.brokerApi.cancelOrder({ pair, order_id: Number(order.brokerOrderId) });
    order.lastUpdated = new Date();
    order.status = OrderStatus.Canceled;
  }

  async getBtcPosition(): Promise<number> {
    const btc = (await this.getPositions()).get('btc');
    if (btc === undefined) {
      throw new Error('Unable to find btc position.');
    }
    return btc;
  }

  async getPositions(): Promise<Map<string, number>> {
    const response = await this.brokerApi.getAssets();
    return new Map<string, number>(response.assets.map(x => [x.asset.toUpperCase(), x.onhand_amount] as [string, number]));
  }

  async fetchQuotes(): Promise<Quote[]> {
    const response = await this.brokerApi.getDepth({ pair: 'btc_jpy' });
    return this.mapToQuote(response);
  }

  private mapSymbolToPair(symbol: string): string {
    let pair = '';
    switch (symbol) {
      case 'BTC/JPY':
        pair = 'btc_jpy';
        break;
      default:
        throw new Error('Not implemented.');
    }
    return pair;
  }

  private mapOrderToSendOrderRequest(order: Order): SendOrderRequest {
    if (order.cashMarginType !== CashMarginType.Cash) {
      throw new Error('Not implemented.');
    }

    let pair = this.mapSymbolToPair(order.symbol);
    let price = 0;
    let type = '';
    switch (order.type) {
      case OrderType.Limit:
        type = 'limit';
        price = order.price;
        break;
      case OrderType.Market:
        type = 'market';
        price = 0;
        break;
      default:
        throw new Error('Not implemented.');
    }

    return {
      price,
      pair,
      type,
      side: OrderSide[order.side].toLowerCase(),
      amount: order.size
    };
  }

  private mapToQuote(depth: DepthResponse): Quote[] {
    const asks = _(depth.asks)
      .take(100)
      .map(q => {
        return { broker: this.broker, side: QuoteSide.Ask, price: Number(q[0]), volume: Number(q[1]) };
      })
      .value();
    const bids = _(depth.bids)
      .take(100)
      .map(q => {
        return { broker: this.broker, side: QuoteSide.Bid, price: Number(q[0]), volume: Number(q[1]) };
      })
      .value();
    return _.concat(asks, bids);
  }
} /* istanbul ignore next */
