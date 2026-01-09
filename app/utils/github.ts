export interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string;
  commit_count: number;
  created_at: string;
  updated_at: string;
  size: number;
}

export interface GithubSearchResponse {
  items: GithubRepo[];
  total_commits: number;
  total_stars: number;
  total_size: number;
}

export async function getGithubRepos(): Promise<GithubSearchResponse> {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=user:${process.env.NEXT_PUBLIC_GITHUB_USERNAME}&sort=stars&order=desc&per_page=6`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repos");
  }

  const repos = await response.json();

  // Fetch commit count for each repo using the Link header method
  const reposWithCommitCount = await Promise.all(
    repos.items.map(async (repo: GithubRepo) => {
      const commitResponse = await fetch(
        `https://api.github.com/repos/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/${repo.name}/commits?per_page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );

      if (!commitResponse.ok) {
        throw new Error(`Failed to fetch commits for ${repo.name}`);
      }

      const linkHeader = commitResponse.headers.get("Link");
      let commit_count = 0;

      if (linkHeader) {
        const matches = linkHeader.match(/page=(\d+)>; rel="last"/);
        if (matches) {
          commit_count = parseInt(matches[1]);
        }
      } else {
        commit_count = 1;
      }

      return {
        ...repo,
        commit_count,
        created_at: new Date(repo.created_at).toISOString(),
        updated_at: new Date(repo.updated_at).toISOString(),
        size: repo.size,
      };
    })
  );

  // Tính toán các metrics tổng hợp
  const totalMetrics = reposWithCommitCount.reduce(
    (acc, repo) => ({
      total_commits: acc.total_commits + repo.commit_count,
      total_stars: acc.total_stars + repo.stargazers_count,
      total_size: acc.total_size + repo.size,
    }),
    {
      total_commits: 0,
      total_stars: 0,
      total_size: 0,
    }
  );

  return {
    items: reposWithCommitCount,
    ...totalMetrics,
  };
}
