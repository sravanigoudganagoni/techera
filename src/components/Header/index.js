import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = () => (
  <Link to="/">
    <div className="h-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        className="w-logo"
        alt="website logo"
      />
    </div>
  </Link>
)

export default withRouter(Header)
