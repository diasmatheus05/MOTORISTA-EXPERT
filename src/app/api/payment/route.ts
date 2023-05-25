import axios from "axios";
import { NextResponse } from "next/server";

interface PaymentResponse {
  count: number;
  limit: number;
  payments: Array<{
    payment_id: string;
    category:
      | "fare"
      | "device_payment"
      | "vehicle_payment"
      | "promotion"
      | "other";
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
    currency_code: "USD";
  }>;
  offset: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  try {
    const { data } = await axios.get<PaymentResponse>(
      "https://api.uber.com/v1/partners/payments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
