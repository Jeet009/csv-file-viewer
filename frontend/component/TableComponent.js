import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Link from "next/link";

function TableComponent() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/list")
      .then((res) => res.json())
      .then((d) => setList(d));
  }, []);
  return (
    <>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: "lightgrey" }}>
          <tr>
            <th>Reg NO</th>
            <th>Name</th>
            <th>Personal Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white" }}>
          {list &&
            list.map((d) => (
              <tr>
                <td>{d["Register Number"]}</td>
                <td>{d.Name}</td>
                <td>{d["Personal Email"]}</td>
                <td>{d.Mobile}</td>
                <td style={{ backgroundColor: "lightyellow" }}>
                  <Link
                    href={{
                      pathname: "/list/" + d["Register Number"],
                      query: { data: JSON.stringify(d) },
                    }}
                  >
                    {" "}
                    <span className="fa fa-arrow-right"></span>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableComponent;
