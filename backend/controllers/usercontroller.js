import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    //check if  user already exists

    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists!" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password Should be At Least 8 Characters!",
      });
    }
    if (password !== confirmpassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords Doesn't Match!" });
    }

    //bcrypt the password
    const hashpassword = await bcrypt.hash(password, 10);
    //create user
    const newuser = new UserModel({ name, email, password: hashpassword });
    await newuser.save();
    return res
      .status(200)
      .json({ success: true, message: "Registered Successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Error in Registering" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //find user first
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Doesn't Exists!" });
    }

    const passwordsMatch = bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password Isn't Correct!" });
    }

    //create Tokens
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_REFRESH,
      {
        expiresIn: "7d",
      },
    );

    //set tokens in cookies
    res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 60 * 24 });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    //return user
    const userData = user.toObject();
    delete userData.password;
    return res.status(200).json({
      success: true,
      message: "Login Successfully!",
      user: userData,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in Loggin In!" });
  }
};

export const Logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .status(200)
    .json("User has been logged out.");
};

export const GetMe = async (req, res) => {
  const userId = req.user.userId;
  console.log("userId", userId);
  try {
    const user = await UserModel.findById({ _id: userId }).select("-password");
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in Getting My Info" });
  }
};

export const refreshToken = (req, res) => {
  console.log("Refreshss");
  const refreshToken = req.cookies?.refreshToken;
  console.log("REfersh token si ", refreshToken);
  // console.log("req.cookies", req.cookies);

  if (!refreshToken) return res.json({ valid: false, message: "No Token" });

  jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
    if (err) return res.json({ valid: false, message: "INVALID" });
    delete decoded.iat;
    delete decoded.exp;
    const newAccessToken = jwt.sign(decoded, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(decoded, process.env.JWT_SECRET_REFRESH, {
      expiresIn: "7d",
    });
    res.cookie("accessToken", newAccessToken, { maxAge: 1000 * 60 * 60 * 24 });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json({ valid: true });
  });
};

export const UpdateName = async (req, res) => {
  const userid = req.user.userId;
  const { name } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(
      userid,
      { name },
      { new: true },
    );
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User Updated Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in Updating Name" });
  }
};

export const AddImage = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { data } = req.body;
    const user = await UserModel.findById(userId);
    const ImageData = user.ImageHistory || [];
    const check = ImageData.includes(data);
    if (!check) {
      ImageData.push(data);
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Image Added to History!" });
    }
    return res.status(200).json({
      success: false,
      message: "Image already exists",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in adding image" });
  }
};
