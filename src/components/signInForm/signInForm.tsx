//React import
import { FunctionComponent } from "react";

//Component import
import ActionButton from "../actionButton/actionButton";

const SignInForm: FunctionComponent<{}> = () => {
  return (
    <div className=" w-[90%] md:w-[40rem] lg:h-[20rem] bg-bt-accent-bg rounded-lg p-2 flex items-center flex-col login-wrapper">
      <span className="font-bold text-[2rem] mb-8">Login</span>
      <input
        className=" w-[90%] md:w-[23rem] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-4"
        placeholder="Email"
        type="email"
      />
      <input
        className=" w-[90%]  md:w-[23rem] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-2"
        placeholder="Password"
        type="password"
      />
      <span className="mb-5 md:mb-8 md:self-end md:mr-[8rem] hover:cursor-pointer">
        Forgot Password?
      </span>

      <ActionButton text="Sign In" className="mb-2 md:mb-0" />

      {/* <span className="mt-auto select-none" onClick={() => setIsSignIn(false)}>
        {AuthLocalized.newUser?.[currentLanguage]}
        <span className="cursor-pointer underline">
          {AuthLocalized.createAnAccount?.[currentLanguage]}
        </span>
      </span> */}
    </div>
  );
};

export default SignInForm;
