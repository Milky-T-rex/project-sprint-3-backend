import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import tokenModel from "../models/tokenModel.js";

// ฟังก์ชันสร้าง Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};

// Route สำหรับการเข้าสู่ระบบ
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "กรุณาตรวจสอบ Email" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  try {
    const userInfo = await userModel.findOne({ email });
    if (!userInfo) {
      return res.status(400).json({ error: true, message: "ไม่พบผู้ใช้" });
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: true, message: "รหัสผ่านไม่ถูกต้อง" });
    }

    const accessToken = createToken(userInfo._id);

    // เก็บ Token ลงในฐานข้อมูล
    const tokenExpiryDate = new Date();
    tokenExpiryDate.setHours(tokenExpiryDate.getHours() + 1); // กำหนดอายุ Token เป็น 1 ชั่วโมง

    const newToken = new tokenModel({
      userId: userInfo._id,
      token: accessToken,
      expiresAt: tokenExpiryDate,
    });

    await newToken.save(); // บันทึก Token ลงDB

    console.log(`Token for user ${userInfo._id} saved successfully at ${new Date().toLocaleString()}`);

    return res.json({
      error: false,
      message: "Login สำเร็จ!",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "เกิดข้อผิดพลาด !" });
  }
};

// Route สำหรับการสมัครสมาชิก
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  try {
    const isUser = await userModel.findOne({ email });
    if (isUser) {
      return res
        .status(400)
        .json({ error: true, message: "มีผู้ใช้งานนี้แล้ว" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      error: false,
      message: "Registration Successful",
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "เกิดข้อผิดพลาด" });
  }
};

// Route สำหรับlogin admin
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };

//   app.get("/get-user", authenticateToken, async (req, res) => {
//     const { user } = req.user;
//     const isUser = await User.findOne({ _id: user._id });

//     if (!isUser) {
//       return res.status(401);
//     }

//     return res.json({
//       user: {
//         fullName: isUser.fullName,
//         email: isUser.email,
//         _id: isUser._id,
//         createOn: isUser.createOn,
//       },
//       message: "",
//     });
//   });
