import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props

  const {imgUrl, name, issuesCount, forksCount, starsCount} = repoDetails

  return (
    <div className="repository-item-container">
      <img className="repository-img" src={imgUrl} alt={name} />
      <h1 className="repo-title">{name}</h1>
      <div className="repo-details-container">
        <p className="repo-details-text">
          <img
            className="repo-icons"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          {starsCount} stars
        </p>
        <p className="repo-details-text">
          <img
            className="repo-icons"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          {forksCount} forks
        </p>
        <p className="repo-details-text">
          <img
            className="repo-icons"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          {issuesCount} open issues
        </p>
      </div>
    </div>
  )
}

export default RepositoryItem
