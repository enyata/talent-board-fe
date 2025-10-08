import { useState } from "react"

export const useTruncateText = (text: string, limit: number = 100) => {
    const [expanded, setExpanded] = useState(false)

    const isTruncated = text.length > limit
    const displayText = expanded || !isTruncated ? text : text.slice(0, limit) + "..."

    const toggle = () => setExpanded((prev) => !prev)

    return {
        displayText,
        expanded,
        toggle,
        isTruncated,
    }
}
