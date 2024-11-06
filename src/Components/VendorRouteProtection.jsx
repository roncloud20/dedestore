import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function VendorRouteProtection(props) {
    const navigate = useNavigate();
    let Cmp = props.cmp;
    let vendor = JSON.parse(localStorage.getItem('userInfo'));
    useEffect(()=>{

        if(vendor && vendor['user_role'] == 'vendor') {
            Cmp = props.cmp;
            return;
        } else {
            // alert("This page is restricted")
            navigate('/dashboard');
        }
        // enlint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Cmp/>
            {/* <<Cmp/>/> */}
        </>
  )
}