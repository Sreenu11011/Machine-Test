import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Home = (props) => {
  const [countryData, setCountryData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const limit = 10;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      props.history.push("/login");
    }
  }, []);
  useEffect(() => {
    const getCountryData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.eu/rest/v1/all"
        );
        console.log(response.data, "Response");
        setCountryData(response.data);
        setPageData(response.data.slice(offSet, offSet + limit));
      } catch (err) {
        console.log(err);
      }
    };
    getCountryData();
  }, []);
  useEffect(() => {
    setPageData(countryData.slice(offSet, offSet + limit));
  }, [offSet, countryData]);
  const handlePageClick = (pageno) => {
    console.log(pageno);
    setOffSet(pageno.selected * limit);
  };
  return (
    <div>
      <NavBar />

      <div className="countries">
        {pageData.map((data) => (
          <div className="country">
            <p>Country Name : {data.name}</p>
            <p> Capital Name : {data.capital}</p>
            <p> Population : {data.population}</p>
            <p> Region:{data.region}</p>
            <p>Sub Region:{data.subregion}</p>
          </div>
        ))}
      </div>
      <div id="react-paginate">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default Home;
