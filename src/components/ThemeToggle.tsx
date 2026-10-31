"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  /** Renders a full-width row with a label (used inside the mobile menu). */
  variant?: "icon" | "row";
  className?: string;
}

/**
 * Two-state light/dark toggle wired to useTheme.
 *
 * The button paints its own background and border from the theme tokens, so it
 * stays legible in dark mode even while surrounding areas are still hard-coded
 * white (migration in progress).
 */
const ThemeToggle = ({ variant = "icon", className = "" }: ThemeToggleProps) => {
  const { isDark, toggle } = useTheme();
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  const Icon = isDark ? Sun : Moon;

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-pressed={isDark}
        data-testid="theme-toggle"
        className={`w-full flex items-center justify-between gap-[1.2rem] py-[1rem] px-[1.6rem] rounded-[0.6rem] border border-border bg-surface text-heading text-[1.6rem] font-medium transition-colors duration-300 hover:border-primary ${className}`}
      >
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
        <Icon size={20} className="text-primary shrink-0" aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      data-testid="theme-toggle"
      className={`inline-flex items-center justify-center w-[4.4rem] h-[4.4rem] rounded-[0.6rem] border-2 border-border bg-surface text-heading transition-colors duration-300 hover:border-primary hover:text-primary ${className}`}
    >
      <Icon size={20} aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
