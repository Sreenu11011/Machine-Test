import "./App.css";
import Home from "./components/Homepage";
import LoginPage from "./components/loginPage";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
