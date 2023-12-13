import { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS

import { useRef } from "react";
import dayjs from 'dayjs'



export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);

    const gridRef = useRef();

    const columns = [
        { headerName: 'Date', field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm a') },
        { headerName: 'Duration', field: 'duration', sortable: true, filter: true },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Customer',
            field: 'customer',
            sortable: true,
            filter: true,
            valueGetter: params => `${params.data.customer?.firstname || ""} ${params.data.customer?.lastname || ""}`
        },

    ]

    const TRAINING_REST_URL = 'http://traineeapp.azurewebsites.net/api/trainings';


    const getTrainings = () => {
        fetch(TRAINING_REST_URL)
            .then(response => response.json())
            .then(responseData => {
                // Fetch customer details for each training
                const trainingPromises = responseData.content.map(training => (
                    fetch(training.links.find(link => link.rel === 'customer').href)
                        .then(response => response.json())
                        .then(customerData => ({
                            ...training,
                            customer: {
                                firstname: customerData.firstname,
                                lastname: customerData.lastname,
                            }
                        }))
                ));

                // Resolve all promises and update state
                Promise.all(trainingPromises)
                    .then(updatedTrainings => setTrainings(updatedTrainings))
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }


    useEffect(() => getTrainings, [])



    return (
        <>
            <div className="ag-theme-material"
                style={{ height: '700px', width: '100%', margin: 'auto' }} >
                <AgGridReact
                    rowData={trainings}
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