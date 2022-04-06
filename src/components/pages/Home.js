import "../../assets/css/reset.css"
import "../../assets/css/header.css"
import "../../assets/css/headerMediaQuery.css"
import { Link } from "react-router-dom"

const Home = () => {
  return ( 
    <header>
      <div className="header-container">
        <div className="header-difficult">
          <h1 className="header-selectDifficult">Select Difficult</h1>
          <Link to="/beginner"><h2 className="header-difficultSelected">Beginner</h2></Link>
          <Link to="/advanced"><h2 className="header-difficultSelected">Advanced</h2></Link>
          <Link to="/intermediate"><h2 className="header-difficultSelected">Intermediate</h2></Link>
        </div>
      </div>
    </header>
  )
}

export default Home