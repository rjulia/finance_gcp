/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { format } from 'date-fns'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import './App.css';
import makeRequest from './helpers/make-request/make-request'

function App() {
  const [page, setPage] = useState([])
  const [loading, setLoading] = useState(false)
  const getAboutUsPage = useCallback(async () => {
    setLoading(true)

    const headers = {
      'Content-Type': 'application/json',
    }
    makeRequest({
      headers,
      endPoint: 'boats',
      params: {
        page: 2
      },
    }).then((resp) => {
      setPage(resp.data.data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    getAboutUsPage()
  }, [ ])

  console.log("🚀 ~ file: App.js ~ line 8 ~ App ~ page", page, loading)
  return (
    <div className="App">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Rental Price</th>
            <th>Type</th>
            <th>Date made</th>
          </tr>
        </thead>
        <tbody>
          {
            _.map(page, (data) => (
              <tr key={data.d}>
                <td>{data.d}</td>
                <td>{data.name}</td>
                <td>{data.rental_price}$</td>
                <td>{data.type}</td>
                <td>{format(new Date(data.date_made), 'MM/dd/yyyy')}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default App;
