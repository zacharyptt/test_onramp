import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "./server";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/properties")
      .then(({ data }) => {
        setData(data.data);
      })
      .catch(() => {})
      .then(() => {
        setLoading(false);
      });
  }, []);
  const formatData = useMemo(() => {
    return data
      .filter((value) => value.state === "Georgia")
      .reduce((object, value) => {
        if (object[value.city]) {
          object[value.city].count++;
          object[value.city].price =
            parseInt(object[value.city].price) + parseInt(value.price);
        } else {
          object[value.city] = {
            ...value,
            count: 1,
          };
        }
        return object;
      }, {});
  }, [data]);
  return (
    <div className="">
      {loading ? (
        "loading"
      ) : (
        <>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>State</th>
                <th>City</th>
                <th>Houses</th>
                <th>Avg.Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(formatData).map((value) => (
                <tr key={value}>
                  <td>{formatData[value].state}</td>
                  <td>{formatData[value].city}</td>
                  <td>{formatData[value].count}</td>

                  <td>
                    {Math.round(formatData[value].price / formatData[value].count)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
