import "../styles/globals.css";
import type { AppProps } from "next/app";

//NextJS import
import { useRouter } from "next/router";

//React import
import { useState, useLayoutEffect } from "react";

//Recoil import
import { RecoilRoot, useRecoilState } from "recoil";
import { employeesState, unitsState, userState } from "../recoil/state";

//Supabase import
import supabase, { listenToData, fetchInitialData } from "../utils/supabase";

//Loader import
import { ClipLoader } from "react-spinners";

function MyApp({ Component, pageProps }: AppProps) {
  //UseState
  const [isLoading, setIsLoading] = useState(true);

  //Recoil State
  const [_employees, setEmployees] = useRecoilState(employeesState);
  const [_units, setUnits] = useRecoilState(unitsState);
  const [_user, setUser] = useRecoilState(userState);

  //Router
  const router = useRouter();

  useLayoutEffect(() => {
    const user = supabase.auth.user();
    if (!user) {
      setIsLoading(false);
      router.replace("/");
    }

    (async () => {
      const { data, error } = await supabase
        .from("workers")
        .select()
        .match({ id: user?.id });

      if (error) {
        console.log(error);
      }
      if (data) setUser(data[0]);
    })();

    fetchInitialData({ setEmployees, setUnits });
    listenToData({ setEmployees, setUnits });

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
