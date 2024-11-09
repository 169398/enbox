import React from "react";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  fromColor?: string;
  viaColor?: string;
  toColor?: string;
  children?: React.ReactNode;
}

export default function GlowingCard({
  fromColor = "#4158D0",
  viaColor = "#C850C0",
  toColor = "#FFCC70",
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className,
  ...props
}: GlowCardProps) {
  return (
    <div className="relative group" {...props}>
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`,
        }}
      />
      <div className="relative rounded-xl bg-card border shadow   ">
        {children}
      </div>
    </div>
  );
}
