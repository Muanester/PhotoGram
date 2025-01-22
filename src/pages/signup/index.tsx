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
import { UserSignIn } from "@/types";
import { Link } from "react-router-dom";

const initialValue: UserSignIn = {
  email: "",
  password: "",
  confirmPassword: "",
};

interface ISignupProps {}

const Signup: React.FunctionComponent<ISignupProps> = () => {
  const [userInfo, setUserInfo] = React.useState<UserSignIn>(initialValue);
  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("The user info: ", userInfo);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("The user info: ", userInfo);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="max-w-sm rounded-xl border bg-card text-card-foregroung">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">
                PhotoGram - Create an account
              </CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline">
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                  Github
                </Button>
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
              <div className="grid gap-2">
                <Label htmlFor="confirmpassword">Confirm Password</Label>
                <Input
                  id="confirmpassword"
                  type="password"
                  value={userInfo.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserInfo({
                      ...userInfo,
                      confirmPassword: e.target.value,
                    });
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Create account
              </Button>
              <p className="mt-3 text-sm text-center">
                Already have an account? <Link to={"/login"}>Login</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
