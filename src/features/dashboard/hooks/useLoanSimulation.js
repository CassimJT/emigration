import { PGARRY } from "@/utils/constants"
import React from "react"

export function useLoanSimulation() {
    const [progress, setProgress] = React.useState(0)
    const [mainStage, setMainStage] = React.useState(0)
    const pgarry = React.useMemo(() => PGARRY, [])

    React.useEffect(() => {
        const interval = setInterval(() => {
        setProgress((prev) => {
            const next = prev < 100 ? prev + 20 : 100
            if (next % 20 === 0 && next > prev) {
            setMainStage((s) => s + 1)
            }
            return next
        })
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return { progress, mainStage, pgarry }
    }