
export default function HeroReveal({
  children,
  className = "",
  delay = 0,
  duration = 1200,
  type = "fade-up", // "fade-up" | "zoom"
}) {
  return (
    <div
      className={`hero-reveal hero-reveal--${type} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
