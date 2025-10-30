import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-6 border-t border-border bg-secondary">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Github className="w-5 h-5" />
          <span className="text-sm">GitHub</span>
        </a>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Powered by</span>
          <span className="font-semibold text-primary">Rootstock</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
