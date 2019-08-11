const { render } = ReactDOM;
const { Component } = React;
const { Link, HashRouter, Route, Switch, Redirect } = ReactRouterDOM;



const root = document.querySelector("#root");

const Home = () => {return (<h1>Home</h1>)};
const Companies = () => {return (<h1>Companies</h1>)};

const Nav = (props) => {
    const path = props.location.pathname;
    console.log(path)
    return (
    <nav>
        <Link to="/home>" className = { path === "/home" ? "selected": ""}>Home</Link>
            <Link to="/companies" className={path === "/companies" ? "selected" : ""}>Companies</Link>
    </nav>)
}


const App = () => {
        return (
        <HashRouter>
            <Route component = { Nav } />
            <Switch>
                <Route path = "/home" component = {Home} />
                <Route path="/companies" component = {Companies} />
                <Redirect to ="/home" />
            </Switch>
        </HashRouter>)
}

render(<App />, root)

