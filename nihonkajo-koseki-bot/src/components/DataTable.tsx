import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from '@mui/material';
import { EditIcon } from './icons';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { formatDate } from '@/utils/helpers';
import { ColumnsTable } from '@/interfaces/common';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1F5FAD',
    },
  },
});

interface TableProps {
  data: Array<{ [key: string]: any }>;
  columns: ColumnsTable;
  rowsPerPage: number;
  totalPages?: number;
  onEdit?: (row: { [key: string]: any }) => void;
  onPageChange?: (page: number) => void;
}

const DataTable: React.FC<TableProps> = ({
  data,
  columns,
  rowsPerPage,
  totalPages,
  onEdit = () => {},
  onPageChange = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<
    Array<{ [key: string]: any }>
  >([]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
    onPageChange(value);
  };

  useEffect(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    setPaginatedData(data.slice(start, end));
  }, [currentPage, data, rowsPerPage]);

  return (
    <ThemeProvider theme={theme}>
      <div className="overflow-x-auto">
        <TableContainer className="!rounded-none">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1F5FAD' }}>
                {columns.map((column, index) => {
                  const columnKey = Object.keys(column)[0];
                  return (
                    <TableCell
                      key={columnKey}
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        position: index === 0 ? 'sticky' : 'static',
                        left: index === 0 ? 0 : 'auto',
                        backgroundColor: index === 0 ? '#1F5FAD' : 'inherit',
                        paddingLeft: '16px',
                        paddingBottom: '8px',
                        paddingTop: '8px',
                        paddingRight: '0px',
                        fontSize: '12px',
                      }}
                    >
                      {column[columnKey]}
                    </TableCell>
                  );
                })}
                <TableCell
                  sx={{ color: 'white', fontWeight: 'bold' }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column, colIndex) => {
                    const columnKey = Object.keys(column)[0];
                    return (
                      <TableCell
                        key={columnKey}
                        sx={{
                          fontSize: '12px',
                          paddingLeft: '16px',
                          paddingBottom: '20px',
                          paddingTop: '20px',
                          paddingRight: '0px',
                          fontWeight: 'bold',
                          position: colIndex === 0 ? 'sticky' : 'static',
                          left: colIndex === 0 ? 0 : 'auto',
                          backgroundColor: colIndex === 0 ? 'white' : 'inherit',
                          borderBottom: '1px solid #434B5226',
                        }}
                      >
                        {columnKey == 'created_at' || columnKey == 'updated_at' ? formatDate(row[columnKey]) : row[columnKey]}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        onEdit(row)}}
                      className="w-fit p-2 border bottom-[#B3BCCE] rounded-full"
                    >
                      <EditIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-center items-center mt-[30px]">
          {totalPages &&  <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />}
         
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DataTable;
