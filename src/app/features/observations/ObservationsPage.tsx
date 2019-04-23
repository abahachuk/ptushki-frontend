import * as React from "react";
import useMap from "react-use/esm/useMap";
import { Dictionary, repeat } from "ramda";
import { BaseTable } from "../../../components/table/BaseTable";
import { labels } from "../../../config/i18n/labels";
import { BaseCheckbox } from "../../../components/checkbox/BaseCheckbox";

export const ObservationsPage = () => {
  const [checkedRows, checkedRowsActions] = useMap<Dictionary<boolean>>();

  return (
    <div style={{ backgroundColor: "white" }} className="p-5">
      <BaseTable
        data={[
          { id: "1234", firstName: "first", lastName: "value" },
          { id: "12345", firstName: "second", lastName: "value2" }
        ]}
        columns={[
          {
            Header: null,
            id: "checked",
            fixed: "left",
            Cell: p => (
              <BaseCheckbox
                checked={checkedRows[p.row.id]}
                onChange={e =>
                  checkedRowsActions.set(p.row.id, e.target.checked)
                }
                className="p-1"
              />
            )
          },
          {
            Header: "#",
            id: "id",
            accessor: r => r.id,
            fixed: "left"
          },
          {
            Header: labels.species,
            id: "firstName",
            accessor: r => r.firstName,
            fixed: "left"
          },
          ...repeat(
            {
              Header: "Колонка",
              accessor: "lastName"
            },
            10
          )
        ]}
      />
    </div>
  );
};
