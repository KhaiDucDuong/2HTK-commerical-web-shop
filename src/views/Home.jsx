import React, { lazy, Component } from "react";
import { Link } from "react-router-dom";
import { data } from "../data";
import { ReactComponent as IconLaptop } from "bootstrap-icons/icons/laptop.svg";
import { ReactComponent as IconHeadset } from "bootstrap-icons/icons/headset.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconTv } from "bootstrap-icons/icons/tv.svg";
import { ReactComponent as IconDisplay } from "bootstrap-icons/icons/display.svg";
import { ReactComponent as IconHdd } from "bootstrap-icons/icons/hdd.svg";
import { ReactComponent as IconUpcScan } from "bootstrap-icons/icons/upc-scan.svg";
import { ReactComponent as IconTools } from "bootstrap-icons/icons/tools.svg";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {AllProducts} from "../hooks/productApi";

const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../components/card/CardIcon"));
const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../components/card/CardImage"));
const CardDealsOfTheDay = lazy(() =>
  import("../components/card/CardDealsOfTheDay")
);

class HomeView extends Component {
  components = {
    IconLaptop: IconLaptop,
    IconHeadset: IconHeadset,
    IconPhone: IconPhone,
    IconTv: IconTv,
    IconDisplay: IconDisplay,
    IconHdd: IconHdd,
    IconUpcScan: IconUpcScan,
    IconTools: IconTools,
  };
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
    };
  }

  async componentDidMount() {
    const products = await AllProducts();
    this.setState({ productList: products });
  }
  getRandomProducts(products, num) {
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, num); 
  }

  render() {
    const { productList } = this.state;
    const random3Products = this.getRandomProducts(productList, 3);
    const firstFourProducts = productList.slice(0, 4);
    // map the rows as div.row
    const DealsOfTheDay = firstFourProducts.map((product, idx) => (
      <Card style={{ width: '18rem',height: '23rem' }} key={idx}>
      <Card.Img variant="top" src={`${product.productVariations[0].image}`} style={{ width: "100%",height: "200px", objectFit: "contain" }} />
    <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        <Card.Title>{product.name} </Card.Title> 
        <Card.Text>${product.productVariations[0].price}</Card.Text>
      </div>
      <div>
        <Button variant="primary" style={{ marginTop: 'auto' }}>Buy Now</Button> <span className="badge bg-success me-2">New</span>
      </div>
    </Card.Body>
  </Card>
))
     const carouselContent = random3Products.map((product, idx) => (
      <Card style={{ width: '18rem',height: '23rem' }} key={idx}>
          <Card.Img variant="top" src={`${product.productVariations[0].image}`} style={{ width: "100%",height: "200px", objectFit: "contain" }} />
        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <div>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>${product.productVariations[0].price}</Card.Text>
          </div>
          <div>
            <Button variant="primary" style={{ marginTop: 'auto' }}>Buy Now</Button> 
          </div>
        </Card.Body>
      </Card>
    ));

    return (
      <React.Fragment>
        <Banner className="mb-3" id="carouselHomeBanner" data={data.banner} />
        <div className="container-fluid bg-light mb-3">
          <div className="row g-3">
            <div className="col-md-9">

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                {carouselContent}
                            </div>
              {/* <Support /> */}
            </div>
            <div className="col-md-3">
              <CardLogin className="mb-3" />
              <CardImage src="../../images/banner/Watches.webp" to="promo" />
            </div>
          </div>
        </div>
        <div className="container-fluid bg-light mb-3">
          <div className="row">
            <div className="col-md-12">
              <CardDealsOfTheDay
                title="Best Sellers"
              >
                <Carousel >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {DealsOfTheDay}
                  </div>
                </Carousel>
              </CardDealsOfTheDay>
            </div>
          </div>
        </div>

        <div className="bg-info bg-gradient p-3 text-center mb-3">
          {/* <h4 className="m-0">Explore Fashion Collection</h4> */}
        </div>
        {/* <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/male.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Men's Clothing</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/female.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Women's Clothing</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/smartwatch.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Smartwatch</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/footwear.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Footwear</div>
              </Link>
            </div>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

export default HomeView;
