import { AdminModel } from "../models/admin.js";
import { DoctorModel } from "../models/doctor.js";
import { PatientModel } from "../models/patient.js";
import { generateToken } from "../utils/authentication/jwt.js";
import { verifyHash } from "../utils/authentication/password.js";

const Login = async (req, res) => {
  const body = req.body;
  let role = null;
  if (!body) {
    return res.json({ message: "No Form Data", token: null });
  }

  //   verifying presence of data in body
  const { email, password } = body;
  if (!(email && password)) {
    return res.json({ message: "please provide email and password", token: null });
  }

  //   we will find user in patient, docotr and admin

  try {
    let user = await AdminModel.findOne({ email: email });
    role = "admin";

    // check, wheather user has been found or not
    if (!user) {
      user = await DoctorModel.findOne({ email: email });
      role = "doctor";

      // again check, wheather user has been found or not
      if (!user) {
        user = await PatientModel.findOne({ email: email });
        role = "patient";
      }

      //   if no user found in all models, then return
      if (!user) {
        return res.json({ message: "no user found!", token: null });
      }
    }

    // verify password
    const passwordVerified = verifyHash(password, user.salt, user.hash);
    if (!passwordVerified) {
      return res.json({ message: "invalid password", token: null });
    }

    // creating token
    const payLoad = {
      id: user._id,
      role: role,
    };
    const token = generateToken(payLoad);

    return res.json({ message: "login success", token: token});
  } catch (err) {
    return res.json({ message: "error in getting user: " + err, token: null });
  }
};

export default Login;
