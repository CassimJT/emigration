// components/StatusFilter.tsx  (or wherever you keep shared components)
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    } from "@/components/ui/select"
    import { Filter } from "lucide-react"

   
    export function StatusFilter({
    value,
    onChange,
    statusOptions,
    }) {
    const currentLabel =
        statusOptions.find((opt) => opt.value === value)?.label || "SUBMITTED"

    return (
        <Select value={value} onValueChange={onChange} className="bg-white">
        <SelectTrigger className="w-[180px] h-9 text-sm">
            <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <SelectValue>{currentLabel}</SelectValue>
            </div>
        </SelectTrigger>

        <SelectContent >
            {statusOptions.map((option) => (
            <SelectItem
                key={option.value}
                value={option.value || "SUBMITTED"}
                className="cursor-pointer py-2 bg-white"
            >
                {option.label}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    )
}