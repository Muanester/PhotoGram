import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { UserLogIn } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "@/components/ui/icons";
import { useUserAuth } from "@/context/UserAuthContext";

import Image1 from "@/assets/images/image1.jpg";
import Image2 from "@/assets/images/image2.jpg";
import Image3 from "@/assets/images/image3.jpg";
import Image4 from "@/assets/images/image4.jpg";

const initialValue: UserLogIn = {
  email: "",
  password: "",
};

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const { googleSignIn, logIn } = useUserAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState<UserLogIn>(initialValue);
  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log("Login Error: ", error);
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("The user info: ", userInfo);
      logIn(userInfo.email, userInfo.password);
      navigate("/");
    } catch (error) {
      console.log("Submit Error: ", error);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-800">
      <div className="container flex mx-auto p-6 h-full">
        <div className="flex justify-center items-center w-full">
          <div className="p-6 w-2/3 hidden lg:block">
            <div className="grid grid-cols-2 gap-2">
              <img
                className="w-2/3 h-auto aspect-video rounded-3xl place-self-end"
                src={Image2}
                alt=""
              />
              <img
                className="w-2/4 h-auto aspect-auto rounded-3xl "
                src={Image1}
                alt=""
              />
              <img
                className="w-2/4 h-auto aspect-auto rounded-3xl place-self-end"
                src={Image4}
                alt=""
              />
              <img
                className="w-2/3 h-auto aspect-video rounded-3xl "
                src={Image3}
                alt=""
              />
            </div>
          </div>
          <div className="max-w-sm rounded-xl border bg-card text-card-foreground">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">
                    PhotoGram
                  </CardTitle>
                  <CardDescription>
                    Enter your email below to login into your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-1 gap-6">
                    <Button variant="outline" onClick={handleGoogleSignIn}>
                      <Icons.google className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={userInfo.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserInfo({ ...userInfo, email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={userInfo.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserInfo({ ...userInfo, password: e.target.value });
                      }}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full" type="submit">
                    Login
                  </Button>
                  <p className="mt-3 text-sm text-center">
                    Don't have an account? <Link to={"/signup"}>Sign up</Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
