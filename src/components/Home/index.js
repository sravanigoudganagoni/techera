import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiConstants.initial, projectDetails: []}

  componentDidMount() {
    this.getProjects()
  }

  getProjects = async () => {
    this.setState({apiStatus: apiConstants.progress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(eachProject => ({
        id: eachProject.id,
        name: eachProject.name,
        logoUrl: eachProject.logo_url,
      }))
      this.setState({
        projectDetails: updatedData,
        apiStatus: apiConstants.success,
      })
    } else if (response.ok !== true) {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onSuccessView = () => {
    const {projectDetails} = this.state
    return (
      <ul className="projects-con">
        {projectDetails.map(eachItem => (
          <CourseItem courseDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  onFailureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="f-heading">Oops! Something Went Wrong</h1>
      <p className="desc">We can not seem to find the page you looking for</p>
      <button className="button" type="button" onClick={this.getProjects}>
        Retry
      </button>
    </div>
  )

  onLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.onSuccessView()
      case apiConstants.failure:
        return this.onFailureView()
      case apiConstants.progress:
        return this.onLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="m-con">
        <Header />
        <div className="c-con">
          <h1 className="heading">Courses</h1>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}

export default Home
