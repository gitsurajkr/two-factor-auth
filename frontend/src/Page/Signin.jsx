import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signin = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post("http://localhost:3737/api/user/signin", {
                username,
                password
            })

            const { token } = response.data;
            Cookies.set("token", token, { expires: 7 });
            // window.alert("You have successfully signed in")
            toast.success("You have successfully signed in");
            navigate("/signup")

        } catch (error) {
            window.alert("Invalid username or password")
            console.log(error.response)
        }
    }

    return (
        <div className="bg-black  min-h-screen flex justify-center items-center ">
            <Card className="bg-black  max-w-xl">
                <CardHeader >
                    <CardTitle>
                        <h2 className="text-slate-400 text-4xl font-extrabold">Sign In</h2>
                    </CardTitle>
                    <CardDescription>
                        <p className="text-lg">Sign in to your account</p>
                    </CardDescription>
                </CardHeader>
                <form onSubmit={onSubmitHandler}>
                    <CardContent className="space-y-2">

                        <div>
                            <Label htmlFor="username" className="font-sm text-md text-white">Username</Label>
                            <Input onChange={usernameHandler} type="username" placeholder="johndoe" id="username" name="username" required className=" h-10 text-lg font-md bg-zinc-400" />
                        </div>

                        <div className="relative">
                            <Label htmlFor="password" className="font-sm text-md text-white">Password</Label>
                            <Input onChange={passwordHandler} type={showPassword ? "text" : "password"} id="password" placeholder="password" name="password" required className="h-10 text-lg font-md bg-zinc-400" />
                            <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0 flex items-center pr-4 pt-7">

                                {showPassword ? (
                                    <IoEyeOff className="text-black text-lg" />
                                ) : (
                                    <IoEye className="text-black text-lg" />
                                )}

                            </button>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-3 ">
                        <Button type="submit" className="bg-slate-700 text-white font-md h-10 w-full">Sign in</Button>

                        <a href="/signup" className="text-slate-400 cursor-pointer hover:text-blue-400" >Register to a new account? Signup</a>

                    </CardFooter>

                </form>
            </Card>
        </div>
    )
}

export default Signin