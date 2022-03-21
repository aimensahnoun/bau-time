import "../styles/globals.css";
import type { AppProps } from "next/app";

//NextJS import
import { useRouter } from "next/router";

//React import
import { useState, useLayoutEffect } from "react";

//Recoil import
import { RecoilRoot, useRecoilState } from "recoil";
import {employeesState} from "../recoil/state";

//Supabase import
import supabase, { listenToData } from "../utils/supabase";

//Loader import
import { ClipLoader } from "react-spinners";

function MyApp({ Component, pageProps }: AppProps) {

  //UseState
  const [isLoading, setIsLoading] = useState(true);

  //Recoil State
  const [_employees, setEmployees] = useRecoilState(employeesState);

  //Router
  const router = useRouter();

  useLayoutEffect(() => {
    const user = supabase.auth.user();
    if (!user) {
      setIsLoading(false);
      router.replace("/");
    }

    console.log("Running the first time");

    listenToData({ setEmployees });
    console.log("Finished with data");
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <ClipLoader color={"#fff"} loading={true} size={50} />
    </div>
  ) : (
    <Component {...pageProps} />
  );
}

function MyAppWrapper({ Component, pageProps, router }: AppProps) {
  return (
    <RecoilRoot>
      <MyApp pageProps={pageProps} Component={Component} router={router} />
    </RecoilRoot>
  );
}

export default MyAppWrapper;
