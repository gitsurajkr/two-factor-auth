import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, Lock } from 'lucide-react'
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'

const TwoFactorAuth = () => {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();  
  const handle2FA = () => {
    setStep(1)
  }

  const emailHandler = (e) => { setEmail(e.target.value) }

  const otpHandler = (e) => { setOtp(e.target.value) }

  const handleSendOTP = async (e) => {

    e.preventDefault();
    setIsLoading(true)
    try{
        const response = await axios.post('http://localhost:3737/api/user/sendotp',{
            email
        })

        if (response.status === 200){
            setStep(2)
        }
    } catch (error) {
        console.error("Error Sending OTP:", error)
    } finally {
        setIsLoading(false)
    }

  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    
    try{
        const response = await axios.post('http://localhost:3737/api/user/verifyotp',{
            email,
            otp
        })

        if (response.status === 200){
          const {token} = response.data;
          Cookies.set("token", token, {expires: 7});
          toast.success("You have successfully signed up");
          navigate('/signin')
        }
    } catch (error) {
        console.error ("Error in Verifying OTP:", error)
    } finally {
        setIsLoading(false)
    }

  }

  return (
    <div className="bg-black  min-h-screen flex  justify-center items-center ">
    <Card className="bg-black max-w-3xl flex flex-col ">
      <CardHeader>
        <CardTitle className="text-slate-300 text-3xl">Two-Factor Authentication</CardTitle>
        <CardDescription>Secure your account with 2FA</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 0 && (
          <Button className="w-full text-xl font-bold bg-slate-700 hover:bg-slate-800 cursor-pointer" onClick={handle2FA}>
            Setup 2FA
            <FaArrowRightLong className="ml-2 h-4 w-7" />
          </Button>
        )}
        {step >= 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className='text-slate-300 text-lg' >Email</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="johndoe@example.com"
                  type="email"
                  className="pl-8 text-lg"
                  value={email}
                  onChange={emailHandler}
                  disabled={step === 2}
                />
              </div>
            </div>
            {step === 1 && (
              <Button className="w-full text-xl font-bold bg-slate-700 hover:bg-slate-800 cursor-pointer" onClick={handleSendOTP} disabled={!email || isLoading}>
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            )}
            {step === 2 && (
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-slate-300 text-lg">OTP</Label>
                <div className="relative">
                  <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="otp"
                    placeholder="Enter OTP"
                    type="text"
                    className="pl-8 text-lg"
                    value={otp}
                    onChange={otpHandler}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      {step === 2 && (
        <CardFooter>
          <Button className="w-full text-xl font-bold bg-slate-700 hover:bg-slate-800 cursor-pointer"  onClick={handleLogin} disabled={!otp || isLoading}>
            {isLoading ? 'Verifying...' : 'Login'}
          </Button>
        </CardFooter>
      )}
    </Card>
    </div>
  )
}

export default TwoFactorAuth