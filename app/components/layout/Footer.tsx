import { Link } from "../../../i18n/routing";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-secondary/20 dark:border-dark-secondary/20">
      <div className="container mx-auto px-4 text-center space-y-2">
        <p className="text-on-surface/70 dark:text-dark-on-surface/70">
          © {new Date().getFullYear()} Portfolio. Made with ❤️
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/meowlet/portfolio"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source Code
          </a>
          <Link
            href="/this-page-does-not-exist"
            className="text-tertiary dark:text-dark-tertiary hover:underline font-mono"
          >
            404_test.sh
          </Link>
        </div>
      </div>
    </footer>
  );
}
