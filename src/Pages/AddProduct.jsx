import React, {useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTextArea,
  MDBFile,
  MDBBadge,
}
from 'mdb-react-ui-kit';

import avatar from "../Assets/products.png";
import Header from '../Components/Header';

export default function AddProduct() {

  // Capturing the vendor info
  let loginUser = JSON.parse(localStorage.getItem('userInfo'));
  let vendor_id = loginUser['id'];
  // console.log(vendor_id)

  // CApturing the product image 
  const [file, setFile] = useState("");
  const [productFile, setProductFile] = useState("");
  const [fileErr, setFileErr] = useState("");

  const handleFileUpload = (e) => {
    let image = e.target.files[0];
    if(image.type === "image/jpeg" || image.type === "image/jpg" || image.type === "image/png") {
      if(image.size >= 5*1024*1024) {
        setFileErr("Image size is too large");
      } else {
        setFile(image);
        setProductFile(URL.createObjectURL(image));
        setFileErr("");
      }
    } else {
      setFileErr("File type is not supported");
    }
  }

  // Capturing Form Data
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productInitialPrice, setProductInitialPrice] = useState(0);
  const [productSellingPrice, setProductSellingPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productCategory, setProductCategory] = useState("");

  // Capturing Form Data Error
  const [productNameErr, setProductNameErr] = useState("");
  const [productDescErr, setProductDescErr] = useState("");
  const [productInitialPriceErr, setProductInitialPriceErr] = useState("");
  const [productSellingPriceErr, setProductSellingPriceErr] = useState("");
  const [productQuantityErr, setProductQuantityErr] = useState("");
  const [productCategoryErr, setProductCategoryErr] = useState("");

  // Capturing Response
  const [err, setErr] = useState("");
  const [res, setRes] = useState("");

  // function to send data to the backend
  async function handleFormSubmit () {
    // clear previous error messages
    setProductNameErr("")
    setProductDescErr("");
    setProductInitialPriceErr("");
    setProductSellingPriceErr("");
    setProductQuantityErr("");
    setProductCategoryErr("");

    // if (productInitialPrice < productSellingPrice) {
    //   formData declaration
    // } else {
    //   setProductInitialPriceErr("Initial Price must be greater than Selling Price");
    // }

    let formData = new FormData();
    formData.append('product_name', productName);
    formData.append("product_desc", productDesc);
    formData.append('initial_price', productInitialPrice);
    formData.append('selling_price', productSellingPrice);
    formData.append('quantity', productQuantity);
    formData.append('category', productCategory);
    formData.append('product_image', file);
    formData.append('vendor_id', vendor_id);

    try {
      let result = await fetch("http://localhost:8000/api/addproduct", {
        method: "POST",
        body: formData
      });

      result = await result.json();
      if (result.errors) {
        const errors = result.errors;
        if(errors.product_name) setProductNameErr(errors.product_name[0]);
        if(errors.product_desc) setProductDescErr(errors.product_desc[0]);
        if (errors.initial_price) setProductInitialPriceErr(errors.initial_price[0]);
        if (errors.selling_price) setProductSellingPriceErr(errors.selling_price[0]);
        if (errors.quantity) setProductQuantityErr(errors.quantity[0]);
        if (errors.category) setProductCategoryErr(errors.category[0]);
        if(errors.product_image) setFileErr(errors.product_image[0]);
        setErr("Registration Failed");
        setRes("");
        
      } else {
        setRes("Product Added Succcessfully");
        setErr("");
        setProductName("");
        setProductDesc("");
        setProductInitialPrice("");
        setProductSellingPrice("");
        setProductQuantity("");
        setProductCategory("");
        setFile("");
        setProductFile("");
        console.log(result);
      } 

    } catch (errors){
      setErr("Registation Failed");
    }
  }

  return (
    <>
        <Header/>
        <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center'>

            <MDBCol lg='8'>

            <MDBCard className='my-5 rounded-3' style={{maxWidth: '600px'}}>
                <span className='badge bg-danger mb-2'>{err}</span>
                <span className='badge bg-success mb-2'>{res}</span>
                <MDBCardImage src={productFile} className='w-100 rounded-top'  alt="Product Image"/>
                <MDBBadge className='mx-2' color='danger' light>
                  {fileErr}
                </MDBBadge>
                {/* <MDBCardImage src={productFile} className='rounded' fluid/> */}
                <MDBFile label='Upload Product Picture' id='customFile' onChange={handleFileUpload} wrapperClass='mb-4'/>

                <MDBCardBody className='px-5'>

                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Add Product</h3>
                <MDBInput wrapperClass='mb-4' label='Product Name' id='form1' type='text' onChange={(e) => setProductName(e.target.value)} value={productName}/>
                <span className='badge bg-danger mb-2'>{productNameErr}</span>

                <MDBTextArea wrapperClass='mb-4' label="Product Description" id="textAreaExample" rows="{4}" onChange={(e) => setProductDesc(e.target.value)} value={productDesc}/>
                <span className='badge bg-danger mb-2'>{productDescErr}</span>

                <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Initial Price' id='form1' type='number' min="0" onChange={(e) => setProductInitialPrice(e.target.value)} value={productInitialPrice}/>
                      <span className='badge bg-danger mb-2'>{productInitialPriceErr}</span>
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Selling Price' id='form1' type='number' min="0" max={productInitialPrice} onChange={(e)=> setProductSellingPrice(e.target.value)} />
                      <span className='badge bg-danger mb-2'>{productSellingPriceErr}</span>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Quantity' id='form1' type='number' min="1" onChange={(e) => setProductQuantity(e.target.value)} value={productQuantity}/>
                      <span className='badge bg-danger mb-2'>{productQuantityErr}</span>
                    </MDBCol>
                    <MDBCol md='6'>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setProductCategory(e.target.value)} value={productCategory}>
                        <option selected>Category</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Electronic">Electronic</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Grocery">Grocery</option>
                      </select>
                      <span className='badge bg-danger mb-2'>{productCategoryErr}</span>
                    </MDBCol>
                </MDBRow>
                <MDBBtn color='success' className='mb-4' size='lg' onClick={handleFormSubmit}>Submit</MDBBtn>

                </MDBCardBody>
            </MDBCard>

            </MDBCol>
        </MDBRow>

        </MDBContainer>
    </>
  );
}