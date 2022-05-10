import Garage from '../../layouts/Garage'
import { DataGrid } from '@mui/x-data-grid';
import Button from '../../components/buttons/Button'
import Image from 'next/image'
import pp from '../../assets/care.png'

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Name',
      editable: true,
      flex:1
    },
    {
      field: "img",
      headerName: "Picture",
      width: 100,
      renderCell: (params) => {
        return (
            <div className='flex items-center w-2/3 p-2'>
                <Image className='rounded-full' src={pp} width={100} height={100} alt="Product Pic"/>
            </div>
        );
      },
    },
    {
      field: 'desc',
      headerName: 'Description',
      editable: true,
      flex:1
    },
    {
      field: 'category',
      headerName: 'Category',
      editable: true,
      flex:1
    },
    {
      field: 'stock',
      headerName: 'Stock',
      editable: true,
      flex:1
    },
    {
        field: 'wholesale_price',
        headerName: 'Wholsesale Price',
        type: 'number',
        editable: true,
        flex: 1
    },
    {
      field: 'retail_price',
      headerName: 'Retail Price',
      type: 'number',
      editable: true,
      flex: 1
    },
    {
      field: 'profitInCurrency',
      headerName: 'Expected Profits',
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
                <Button icon="delete" title="Delete"/>
                <Button icon="edit" title="Edit"/>
            </div>
        );
    },
    },
  ];
  
  const rows = [
    { id: 1, title: 'Air Filter', desc: 'High Flow M 1000 PR', category:'Parts', stock: 22, wholesale_price: 6750, retail_price: 9950, profitInCurrency: 70400},
    { id: 2, title: 'Ignition Coils', desc: 'Applicable for Ford, Toyota and Honda', category:'Parts', stock: 13, wholesale_price: 5250, retail_price: 8500, profitInCurrency: 42250},
    { id: 3, title: 'Radiator ', desc: 'Lexus RX 350 RX450H Cooling Radiator Factory style almunium', category:'Parts', stock: 2, wholesale_price: 275000, retail_price: 300000, profitInCurrency: 50000},
    { id: 4, title: 'Michelin Tires', desc: '17, 18, 20, 22 Sizes Available', category:'Tires', stock: 16, wholesale_price: 105000, retail_price: 120000, profitInCurrency: 240000},
    { id: 5, title: 'Fuel', desc: '15L 93 Super Fuel', category:'Consumables', stock: 26, wholesale_price: 6500, retail_price: 8000, profitInCurrency: 39000},
    { id: 5, title: 'BMW M6 Steering Wheel', desc: 'BMW M6 V8 2019 Steering Wheel', category:'Steering Wheels', stock: 2, wholesale_price: 185000, retail_price: 195000, profitInCurrency: 20000},
  ];



const Inventory = () => {
    
    
  return (
    <Garage>
    <div style={{ height: 520, width: '80%' }} className="text-white">
    <div className='flex items-center justify-between'>
        <h1 className='font-bold text-xl opacity-75'>Inventory Management</h1>
        <Button color="rgba(0,0,150,.4)" icon="Add Vehicle" title="Add Product"/>
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

export default Inventory