import crypto from "crypto";
export async function generateTimeStamp(): Promise<string> {
  const currentTimeStamp = Date.now();
  return Math.floor(currentTimeStamp / 1000).toString();
}

export async function md5Encrypt(data: any) {
  return crypto.createHash("md5").update(data).digest("hex");
}

export async function hmacSHA256(key: any, data: string): Promise<string> {
  const hmacToken = crypto.createHmac('sha256', key).update(data).digest('hex');
  return hmacToken;
}

export async function CreateOrderCode(): Promise<string> {
  const generatePart = () => {
    return ("0000" + ((Math.random() * 0x10000) | 0).toString(16))
      .slice(-4)
      .toUpperCase();
  };
  const productCode = `${generatePart}-${generatePart}-${generatePart}-${generatePart}-${generateTimeStamp}`;
  return md5Encrypt(productCode);
}
