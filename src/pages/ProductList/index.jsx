import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import history from "../../util/history";
import "./styles.css";

import { Row, Col, Carousel, Space, Button } from "antd";

import { StarOutlined, StarFilled, ShoppingCartOutlined, HeartOutlined, EyeOutlined } from "@ant-design/icons";

import * as Style from "./styles";

import { getProductLists as getProductListsAction } from "../../redux/actions";

function ProductList({ getProductLists, products}) {
  useEffect(() => {
    getProductLists();
  }, []);
  const [isShowMore, setIsShowMore] = useState(false)
  const renderProductImages = (product) => {
    if (!product.productOptions) return null;
    return product.productOptions.map((option, optionIndex) => (
      <div>
        <Style.ProductImageContainer>
          <Style.ProductImageContent
            className="product-card-image"
            image={option.image}
          />
        </Style.ProductImageContainer>
      </div>
    ));
  };

  const renderProductList = () => {
    return products.map((product, productIndex) => {
      if(!isShowMore && productIndex > 1){
        return null;
      }
      return (
      <Col style={{ width: "20%" }}>
        <Style.Product onClick={() => history.push(`/product/${product.id}`)}>
          <Style.ProductContainer>
            <Style.ProductContentHover className="product-hover">
              <Style.ProductButtonList>
                <Space>
                  <Style.ProductButtonItem>
                    <ShoppingCartOutlined />
                  </Style.ProductButtonItem>
                  <Style.ProductButtonItem>
                    <HeartOutlined />
                  </Style.ProductButtonItem>
                  <Style.ProductButtonItem>
                    <EyeOutlined />
                  </Style.ProductButtonItem>
                </Space>
              </Style.ProductButtonList>
            </Style.ProductContentHover>
            <div style={{ overflow: "hidden" }}>
              <Carousel autoplay dots={false}>
                {renderProductImages(product)}
              </Carousel>
            </div>
          </Style.ProductContainer>
          <Style.ProductDetail>
            <Style.ProductNameContainer>
              <Style.ProductNameContent href="#">
                {product.name}
              </Style.ProductNameContent>
              <p>
                {product.catalog.name}
              </p>
            </Style.ProductNameContainer>

            <Style.StarRating>
              <i>
                <StarFilled />
              </i>
              <i>
                <StarOutlined />
              </i>
              <i>
                <StarOutlined />
              </i>
              <i>
                <StarOutlined />
              </i>
              <i>
                <StarOutlined />
              </i>
            </Style.StarRating>
            <Style.ProductPrice>
              <Style.SalePrice>130.00</Style.SalePrice>
              <Style.OrgPrice>150.00</Style.OrgPrice>
            </Style.ProductPrice>
          </Style.ProductDetail>
        </Style.Product>
      </Col>
      )
  });
  };

  return (
    <Style.ProductListContainer>
      <Row>
        <Col span={24}>
          <Style.Breadcrumb>
            <nav>
              <h1>Skin Care</h1>
              <span>
                <a href="#">Home</a> <span>-</span> <span>Skin care</span>
              </span>
            </nav>
          </Style.Breadcrumb>
        </Col>
      </Row>
      <Style.ProductListContent>
        <Row>
          <Col span={4}>
            <div className="left-sidebar">
              <div className="collection-sidebar">
                <div className="collection-sidebar-item">
                  <h4>Category</h4>
                  <hr />
                  <ul>
                    <li className="category-item">
                      <a href="#">Beauty Care</a>
                    </li>
                    <li className="category-item">
                      <a href="#">Hair Care</a>
                    </li>
                    <li className="category-item">
                      <a href="#">Skin Care</a>
                    </li>
                    <li className="category-item">
                      <a href="#">Face Care</a>
                    </li>
                  </ul>
                </div>
                <div className="collection-sidebar-item">
                  <h4>Shop by Weight</h4>
                  <hr />
                  <ul>
                    <li className="category-item">
                      <a href="#">100 ml </a>
                    </li>
                    <li className="category-item">
                      <a href="#">150 ml</a>
                    </li>
                    <li className="category-item">
                      <a href="#">200 ml</a>
                    </li>
                    <li className="category-item">
                      <a href="#">250 ml</a>
                    </li>
                    <li className="category-item">
                      <a href="#">300 ml</a>
                    </li>
                  </ul>
                </div>
                <div className="collection-sidebar-item">
                  <h4>Shop by Weight</h4>
                  <hr />
                  <ul>
                    <li className="category-item">
                      <a href="#">100 - 200</a>
                    </li>
                    <li className="category-item">
                      <a href="#">200 - 300</a>
                    </li>
                    <li className="category-item">
                      <a href="#">300 - 400</a>
                    </li>
                    <li className="category-item">
                      <a href="#">500 - 600</a>
                    </li>
                    <li className="category-item">
                      <a href="#">500 - xxx</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
          <Col span={20}>
            <div className="right-collection">
              <div className="collection-grid">
                <header className="section-header">Header</header>
                <div>
                  <Row gutter={16}>
                    {renderProductList()}
                  </Row>
                  {(!isShowMore && products.length >= 2) && (
                    <Button
                      onClick = {() => setIsShowMore(true)}
                    >
                      Hiển thị thêm
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Button type="primary">dadasdasd</Button>
      </Style.ProductListContent>
    </Style.ProductListContainer>
  );
}

const mapStateToProps = (state) => {
  const { products, productType } = state;
  return {
    products,
    productType
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductLists: (params) => dispatch(getProductListsAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
