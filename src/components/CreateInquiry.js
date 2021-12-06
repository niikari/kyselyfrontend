import React, {useState, useEffect} from "react";

export default function CreateInquiry(props) {

    const [inquiryName, setInquiryName] = useState('')
    
    
    return (
        <div style={{ marginTop: 20, maxWidth: 400, margin: 'auto' }}>
            {props.auth && 
                <p>Testi</p>

            }
            
        </div>
    )
}