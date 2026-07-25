export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-zinc-500">
  <p>© {new Date().getFullYear()} PagePulse</p>

  <p className="mt-2">
    Built for{" "}
    <a
      href="https://digitalheroesco.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-400 hover:underline"
    >
      Digital Heroes Training Task
    </a>
  </p>
</footer>
  );
}