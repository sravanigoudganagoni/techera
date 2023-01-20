import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <li className="project-item">
      <Link to={`/courses/${id}`}>
        <img src={logoUrl} alt={name} className="project-img" />
        <p className="project-name">{name}</p>
      </Link>
    </li>
  )
}

export default CourseItem
