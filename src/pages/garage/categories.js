import Garage from '../../layouts/Garage'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { MdAddCircle, MdDelete } from 'react-icons/md'
import { RiEditCircleFill } from 'react-icons/ri'
import { IconButton } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'category_name',
      headerName: 'Name',
      editable: true,
      flex:1
    },
    {
      field: 'service',
      headerName: 'Service',
      editable: true,
      flex:1
    },
    {
      field: 'desc',
      headerName: 'Description',

      editable: true,
      flex:1
    },
    {
      field: 'prefix',
      headerName: 'Prefix',
      editable: true,
      flex:1
    },
    {
        field: 'products',
        headerName: 'Products',
        type: 'number',
        editable: true,
        flex: 1
    },
    {
    field: "actions",
    headerName: "Actions",
    width: 250,
    renderCell: (params) => {
        return (
            <div className='flex space-x-2'>
              <IconButton aria-label="delete">
                <MdDelete />
              </IconButton>
              <IconButton aria-label="delete">
                <RiEditCircleFill />
              </IconButton>
            </div>
        );
    },
    },
  ];
  
  const rows = [
    { id: 1, desc: 'acrylic polyurethane "enamel" with a pigmented basecoat and a clear topcoat.', category_name: 'Paint', prefix: 'PNT', service: 'Car Care', products: 2},
    { id: 2, desc: 'All brands engines', category_name: 'Engine', prefix: 'ENGN', service: 'Repair', products: 4 },
    { id: 3, desc: 'Custom Category', category_name: 'Custom', prefix: 'Cus',  service: 'Repair', products: 1},
  ];



const categories = () => {
    
    
  return (
    <Garage>
    <div style={{ height: 520, width: '80%' }} className="text-white">
    <div className='flex items-center justify-between'>
        <h1 className='font-bold text-xl opacity-75'>Categories Management</h1>
        <Button
            startIcon={<MdAddCircle />}
            variant="contained"
            className='rounded-xl px-6 py-2 hover:scale-105 bg-black text-base capitalize text-[rgba(255,255,255,.5)] hover:bg-blue-600 hover:text-white transition-all duration-150'
        >
            Add Category
      </Button>
    </div>
    <DataGrid
    className='bg-white mt-4 rounded-xl opacity-90'
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
    </Garage>
  )
}

export default categories