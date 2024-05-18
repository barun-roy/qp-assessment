import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (error) {
    console.log("password hashing error...............", error);
    throw error;
  }
};

const passwordCheck = async (inputPassword:string, userPassword:string) => {
    try {
      const passwordCheck = await bcrypt.compare(inputPassword, userPassword);
      return passwordCheck;
    } catch (error) {
      console.log("password check error..........", error);
      throw error;
    }
  };

const commonService = {
  hashPassword,
  passwordCheck
};

export default commonService;
