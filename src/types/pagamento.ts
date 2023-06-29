export interface Pagamento {
  payment_id: string;
  category: string;
  event_time: number;
  trip_id: string;
  cash_collected: number;
  amount: number;
  driver_id: string;
  breakdown: {
    other: number;
    toll: number;
    service_fee: number;
  };
  rider_fees: {
    split_fare: number;
  };
  partner_id: string;
  currency_code: string;
}
