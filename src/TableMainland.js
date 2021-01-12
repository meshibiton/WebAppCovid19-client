import React from "react";
import "./TableMain.css";
import numeral from "numeral";

function TableMainland({ mainlands }) {
  return (
    <div className="table1">
      <table>
        <tbody>
          {mainlands.map((mainland) => (
            <tr key={mainland.region}>
              <td>{mainland.region}</td>
              <td>
                <strong>{numeral(mainland.cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableMainland;
