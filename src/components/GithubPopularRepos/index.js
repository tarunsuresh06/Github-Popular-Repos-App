import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repoList: [],
    languageFilter: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepoDetails()
  }

  getRepoDetails = async () => {
    const {languageFilter} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${languageFilter}`

    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const formattedRepoData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        issuesCount: eachRepo.issues_count,
        starsCount: eachRepo.stars_count,
        forksCount: eachRepo.forks_count,
        imgUrl: eachRepo.avatar_url,
      }))

      this.setState({
        repoList: formattedRepoData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleLanguagetype = id => {
    this.setState({languageFilter: id}, this.getRepoDetails)
  }

  renderLanguageDetails = () => {
    const {languageFilter} = this.state
    return (
      <ul className="language-list">
        {languageFiltersData.map(eachLanguageDetail => (
          <LanguageFilterItem
            key={eachLanguageDetail.id}
            languageDetails={eachLanguageDetail}
            isActive={eachLanguageDetail.id === languageFilter}
            handleLanguagetype={this.handleLanguagetype}
          />
        ))}
      </ul>
    )
  }

  renderRepoDetails = () => {
    const {repoList} = this.state

    return (
      <ul className="repo-list">
        {repoList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
    </div>
  )

  renderRepository = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepoDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="app-title">Popular</h1>
        {this.renderLanguageDetails()}
        {this.renderRepository()}
      </div>
    )
  }
}

export default GithubPopularRepos
