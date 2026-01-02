import React from "react"
import Logo from "@/assets/Logo.svg"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
//import { LoginForm }  from '@/components/login-form'
import { LoginForm as ShadcnLoginForm } from '@/components/login-form'


export default function LoginForm({ phoneNumber, onChange, onSubmit, loading }) {
  return (
    <ShadcnLoginForm />
    // <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
    //     {/* leftside of the page---Login Page */}
    //     <div className="flex items-center justify-center">
    //               <Card className=" overflow-hidden p-0 mx-auto max-w-2xl w-full bg-gray-300 h-auto">
    //                     <img
    //                      src={Logo}
    //                      alt="coart of arm logo"
    //                      className="opacity-50 w-32 h-40 mx-auto"
    //                     />
    //                   <h2 className="mb-10 text-center text-lg font-semibold">
    //                     Log In
    //                   </h2>
            
    //                   {/* OTP */}
    //                   {/* spacing card elements */}
                      
    //         <div className="mt-20"></div> 
    //                   <div className="flex justify-center mb-12 flex-col items-center gap-4" >
    //                     <div className="space-y-2">
    //                          <label htmlFor="Username" className="block-text-left">Username</label>
    //                          <div className="mt-20 gap-2"></div> 
    //                         <input 
    //                             type="text" id="Username" 
    //                             className="border border-gray-800 rounded-full px-4 py-2 w-96 h-16"  
    //                             placeholder="Enter username"
    //                         />
    //                     </div>
    //                      {/* Button */}
                         
    //                         <label htmlFor="password" className="font-bold">Password</label>
    //                         <div className="mt-10"></div> 
    //                         <input type="password" id="password" 
    //                             className=" rounded-full h-16 w-96 px-4 py-2 border border-gray-800" 
    //                             placeholder="Enter password"
    //                         />
                         
                        
                       
                       

    //                   <div className="mt-10"></div>
    //                   <div className="space-y-10 mt-20 ">
    //                     <Button className="h-16 min-w-80 rounded-full bg-orange-400 text-black hover:bg-orange-500 text-lg font-bold">
    //                         Verify Code
    //                      </Button>
    //                    </div>
    //                   <div className="mt-32"></div>
            
    //                   </div>
            
                     
    //                 </Card>
    //     </div>
    // </div>
 )
}       