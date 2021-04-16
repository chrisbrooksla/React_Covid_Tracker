import React, { useState, useEffect } from "react";
// axios allows us to access an external api
import axios from "axios";



export default function Main() {

const [covidData, setCovidData] = useState([])

  // this will send a request to the external Covid Stats API
  // .then is in the case that the request was successful
  // in which case we will return a response(res)
  // res.data is the data within the API
  useEffect(() => {
    axios
      .get("https://api.covid19api.com/summary")
      .then((res) => {
        console.log(res.data);
      //   this gets all of the items named "Countries" in the API (there are 190 of them)
        setCovidData(res.data.Countries)
      })
      // catch is in the case of an error, in which case we will return an error message (err)
      .catch((err) => {
        console.log(err);
      });

      
  }, [covidData]);


  const tableData = covidData.map(object =>{
        return <tr>
              {/* this will get the individual items named "Country" from the API */}
              <td>{object.Country}</td>
              {/* this will display the "TotalConfirmed" property from the individual "Country" */}
              <td>{object.TotalConfirmed}</td>
              {/* since there is no "TotalActive" property in the API, we'll make a calculation
              that subtracts the TotalRecovered from the TotalConfirmed*/}
              <td>{object.TotalConfirmed - object.TotalRecovered}</td>
              {/* displays TotalRecovered */}
              <td>{object.TotalRecovered}</td>
              {/* displays TotalDeaths */}
              <td>{object.TotalDeaths}</td>
             
        </tr>
  })

  return (
    <div>
      <h1>Covid Stats</h1>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <table id="mytable" className="table table-dark">
            <thead>
              <tr>
                <th>Country</th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Recovered</th>
                <th>Deaths</th>
              </tr>
            </thead>

      {/* now let's just display the tableData within the table body... */}
            <tbody>
                  {tableData}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
