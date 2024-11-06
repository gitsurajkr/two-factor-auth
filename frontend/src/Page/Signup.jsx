import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import axios from "axios";
// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const firstNameHandler = (e) => {
        setFirstname(e.target.value)
    }
    const lastNameHandler = (e) => {
        setLastname(e.target.value)
    }
    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
     
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3737/api/user/signup", {
                firstname,
                lastname,
                username,
                password,
                email
            })

            // const {token} = response.data;
            navigate("/two-factor-auth")
            // Cookies.set("token", token, {expires: 7});
            // window.alert("You have successfully signed up")
            // navigate("/signin")
        } catch (error) {
            console.log(error.response)
        }


    }

    return (
        <div className="bg-black min-h-screen flex justify-center items-center">
            <Card className="bg-black max-w-2xl ">
                <CardHeader>
                    <CardTitle>
                        <h2 className="text-slate-400 text-4xl font-extrabold">Sign Up</h2>
                    </CardTitle>
                    <CardDescription>
                        <p className="text-lg">Sign up to create an account</p>
                    </CardDescription>
                </CardHeader>
                <form onSubmit={submitHandler}>
                <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstname" className="font-sm text-md text-white">First Name</Label>
                                <Input onChange={firstNameHandler} type="text" placeholder="john" id="firstname" name="firstname" required className="h-10 text-lg font-md bg-zinc-400" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastname" className="font-sm text-md text-white">Last Name</Label>
                                <Input onChange={lastNameHandler} className="text-lg h-10 font-md bg-zinc-400" placeholder="doe" type="text" id="lastname" name="lastname" required />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="username" className="font-sm text-md text-white">Username</Label>
                            <Input onChange={usernameHandler} type="username" placeholder="johndoe" id="username" name="username" required className="h-10 text-lg font-md bg-zinc-400" />
                        </div>
                       
                        <div className="relative">
                            <Label htmlFor="password" className="font-sm text-md text-white">Password</Label>
                            <Input onChange={passwordHandler} type={showPassword ? "text" : "password"} id="password" placeholder="password" name="password" required className="h-10 text-lg font-md bg-zinc-400"  />
                            <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0 flex items-center pr-4 pt-7">

                                {showPassword ? (
                                    <IoEyeOff className="text-black text-lg" />
                                ) : (
                                    <IoEye className="text-black text-lg" />
                                )}

                            </button>
                        </div>
                        <div>
                            <Label htmlFor="email" className="font-sm text-md text-white">Email</Label>
                            <Input onChange={emailHandler} type="email" placeholder="johndoe@example.com" id="email" name="email" required className="h-10 text-lg font-md bg-zinc-400" />
                        </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-3 ">
                    <Button type="submit" className="bg-slate-700 text-white font-md h-10 w-full">Sign Up</Button>
                    
                        <a href="/signin" className="text-slate-400 cursor-pointer hover:text-blue-400" >Already have an account? Login</a>
                    
                </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default Signup