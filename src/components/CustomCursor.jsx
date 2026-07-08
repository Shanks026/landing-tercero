import { useEffect, useRef, useState } from "react";

// A dot that tracks the pointer exactly + a ring that follows with spring lag.
// Monochrome via mix-blend-difference so it stays visible on light and dark
// sections alike. Desktop / fine-pointer only, and disabled for reduced motion.
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor="target"]';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: target.x, y: target.y };
    let hovering = false;
    let pressed = false;
    let visible = false;
    let raf = 0;

    const show = () => {
      if (visible) return;
      visible = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };
    const hide = () => {
      visible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      hovering = !!e.target?.closest?.(INTERACTIVE);
      show();
    };
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);

    const loop = () => {
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%) scale(${pressed ? 0.7 : 1})`;
      }
      if (ring) {
        const scale = (hovering ? 1.9 : 1) * (pressed ? 0.85 : 1);
        ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ring.style.backgroundColor = hovering
          ? "rgba(255,255,255,0.35)"
          : "transparent";
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "difference" }}
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="fixed left-0 top-0 w-8 h-8 rounded-full border border-white opacity-0"
        style={{ willChange: "transform", transition: "background-color 200ms ease" }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 w-[6px] h-[6px] rounded-full bg-white opacity-0"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
