//NextJS import
import { useRouter } from "next/router";

//React import
import { FunctionComponent, useState } from "react";

//Component import
import ActionButton from "../actionButton/actionButton";

//Form import
import { useForm } from "react-hook-form";

//supabase import
import supabase from "../../utils/supabase";

const SignInForm: FunctionComponent<{}> = () => {
  //UseState

  const [isLoading, setIsLoading] = useState(false);

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  //Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = async (data: FormValues) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      });
      if (res.error) {
        setIsLoading(false);
        console.log(res.error);
        return;
      }
      router.replace("/dashboard");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  type FormValues = {
    email: string;
    password: string;
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <input
          className=" w-[90%] md:w-[23rem] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-4"
          placeholder="name.surname@bau.edu.tr"
          {...register("email", { required: true })}
          type="email"
        />
        {errors.email && <span className="text-red-600">This field is required</span>}
        <input
          className=" w-[90%]  md:w-[23rem] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-2"
          placeholder="Password"
          type="password"
          {...register("password", {
            required: { value: true, message: "This field is required" },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <span className="text-red-600">{errors.password.message}</span>}
        <span className="mb-5 md:mb-8 md:self-end md:mr-[8rem] hover:cursor-pointer">
          Forgot Password?
        </span>

        <button className="bg-bt-form-bg w-fit p-2 rounded-lg h-[2rem] flex items-center justify-center">{isLoading ? "Loading..." : "Login"}</button>
      </form>

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
