import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './components/sectionComponent/headerComponent';
import FooterComponent from './components/sectionComponent/footerComponent';
import CategoryComponent from './components/bodyComponent/categoryComponent';
import CategoryListComponent from './components/bodyComponent/categoryListComponent';
import PersonBlogComponent from './components/bodyComponent/personBlogDetail';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
        <div>
        <Route path="/" exact component={CategoryComponent}/>
        </div>
          <div className="container">
            <Switch>
              <Route path="/category/:category" component={CategoryListComponent}></Route>
              <Route path="/:name/:idx" component={PersonBlogComponent}></Route>
            </Switch>
          </div>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;