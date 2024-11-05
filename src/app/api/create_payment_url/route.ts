import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import querystring from "qs";
import { format } from "date-fns";

function sortObject(obj: {
  [key: string]: number | string | boolean | undefined;
}) {
  const sorted: { [key: string]: string } = {};
  const str = Object.keys(obj).sort();

  str.forEach((key) => {
    sorted[key] = encodeURIComponent(String(obj[key])).replace(/%20/g, "+");
  });

  return sorted;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ipAddr = req.headers.get("x-forwarded-for") || "::1";

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    const vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;

    const now = new Date();
    const createDate = format(now, "yyyyMMddHHmmss");
    const orderId = format(now, "HHmmss");
    const amount = body.amount * 100;
    const bankCode = body.bankCode;
    const orderInfo = body.orderDescription;
    const orderType = body.orderType;
    const locale = body.language || "vn";
    const currCode = "VND";

    // Các tham số cần truyền vào URL
    let vnp_Params: { [key: string]: number | string | boolean | undefined } = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    if (bankCode) {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    // Sắp xếp các tham số
    vnp_Params = sortObject(vnp_Params);

    // Tạo chuỗi ký
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey as string);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;

    // Tạo URL thanh toán
    const paymentUrl = `${vnpUrl}?${querystring.stringify(vnp_Params, { encode: false })}`;

    // Trả về URL thanh toán để frontend xử lý redirect
    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
