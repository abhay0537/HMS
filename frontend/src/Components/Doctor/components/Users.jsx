import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/doctor-appointments', {
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
    {
      field: 'user',
      headerName: 'User Name',
      width: 150,
      renderCell: (params) => params.row.user.username,
    },
    { field: 'disease', headerName: 'Disease', width: 100 },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      renderCell: (params) => moment(params.row.date).format('DD/MM/YYYY'),
    },
    {
      field: 'payment',
      headerName: 'Payment',
      width: 100,
      renderCell: (params) => (
        <span>{params.row.payment === 'paid' ? 'clear' : 'pending'}</span>
      ),
    },
    {
      field: 'Report',
      headerName: 'Generate Report',
      width: 160,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/report/${params.row._id}`)}
          sx={{
            bgcolor: '#111827',
            color: '#ffffff',
            '&:hover': { bgcolor: '#374151' },
          }}
        >
          Show More
        </Button>
      ),
    },
  ];

  return (
    <div style={{ marginLeft: 20, height: 400, width: '100%' }}>
      <DataGrid rows={appointments} columns={columns} getRowId={(row) => row._id} />
    </div>
  );
}
