import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import querystring from "qs";

// Hàm sắp xếp các tham số (tương tự như hàm đã dùng ở file create_payment_url)
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

export async function GET(req: NextRequest) {
  try {
    // Lấy query parameters từ URL
    const vnp_Params = Object.fromEntries(new URL(req.url).searchParams);
    const secureHash = vnp_Params["vnp_SecureHash"];

    // Loại bỏ các trường không cần thiết trước khi kiểm tra hash
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    // Sắp xếp các tham số
    const sortedParams = sortObject(vnp_Params);

    // Lấy secretKey từ biến môi trường
    const secretKey = process.env.VNP_HASH_SECRET as string;

    // Tạo chuỗi ký
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    // So sánh secureHash nhận được và secureHash đã ký
    if (secureHash === signed) {
      // Thanh toán hợp lệ, xử lý cập nhật trạng thái đơn hàng
      // const orderId = vnp_Params["vnp_TxnRef"];
      // const rspCode = vnp_Params["vnp_ResponseCode"];

      // TODO: Kiểm tra và cập nhật trạng thái đơn hàng dựa trên orderId và rspCode

      // Trả kết quả thành công cho VNPay
      return NextResponse.json({ RspCode: "00", Message: "Success" });
    } else {
      // Chữ ký không khớp, trả kết quả lỗi
      return NextResponse.json({ RspCode: "97", Message: "Fail checksum" });
    }
  } catch (error) {
    console.error("IPN error:", error);
    return NextResponse.json(
      { RspCode: "99", Message: "Unknown error" },
      { status: 500 },
    );
  }
}
