import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, handleLanguagetype, isActive} = props

  const {language, id} = languageDetails

  const onClickLanguageBtn = () => {
    handleLanguagetype(id)
  }

  const activeClass = isActive ? 'active' : ''

  return (
    <li className="language-filter-item">
      <button
        className={`language-btn ${activeClass}`}
        type="button"
        onClick={onClickLanguageBtn}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
