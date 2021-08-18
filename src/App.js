import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterComponent from './components/sectionComponent/footerComponent';
import CategoryListComponent from './components/bodyComponent/categoryListComponent';
import PersonBlogComponent from './components/bodyComponent/personBlogDetail';
import passBlogListComponent from './components/bodyComponent/passBlogListComponent';
import LoginComponent from './components/signupComponent/loginComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="bodycontainer">
          <Switch>
            <Route path="/" exact component={passBlogListComponent}></Route>
            <Route path="/login" component={LoginComponent}></Route>
            <Route path="/category/:category" component={CategoryListComponent}></Route>
            <Route path="/:name/:idx" component={PersonBlogComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;