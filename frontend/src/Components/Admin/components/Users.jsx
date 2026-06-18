import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function Users() {
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/appointments', {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
      });
      setAppointments(response.data.all_appointments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'user',
      headerName: 'User Name',
      width: 200,
      renderCell: (params) => params.row.user?.username ?? '—',
    },
    {
      field: 'doctor',
      headerName: 'Doctor Name',
      width: 200,
      renderCell: (params) => params.row.doctor?.name ?? '—',
    },
    { field: 'disease', headerName: 'Disease', width: 200 },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      renderCell: (params) => moment(params.row.date).format('YYYY-MM-DD'),
    },
  ];

  return (
    <div style={{ marginLeft: 20, height: 400, width: '100%' }}>
      <DataGrid rows={appointments} columns={columns} getRowId={(row) => row._id} />
    </div>
  );
}
