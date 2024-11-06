import React from 'react';
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
}
from 'mdb-react-ui-kit';
import Header from '../Components/Header';

export default function AddProduct() {
  return (
    <>
        <Header/>
        <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center'>

            <MDBCol lg='8'>

            <MDBCard className='my-5 rounded-3' style={{maxWidth: '600px'}}>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top'  alt="Sample photo"/>

                <MDBCardBody className='px-5'>

                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Add Product</h3>
                <MDBInput wrapperClass='mb-4' label='Product Name' id='form1' type='text'/>

                <MDBTextArea wrapperClass='mb-4' label="Product Description" id="textAreaExample" rows="{4}" />

                <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Initial Price' id='form1' type='number' min="0"/>
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Selling Price' id='form1' type='number' min="0"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Quantity' id='form1' type='number' min="0"/>
                    </MDBCol>
                    <MDBCol md='6'>
                      <select class="form-select" aria-label="Default select example">
                        <option selected>Category</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Electronic">Electronic</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Grocery">Grocery</option>
                      </select>
                    </MDBCol>
                </MDBRow>
                <MDBBtn color='success' className='mb-4' size='lg'>Submit</MDBBtn>

                </MDBCardBody>
            </MDBCard>

            </MDBCol>
        </MDBRow>

        </MDBContainer>
    </>
  );
}