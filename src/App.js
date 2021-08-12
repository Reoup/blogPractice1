import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './components/sectionComponent/headerComponent';
import FooterComponent from './components/sectionComponent/footerComponent';
import CategoryComponent from './components/bodyComponent/categoryComponent';
import CategoryListComponent from './components/bodyComponent/categoryListComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
          <Route path="/" component={CategoryComponent}/>
          <div className="container">
            <Switch>
              <Route path="/category/:category" component={CategoryListComponent}></Route>
            </Switch>
          </div>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
