import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "Id", headerName: "ID" },
  { field: "name", headerName: "Portfolio", width: 300 },
  { field: "balance", headerName: "Balance", width: 600 },
];

const DataTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log(getUserInfo());
    fetch("https://csamapi-continous.azurewebsites.net/portfolio", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  async function getUserInfo() {
    const response = await fetch("/.auth/me");
    const payload = await response.json();
    const { clientPrincipal } = payload;
    return clientPrincipal;
  }

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid rows={tableData} columns={columns} pageSize={12} />
    </div>
  );
};

export default DataTable;
