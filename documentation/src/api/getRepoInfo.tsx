import axios from 'axios'

export const DEFAULT_GITHUB_REPO = 'PRO-Robotech/openapi-ui'
export const DEFAULT_GITHUB_REPO_URL = `https://github.com/${DEFAULT_GITHUB_REPO}`
export const DEFAULT_GITHUB_API_URL = `https://api.github.com/repos/${DEFAULT_GITHUB_REPO}`
export const DEFAULT_GITHUB_API_URL_TAG = `${DEFAULT_GITHUB_API_URL}/tags?per_page=1`
export const DEFAULT_GITHUB_API_URL_STAR = DEFAULT_GITHUB_API_URL
export const DEFAULT_GITHUB_REPO_LABEL = 'openapi-ui'

const parseUnknownNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && value !== '') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

export interface GithubRepoConfig {
  apiUrlStar: string
  apiUrlTag: string
  forks: number | null
  label: string
  stars: number | null
  tag: string | null
  url: string
}

export const getGithubRepoConfig = (customFields?: Record<string, unknown>): GithubRepoConfig => {
  const githubRepo = customFields?.githubRepo as Record<string, unknown> | undefined

  return {
    apiUrlStar:
      typeof githubRepo?.apiUrlStar === 'string' ? githubRepo.apiUrlStar : DEFAULT_GITHUB_API_URL_STAR,
    apiUrlTag:
      typeof githubRepo?.apiUrlTag === 'string' ? githubRepo.apiUrlTag : DEFAULT_GITHUB_API_URL_TAG,
    forks: parseUnknownNumber(githubRepo?.forks),
    label: typeof githubRepo?.label === 'string' ? githubRepo.label : DEFAULT_GITHUB_REPO_LABEL,
    stars: parseUnknownNumber(githubRepo?.stars),
    tag: typeof githubRepo?.tag === 'string' && githubRepo.tag !== '' ? githubRepo.tag : null,
    url: typeof githubRepo?.url === 'string' ? githubRepo.url : DEFAULT_GITHUB_REPO_URL,
  }
}


export const getLatestTag = async (url = DEFAULT_GITHUB_API_URL_TAG): Promise<string | null> => {
  try {
    const { data } = await axios.get<{ name: string }[]>(url)
    return data[0]?.name || null
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log(error)
    return null
  }
}

export const getStarsAndForks = async (url = DEFAULT_GITHUB_API_URL_STAR): Promise<{ stars: number; forks: number } | null> => {
  try {
    const { data } = await axios.get<{ stargazers_count: number; forks: number }>(url)
    return {
      stars: data.stargazers_count,
      forks: data.forks,
    }
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log(error)
    return null
  }
}
