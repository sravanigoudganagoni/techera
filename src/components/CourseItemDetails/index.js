import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const constrainStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class CourseItemDetails extends Component {
  state = {currentStatus: constrainStatus.initial, projectData: {}}

  componentDidMount() {
    this.getProjectCard()
  }

  getProjectCard = async () => {
    this.setState({currentStatus: constrainStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const itemUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'Get',
    }
    const response = await fetch(itemUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      console.log(formattedData)

      this.setState({
        projectData: formattedData,
        currentStatus: constrainStatus.success,
      })
    } else if (response !== true) {
      this.setState({currentStatus: constrainStatus.failure})
    }
  }

  retryProjects = () => this.getProjectCard()

  onFailureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="f-heading">Oops! Something Went Wrong</h1>
      <p className="desc">
        We cannot seem to find the page you are looking for
      </p>
      <button className="button" type="button" onClick={this.retryProjects}>
        Retry
      </button>
    </div>
  )

  onLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onSuccessView = () => {
    const {projectData} = this.state
    const {imageUrl, name, description} = projectData
    return (
      <div className="con-1">
        <img src={imageUrl} alt={name} className="pr-img" />
        <div className="con-2">
          <h1 className="pr-name">{name}</h1>
          <p className="pr-desc">{description}</p>
        </div>
      </div>
    )
  }

  renderingResults = () => {
    const {currentStatus} = this.state
    switch (currentStatus) {
      case constrainStatus.success:
        return this.onSuccessView()
      case constrainStatus.failure:
        return this.onFailureView()
      case constrainStatus.progress:
        return this.onLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderingResults()}
      </>
    )
  }
}
export default CourseItemDetails
