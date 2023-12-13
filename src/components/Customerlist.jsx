import { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import { useRef } from "react";


export default function Customerlist() {

    const [customers, setCustomers] = useState([]);


    const gridRef = useRef();

    const columns = [
        { headerName: 'First name', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Last name', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
    ]



    const CUSTOMER_REST_URL = 'http://traineeapp.azurewebsites.net/api/customers';

    const getCustomers = () => {
        fetch(CUSTOMER_REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(error => console.error(error));
    }

    useEffect(() => getCustomers, [])



    return (
        <>
            <div className="ag-theme-material"
                style={{ height: '700px', width: '100%', margin: 'auto' }} >
                <AgGridReact
                    rowData={customers}
                    animateRows={true}
                    rowSelection="single"
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                >
                </AgGridReact>

            </div>
        </>
    )
}