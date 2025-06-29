import { cn } from "@/lib/utils";

export default function RetroGrid({ className }: { className?: string }) {
  console.log("className", className);
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-full w-full overflow-hidden [perspective:200px] bg-white border-white"
      )}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(35deg)] opacity-50">
        <div
          className={cn(
            "animate-grid",

            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",

            // // Light Styles
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",

            // Dark styles
            // "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]"
          )}
        />
      </div>

      {/* Background Gradient */}
      <div />
    </div>
  );
}
