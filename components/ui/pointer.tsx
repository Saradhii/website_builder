"use client"

import { useEffect, useState } from "react"
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  useMotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

const POINTER_CLASS = "magicui-pointer-enabled"
const IFRAME_POINTER_MOVE_EVENT = "magicui:iframe-pointer-move"
const IFRAME_POINTER_LEAVE_EVENT = "magicui:iframe-pointer-leave"

/**
 * A custom pointer component that displays an animated cursor.
 * Mount once at app-level to enable a custom pointer for the full site.
 * You can pass custom children to render as the pointer.
 *
 * @component
 * @param {HTMLMotionProps<"div">} props - The component props
 */
export function Pointer({
  className,
  style,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches
    if (!supportsFinePointer) {
      return
    }

    const rootElement = document.documentElement
    rootElement.classList.add(POINTER_CLASS)

    const handlePointerMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setIsActive(true)
    }

    const handlePointerLeave = () => {
      setIsActive(false)
    }

    const handlePointerOut = (e: PointerEvent) => {
      // When relatedTarget is null, the pointer left the document (e.g. browser UI).
      if (!e.relatedTarget) {
        setIsActive(false)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      // Fallback for browsers that do not consistently emit pointerleave on window.
      if (!e.relatedTarget) {
        setIsActive(false)
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        setIsActive(false)
      }
    }

    const handleIframePointerMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") {
        return
      }

      const data = event.data as {
        type?: string
        x?: number
        y?: number
      }

      if (data.type === IFRAME_POINTER_LEAVE_EVENT) {
        setIsActive(false)
        return
      }

      if (data.type !== IFRAME_POINTER_MOVE_EVENT) {
        return
      }

      if (typeof data.x !== "number" || typeof data.y !== "number") {
        return
      }

      const iframeElement = Array.from(document.querySelectorAll("iframe")).find(
        (frame) => frame.contentWindow === event.source
      )

      if (!iframeElement) {
        return
      }

      const rect = iframeElement.getBoundingClientRect()
      x.set(rect.left + data.x)
      y.set(rect.top + data.y)
      setIsActive(true)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("pointerout", handlePointerOut)
    window.addEventListener("mouseout", handleMouseOut)
    window.addEventListener("blur", handlePointerLeave)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("message", handleIframePointerMessage)

    return () => {
      rootElement.classList.remove(POINTER_CLASS)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      window.removeEventListener("pointerout", handlePointerOut)
      window.removeEventListener("mouseout", handleMouseOut)
      window.removeEventListener("blur", handlePointerLeave)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("message", handleIframePointerMessage)
    }
  }, [x, y])

  return (
    <>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="pointer-events-none fixed z-[9999] transform-[translate(-50%,-50%)]"
            style={{
              top: y,
              left: x,
              ...style,
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            {...props}
          >
            {children || (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="1"
                viewBox="0 0 16 16"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "rotate-[-70deg] stroke-white text-black",
                  className
                )}
              >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
              </svg>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
