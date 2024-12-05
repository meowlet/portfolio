export interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string;
  commit_count: number;
}

export interface GithubSearchResponse {
  items: GithubRepo[];
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

      return { ...repo, commit_count };
    })
  );

  return { items: reposWithCommitCount };
}
