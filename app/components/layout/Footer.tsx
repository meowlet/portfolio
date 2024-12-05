export default function Footer() {
  return (
    <footer className="py-8 border-t border-secondary/20 dark:border-dark-secondary/20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-on-surface/70 dark:text-dark-on-surface/70">
          © {new Date().getFullYear()} Portfolio. Made with ❤️
        </p>
        <a
          href="https://github.com/meowlet/portfolio"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Source Code
        </a>
      </div>
    </footer>
  );
}
