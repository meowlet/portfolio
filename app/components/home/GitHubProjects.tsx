"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { GithubSearchResponse, getGithubRepos } from "@/app/utils/github";
import { StarIcon, ScaleIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

function ProjectSkeleton() {
  return (
    <div className="bg-tertiary/10 dark:bg-dark-tertiary/10 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-tertiary/20 dark:bg-dark-tertiary/20" />
      <div className="p-6">
        <div className="h-6 w-2/3 bg-tertiary/20 dark:bg-dark-tertiary/20 rounded mb-4" />
        <div className="h-4 bg-tertiary/20 dark:bg-dark-tertiary/20 rounded mb-4" />
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-16 bg-tertiary/20 dark:bg-dark-tertiary/20 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GitHubProjects() {
  const [repos, setRepos] = useState<GithubSearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("projects");

  useEffect(() => {
    async function fetchRepos() {
      try {
        const data = await getGithubRepos();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  function formatSize(size: number): string {
    if (size < 1024) return `${size}KB`;
    return `${(size / 1024).toFixed(1)}MB`;
  }

  return (
    <section
      id="projects"
      className="py-20 bg-tertiary/5 dark:bg-dark-tertiary/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4 font-mono text-xs sm:text-sm bg-tertiary-container/40 dark:bg-dark-tertiary-container/40 rounded-lg px-2 sm:px-4 py-2 max-w-full">
            <div className="flex flex-col gap-1 break-all sm:break-normal">
              <span className="text-on-tertiary-container/70 dark:text-dark-on-tertiary-container/70">
                {`$ curl -H "Authorization: Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN?.slice(
                  0,
                  4
                )}..." \\`}
              </span>
              <span className="text-on-tertiary-container/70 dark:text-dark-on-tertiary-container/70">
                {`  "https://api.github.com/search/repositories?q=user:${process.env.NEXT_PUBLIC_GITHUB_USERNAME}"`}
              </span>
              <span className="text-on-tertiary-container dark:text-dark-on-tertiary-container">
                {repos
                  ? `✓ fetched ${repos.items.length} repositories (${formatSize(
                      repos.total_size
                    )} total)`
                  : "fetching..."}
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4 text-tertiary dark:text-dark-tertiary">
            {t("github")}
          </h2>
          {repos && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm font-mono text-tertiary/70 dark:text-dark-tertiary/70">
              <span className="flex items-center gap-1">
                <StarIcon className="w-4 h-4" />
                {repos.total_stars} stars
              </span>
              <span className="flex items-center gap-1">
                <DocumentTextIcon className="w-4 h-4" />
                {repos.total_commits} commits
              </span>
              <span className="flex items-center gap-1">
                <ScaleIcon className="w-4 h-4" />
                {formatSize(repos.total_size)}
              </span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, index) => <ProjectSkeleton key={index} />)
            : repos?.items.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-surface dark:bg-dark-surface rounded-xl overflow-hidden border border-tertiary/10 dark:border-dark-tertiary/10 hover:border-tertiary dark:hover:border-dark-tertiary transition-all duration-300 hover:shadow-lg hover:shadow-tertiary/30 dark:hover:shadow-dark-tertiary/30 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-tertiary dark:group-hover:text-dark-tertiary transition-colors">
                      {repo.name}
                    </h3>
                    <p className="text-on-surface/70 dark:text-dark-on-surface/70 mb-4 line-clamp-2 min-h-[3rem]">
                      {repo.description || t("noGithubDescription")}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && (
                        <span className="px-3 py-1 text-sm bg-tertiary/10 dark:bg-dark-tertiary/10 rounded-full border border-tertiary/20 dark:border-dark-tertiary/20">
                          {repo.language}
                        </span>
                      )}
                      {repo.topics?.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 text-sm bg-tertiary/10 dark:bg-dark-tertiary/10 rounded-full border border-tertiary/20 dark:border-dark-tertiary/20"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tertiary dark:text-dark-tertiary hover:underline flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        {t("viewDetails")}{" "}
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                      <div className="flex items-center gap-4 text-tertiary/70 dark:text-dark-tertiary/70 text-sm">
                        <div className="flex items-center gap-1" title="Stars">
                          <StarIcon className="w-4 h-4" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div
                          className="flex items-center gap-1"
                          title="Commits"
                        >
                          <DocumentTextIcon className="w-4 h-4" />
                          <span>{repo.commit_count}</span>
                        </div>
                        <div className="flex items-center gap-1" title="Size">
                          <ScaleIcon className="w-4 h-4" />
                          <span>{formatSize(repo.size)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
