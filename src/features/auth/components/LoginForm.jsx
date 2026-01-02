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

 )
}       