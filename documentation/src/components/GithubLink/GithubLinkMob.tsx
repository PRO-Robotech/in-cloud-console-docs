import React, { FC, useEffect, useState } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { getLatestTag, getStarsAndForks, getGithubRepoConfig } from '@site/src/api/getRepoInfo'

export const GithubLinkMob: FC = () => {
  const { siteConfig } = useDocusaurusContext()
  const githubRepo = getGithubRepoConfig(siteConfig.customFields)
  const [tag, setTag] = useState<string | null>(githubRepo.tag)
  const [stars, setStars] = useState<number | null>(githubRepo.stars)
  const [forks, setForks] = useState<number | null>(githubRepo.forks)

  useEffect(() => {
    if (githubRepo.tag === null) {
      getLatestTag(githubRepo.apiUrlTag)
        .then(data => setTag(data))
        /* eslint-disable-next-line no-console */
        .catch(err => console.log(err))
    }

    if (githubRepo.stars === null || githubRepo.forks === null) {
      getStarsAndForks(githubRepo.apiUrlStar)
        .then(data => {
          if (!data) {
            return
          }

          setStars(data.stars)
          setForks(data.forks)
        })
        /* eslint-disable-next-line no-console */
        .catch(err => console.log(err))
    }
  }, [githubRepo.apiUrlStar, githubRepo.apiUrlTag, githubRepo.forks, githubRepo.stars, githubRepo.tag])

  return (
    <>
      <a
        className="menu__link header-github-link header-github-link-mob"
        href={githubRepo.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub repository"
      >
        {githubRepo.label}
      </a>
      <ul className="github-facts github-facts-mob">
        {tag && <li className="github-fact github-fact--version">{tag}</li>}
        {stars !== null && <li className="github-fact github-fact--stars">{stars}</li>}
        {forks !== null && <li className="github-fact github-fact--forks">{forks}</li>}
      </ul>
    </>
  )
}
