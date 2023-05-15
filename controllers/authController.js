const jwt = require("jsonwebtoken");
const User = require("../models/user");
const filterObj = require("../utils/filterObj");
const { promisify } = require("util");
const otpGenerator = require("otp-generator");

// function to return jwt token
const signToken = (userId) => jwt.sign({ userId }, process.env.SECRET_KEY);


const authController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Both are required",
        });
      }

      const userDoc = await User.findOne({ email: email }).select("+password");

      if (
        !userDoc ||
        !(await userDoc.correctPassword(password, userDoc.password))
      ) {
        return res.status(400).json({
          status: "error",
          message: "Email or Password is Incorect",
        });
      }

      if (!userDoc.verified) {
        return res.status(400).json({
          status: "error",
          message: "User not verified. We have sent you a mail to verify.",
        });
      }

      const token = signToken(userDoc._id);
      return res.status(200).json({
        status: "Success",
        message: "Logged In.",
        token,
        user_id: userDoc._id,
        user: userDoc

      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  register: async (req, res, next) => {
    try {
      const { email } = req.body;

      const filterBody = filterObj(
        req.body,
        "firstName",
        "lastName",
        "password",
        "email"
      );

      const existing_user = await User.findOne({ email: email });

      if (existing_user && existing_user.verified) {
        return res.status(400).json({
          status: "error",
          message: "User already registered. Please Login.",
        });
      } else if (existing_user) {
        await User.findOneAndUpdate({ email: email }, filterBody, {
          new: true,
          validateModifyOnly: true,
        });

        req.userId = existing_user._id;
        next();
      } else {
        const new_user = await User.create(filterBody);

        req.userId = new_user._id;
        next();
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  sendOtp: async (req, res, next) => {
    try {
      const { userId } = req;

      const new_otp = otpGenerator.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const otp_expiry_time = Date.now() + 10 * 60 * 1000;

      const user = await User.findByIdAndUpdate(userId, {
        otp: new_otp.toString(),
        otp_expiry_time,
      });

      user.otp = new_otp.toString();
      await user.save({ new: true, validateModifiedOnly: true });


      res.status(200).json({
        status: "Success",
        new_otp: new_otp,
        message: "OTP sent successfully",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  verifyOtp: async (req, res, next) => {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({
        email,
        otp_expiry_time: { $gt: Date.now() },
      });

      if (!user) {
        res.status(400).json({
          staus: "error",
          message: "email is invalid or OTP expired",
        });

        return;
      }

      if (user.verified) {
        return res.status(400).json({
          status: "error",
          message: "Email is already verified",
        });
      }

      if (!(await user.correctOTP(otp, user.otp))) {
        res.status(400).json({
          status: "error",
          message: "OTP is incorrect",
        });

        return;
      }

      user.verified = true;
      user.otp = undefined;

      await user.save({ new: true, validateModifyOnly: true });

      const token = signToken(user._id);

      res.status(200).json({
        status: "Success",
        message: "Logged In.",
        token,
        user_id: user._id,
        user: user
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  protect: async (req, res, next) => {
    try {
      // 1)  getting token (jwt) and check if it's available

      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      if (!token) {
        return res.status(401).json({
          message: "You are not logged in! Please log in to get access."
        });
      }

      // 2) verification of token

      const decoded = await promisify(jwt.verify)(
        token,
        process.env.SECRET_KEY
      );
      // 3) check if user still exist

      const this_user = await User.findById(decoded.userId);

      if (!this_user) {
        res.status(400).json({
          status: "error",
          message: "The user belonging to this token does not exist.",
        });
      }

      req.user = this_user;
      next();
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
}

module.exports = authController;