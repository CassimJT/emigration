import React from "react"
import home from "@/assets/home/home.png";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Malawi from "@/assets/Malawi.svg"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Logo from "@/assets/Logo.svg"    

export default function NationalIdForm({ nationalId, onChange, onSubmit, loading }) {
  return (
  /// <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen ">
    <div className="flex flex-col gap-12" > 
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-4 text-center">
                <img
                  src={Logo}
                  alt="coart of arm logo"
                  className="opacity-50 w-32 h-32 mx-auto"
                />
                <p className="text-muted-foreground text-balance font-bold">
                  Lets Verify who you are
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="nationalid " className="font-bold text-2xl">National ID</FieldLabel>
                <Input
                  className="w-20 h-16 rounded-t-none border-2 border-black"
                  id="nationalid"
                  type="text"
                  placeholder="Enter National ID number"
                  required
                />
              </Field>
             </FieldGroup>
              <Field>
                <Button type="submit" className="flex bottom-4 rounded-full w-12 h-16 mt-28 bg-orange-400 hover:bg-orange-500 text-black font-bold text-lg">Verify</Button>
              </Field>
            
          </form>
         
          <div className="bg-blue-200 flex items-center justify-center p-6 md:p-10">
            <img
              src={home}
              alt="passport image"
              className=" h-auto w-auto mx-auto  items-center justify-center"
            />
          </div>
         
        </CardContent>
      </Card>
   
    </div>
  )
}
