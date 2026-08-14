export default function Loader({ inline = false }) {
  return (
    <div className={`flex items-center justify-center ${inline ? "py-20" : "w-full h-screen"}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-[3px] border-rose-light" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-rose-dark animate-spin" />
        </div>
        <span className="text-sm text-muted uppercase tracking-[0.2em]">Loading</span>
      </div>
    </div>
  );
}
