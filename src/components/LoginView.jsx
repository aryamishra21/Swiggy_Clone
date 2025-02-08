import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import WarningIcon from "@mui/icons-material/Warning";
import { closeLogin, login, signUp } from "../utils/store/UserSlice";
import store from "../utils/store/store";
import { RxCross1 } from "react-icons/rx";

const LoginView = ({ setShowLogin }) => {
  const userStates = useSelector((store) => store.user);
  const [loginView, SetLoginView] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  if (userStates.logState) return;
  return (
    <div className="border-2 fixed top-0 right-0 sm:w-[60dvw] lg:w-[35dvw] w-[100dvw] bg-white p-4 h-[100dvh]">
      <RxCross1
        className="cursor-pointer my-2"
        onClick={() => setShowLogin(false)}
      />
      {loginView ? (
        <div className="w-[80%] mr-auto p-2">
          <div className="flex mt-10 justify-between items-center">
            <div>
              <p className="text-3xl font-semibold text-gray-800">Login</p>
              <p className="text-xs my-3">
                or{" "}
                <span
                  className="text-[#FF5200] font-semibold cursor-pointer"
                  onClick={() => SetLoginView(false)}
                >
                  create an account
                </span>
              </p>
              <hr className="border border-black my-2 w-[2rem]" />
            </div>
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
              alt=""
              className="w-[7rem] h=[7rem]"
            />
          </div>
          <form
            action=""
            className="mt-8"
            onSubmit={handleSubmit((data) => {
            userStates.userCred.length>0?
              userStates.userCred.map((cred) => {
                if (
                  cred.email == data.email &&
                  cred.password == data.password
                ) {
                    console.log('1')
                  dispatch(login(cred.email));
                  reset();
                  setUserNotFound("");
                } else if (
                  cred.email == data.email &&
                  cred.password != data.password
                ) {
                    console.log('2')
                  setUserNotFound("Incorrect Password");
                } else {
                    console.log('3')
                  setUserNotFound("User Not Found");
                }
              })
              : setUserNotFound("User Not Found")
              reset()
              setTimeout(()=>setUserNotFound(''),2000);
            })}
          >
            <div className=" flex flex-col p-2 gap-5">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: 0,
                      borderColor: "grey", // Default border color
                      color: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "gray", // Border color when focused
                      border: "1px solid gray",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className="text-red-700 flex gap-1 items-center mt-1">
                {errors.email?.message && <WarningIcon className="!size-4" />}
                <span className="text-xs font-bold">
                  {errors.email?.message}
                </span>
              </p>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: 0,
                      borderColor: "grey", // Default border color
                      color: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "gray", // Border color when focused
                      border: "1px solid gray",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <p className="text-red-700 flex gap-1 items-center mt-1">
                {errors.password?.message && (
                  <WarningIcon className="!size-4" />
                )}
                <span className="text-xs font-bold">
                  {errors.password?.message}
                </span>
              </p>
              <Button
                sx={{
                  backgroundColor: "#FF5200",
                  color: "white",
                  fontWeight: "bold",
                  padding: "0.5rem",
                  borderRadius: 0,
                }}
                type="submit"
              >
                LOGIN
              </Button>
            </div>
          </form>
          {userNotFound !== "" && (
        <p className="text-red-700 flex gap-1 items-center ">
          {userNotFound && <WarningIcon className="!size-4" />}
          <span className="text-xs font-bold">{userNotFound}</span>
        </p>
      )}
        </div>
      ) : (
        <div className=" w-[80%] mr-auto p-2">
          <div className="flex mt-10 justify-between items-center">
            <div>
              <p className="text-3xl font-semibold text-gray-800">Sign Up</p>
              <p className="text-xs my-3">
                or{" "}
                <span
                  className="text-[#FF5200] font-semibold cursor-pointer"
                  onClick={() => SetLoginView(true)}
                >
                  login to your account
                </span>
              </p>
              <hr className="border border-black my-2 w-[2rem]" />
            </div>
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
              alt=""
              className="w-[7rem] h=[7rem]"
            />
          </div>
          <form
            action=""
            className="mt-8"
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(
                signUp({
                  name: data.name,
                  email: data.emailSign,
                  password: data.passwordSign,
                })
              );
              reset();
              SetLoginView(true);
            })}
          >
            <div className="flex flex-col p-2 gap-5">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: 0,
                      borderColor: "grey", // Default border color
                      color: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "gray", // Border color when focused
                      border: "1px solid gray",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <p className="text-red-700 flex gap-1 items-center ">
                {errors.name?.message && <WarningIcon className="!size-4" />}
                <span className="text-xs font-bold">
                  {errors.name?.message}
                </span>
              </p>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: 0,
                      borderColor: "grey", // Default border color
                      color: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "gray", // Border color when focused
                      border: "1px solid gray",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
                {...register("emailSign", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className="text-red-700 flex gap-1 items-center ">
                {errors.emailSign?.message && (
                  <WarningIcon className="!size-4" />
                )}
                <span className="text-xs font-bold">
                  {errors.emailSign?.message}
                </span>
              </p>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: 0,
                      borderColor: "grey", // Default border color
                      color: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "gray", // Border color when focused
                      border: "1px solid gray",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
                {...register("passwordSign", {
                  required: "Password is required",
                })}
              />
              <p className="text-red-700 flex gap-1 items-center">
                {errors.passwordSign?.message && (
                  <WarningIcon className="!size-4" />
                )}
                <span className="text-xs font-bold">
                  {errors.passwordSign?.message}
                </span>
              </p>
              <Button
                sx={{
                  backgroundColor: "#FF5200",
                  color: "white",
                  fontWeight: "bold",
                  padding: "0.5rem",
                  borderRadius: 0,
                }}
                type="submit"
              >
                CONTINUE
              </Button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default LoginView;
