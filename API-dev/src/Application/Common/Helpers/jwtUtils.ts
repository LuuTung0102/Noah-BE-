import moment from "moment";

const jwt = require("jsonwebtoken");
require("dotenv").config();

export async function encodejwt(user: any) {
  const token: string = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      roleId: user.role_id,
      isAdmin: user.isAdmin,
      schoolId: user.schoolId,
    },
    process.env.REACT_APP_JWT_SECRET,
    { expiresIn: process.env.REACT_APP_EXPIRE_TOKEN }
  );

  const refreshToken: string = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      roleId: user.role_id,
      isAdmin: user.isAdmin,
      schoolId: user.schoolId,
    },
    process.env.REACT_APP_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REACT_APP_EXPIRE_REFRESH_TOKEN }
  );

  console.log("Access Token:", token);
  console.log("Refresh Token:", refreshToken);

  return {
    token,
    refreshToken,
    expiresIn: process.env.REACT_APP_EXPIRE_TOKEN,
  };
}

export function addDuration(duration: string) {
  console.log(duration);
  const unit = duration.slice(-1); // Lấy đơn vị thời gian (giờ 'h', ngày 'd', v.v.)
  const amount = parseInt(duration.slice(0, -1)); // Lấy số lượng thời gian từ chuỗi

  // Kiểm tra và xử lý các đơn vị thời gian phổ biến
  let momentUnit;
  switch (unit) {
    case "h":
      momentUnit = "hours";
      break;
    case "d":
      momentUnit = "days";
      break;
    // Thêm các trường hợp cho các đơn vị thời gian khác nếu cần
    default:
      throw new Error("Đơn vị thời gian không được hỗ trợ.");
  }

  // Tạo ngày giờ mới sau khi cộng thêm khoảng thời gian
  const newDateTime = moment().add(amount as any, momentUnit);

  // Định dạng và trả về ngày giờ mới dưới dạng chuỗi
  return newDateTime.format("YYYY-MM-DD HH:mm:ss");
}
