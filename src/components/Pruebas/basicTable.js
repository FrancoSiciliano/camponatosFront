import { COLUMNS } from "./pruebas1"
import { useTable } from "react-table"
import { useState } from "react";
import { useMemo } from "react";
import axios from "axios";
import { useEffect } from "react";
export const BasicTable = () =>{
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`http://localhost:8080/getCampeonatos`);
            const newData = response.data;
            setData(newData);};
            fetchData();});
    const columns =useMemo(() => COLUMNS, [])
    const data1 =useMemo(() => data, [])
    const tableInstance=useTable({columns,data1})
    const{getTableProps,getTableBodyProps,headerGroups,rows,prepareRow}=tableInstance
    return(
        <table{...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup)=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column)=>(
                                    <th{...column.getHeaderProps}>{column.render('Header')}</th>
                                ) )
                            }
                            <th>
                            </th>
                        </tr>
                    ))
                }
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody{...getTableBodyProps()}>{
                rows.map(row=>
                {
                    prepareRow(row)
                    return(
                        <tr{...row.getRowProps()}>
                        {row.cells.map(cell =>{
                            return <td{...cell.getCellProps}>{cell.render('Cell')}</td>
                        })}
                        
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}