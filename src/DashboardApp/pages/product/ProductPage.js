import styled from "styled-components"
import { Link } from "react-router-dom"
import Chart from "../../components/charts/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@mui/icons-material"

const Container = styled.div`
    flex: 4;
    padding: 20px;
`
const ProductTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ProductTitle = styled.h1``
const ProductAddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`

const ProductTop = styled.div`
  display: flex;
`
const ProductTopLeft = styled.div`
  flex: 1;
`
const ProductTopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
`
const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;
`
const ProductInfoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`
const ProductName = styled.span`
  font-weight: 600;

`
const ProductInfoBottom = styled.div`
  margin-top: 10px;

`
const ProductInfoItem = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
`
const ProductInfoKey = styled.span``
const ProductInfoValue = styled.span`
  font-weight: 300;
`
const ProductBottom = styled.div`
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
`

const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;

`
const ProductFormLeft = styled.div`
  display: flex;
  flex-direction: column;
`
const ProductFormLabel = styled.label``
const ProductFormInput = styled.input``
const ProductFormSelect = styled.select`
  margin-bottom: 10px;
`
const ProductFormOption = styled.option``
const ProductFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductUpload = styled.div`
  display: flex;
  align-items: center;
`
const ProductUploadImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`

const ProductButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`


const ProductPage = () => {
  return (
    <Container>
      <ProductTitleContainer>
        <ProductTitle>Product</ProductTitle>
        <Link to="/newproduct">
          <ProductAddButton>Create</ProductAddButton>
        </Link>
      </ProductTitleContainer>
      <ProductTop>
        <ProductTopLeft>
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </ProductTopLeft>
        <ProductTopRight>
          <ProductInfoTop>
            <ProductInfoImg src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
            <ProductName>Apple Airpods</ProductName>
          </ProductInfoTop>
          <ProductInfoBottom>
            <ProductInfoItem>
              <ProductInfoKey>id:</ProductInfoKey>
              <ProductInfoValue>123</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>sales:</ProductInfoKey>
              <ProductInfoValue>8751</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>active:</ProductInfoKey>
              <ProductInfoValue>yes</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>in stock:</ProductInfoKey>
              <ProductInfoValue>no</ProductInfoValue>
            </ProductInfoItem>
          </ProductInfoBottom>
        </ProductTopRight>
      </ProductTop>
      <ProductBottom>
        <ProductForm>
          <ProductFormLeft>
            <ProductFormLabel style={{marginBottom:'10px',color:'gray'}}>Product Name</ProductFormLabel>
            <ProductFormInput type="text" placeholder="Apple Airpod" style={{marginBottom:'10px',border:'none',padding:'5px',borderBottom:'1px solid gray'}}/>
            <ProductFormLabel>In Stock</ProductFormLabel>
            <ProductFormSelect name="inStock" id="inStock">
              <ProductFormOption value="yes">Yes</ProductFormOption>
              <ProductFormOption value="no">No</ProductFormOption>
            </ProductFormSelect>
            <ProductFormLabel>Active</ProductFormLabel>
            <ProductFormSelect name="active" id="active">
              <ProductFormOption value="yes">Yes</ProductFormOption>
              <ProductFormOption value="no">No</ProductFormOption>
            </ProductFormSelect>
          </ProductFormLeft>
          <ProductFormRight>
            <ProductUpload>
              <ProductUploadImg src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
              <ProductFormLabel htmlFor="file">
                <Publish />
              </ProductFormLabel>
              <ProductFormInput type="file" id="file" style={{display:'none'}}/>
            </ProductUpload>
            <ProductButton>Update</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottom>
    </Container>
  )
}

export default ProductPage
