import './App.css';
import Navbar from './components/Navbar/navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar/>
      <div>
        {/* <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {recipes.map(recipe =>
              <Route exact path={recipe.link} element={
                <RecipePage 
                  image={recipe.recipeImage}
                  name={recipe.recipeName} 
                  desc={recipe.recipeDesc}
                  ingredients={recipe.ingredients}
                  steps={recipe.steps}
                />
              }
              />
          )}
        </Routes> */}
      </div>
    </Router>
  );
}

export default App;