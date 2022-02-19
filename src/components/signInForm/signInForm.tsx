//NextJS import
import { useRouter } from "next/router";

//React import
import { FunctionComponent, useState } from "react";

//Component import
import ActionButton from "../actionButton/actionButton";

const SignInForm: FunctionComponent<{}> = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  //Login handler
  const handleLogin = (): void => {
    if (password === "" || userName === "")
      return alert("Please fill in all fields");
    //Forward user to dashboard page
    router.push("/dashboard");
  };

  return (
    <div
      className=" w-[90%] md:w-[40rem] lg:h-[20rem] bg-bt-accent-bg rounded-lg p-2 flex items-center flex-col login-wrapper"
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        handleLogin();
      }}
    >
      <span className="font-bold text-[2rem] mb-8">Login</span>
      <input
        className=" w-[90%] md:w-[23rem] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-4"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className=" w-[90%]  md:w-[23rem] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <span className="mb-5 md:mb-8 md:self-end md:mr-[8rem] hover:cursor-pointer">
        Forgot Password?
      </span>

      <ActionButton
        text="Sign In"
        className="mb-2 md:mb-0"
        onClick={handleLogin}
      />

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
