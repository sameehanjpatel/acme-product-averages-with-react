const { render } = ReactDOM;
const { Component } = React;
const { Link, HashRouter, Route, Switch, Redirect } = ReactRouterDOM;

const root = document.querySelector("#root");

const Home = () => {return (<h1>Home</h1>)};

//logic is here - don't understand why the products variable is undefined here 
function Products({ products, companies, offerings }){ 
     products.map(product => {
    <ul>
        <li><b>Product:</b>
        <p>{product.name}</p></li>
        <li><b>Suggested Price:</b>
        <p>{product.suggestedPrice}</p></li>
        <li><b>Average Price:</b>
      
        let offeringArr = offerings.filter((offering => 
            return offering.productId === product.id
              ))
        let avgSumA = offeringArr.reduce((total, productListing) => 
                return total += productListing.price)
        let avgPrice = avgSum/ offeringArr.length 

    
        <p>{avgPrice}</p></li>

        <li><b>Lowest Price:</b>
         let lowestPrice = offeringArr.reduce( (currentOffering, nextOffering) => 
              return currentOffer.price < nextOffering.price ? currentOffer.price: nextOferring.price)

        <p>{lowestPrice}</p></li>
        

    </ul>
    <hr>
    })
}


        

const Nav = (props) => {
    const path = props.location.pathname;
    console.log(path)
    return (
    <nav>
        <Link to="/home>" className = { path === "/home" ? "selected": ""}>Home</Link>
            <Link to="/products" className={path === "/products" ? "selected" : ""}>Products</Link>
    </nav>)
}


class App extends Component {
        constructor(){
            super();
            this.state = {
                products:[],
                companies: [],
                offerings: [],
            }
        }

        componentDidMount(){
            axios.get("https://acme-users-api-rev.herokuapp.com/api/products")
                .then(response => {
                    const products = response.data
                    this.setState({ products })
                })
            axios.get("https://acme-users-api-rev.herokuapp.com/api/companies").then(response => {
                const companies = response.data;
                this.setState({ companies });
            })
            axios.get("https://acme-users-api-rev.herokuapp.com/api/offerings").then(response => {
                const offerings = response.data;
                this.setState({ offerings });
            })
        }
        


        render(){
        const {products, companies, offerings} = this.state
        console.log(offerings)    
        return (
        <HashRouter>
            <Route component = { Nav } />
            <Switch>
                <Route path = "/home" component = {Home} />
                    <Route
                        path="/products"
                        render={() => (
                        <Products products={products} companies={companies} offerings={offerings} />
                        )}
                        component = { Products }
                    />
                <Redirect to ="/home" />
            </Switch>
        </HashRouter>)
        }
}

render(<App />, root)

