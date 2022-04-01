import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
// import SearchIcon from "@mui/icons-material/Search";
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";
// import { CloseIcon, SearchIcon } from '@mui/icons-material';

// import CloseIcon from "@mui/icons-material/icons/Close";
// import SearchIcon from "@mui/material/icons/Search";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';


import airports from "../map/airports2";

const SearchBar = ({ ...props }) => {
  const { placeholder, select } = props;

  const [chosen, setChosen] = useState("");
  const [query, setQuery] = useState("");
  const [filteredAirports, setFilteredAirports] = useState([]);

  const [suggested, setSuggested] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setQuery(searchWord);

    if (searchWord === searchWord.toUpperCase() && searchWord.length === 3) {
      var iata_codeFound = airports.filter((airport) => {
        return airport.iata_code.includes(searchWord);
      });
      if (iata_codeFound.length > 0) {
        setSuggested(iata_codeFound);
      } else {
        setSuggested([]);
      }
    } else {
      setSuggested([]);
    }
    // console.log("suggested:", suggested);

    const newFilter = airports.filter((airport) => {
      var nameAndCode = airport.name + airport.iata_code;
      // console.log("nameAndCode",nameAndCode)
      return nameAndCode.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredAirports([]);
    } else {
      setFilteredAirports(newFilter);
    }
  };

  const clickItem = (code, name) => {
    select(code);
    setFilteredAirports([]);
    var presentChosen = `(${code}), ${name}`;

    setQuery(presentChosen);
    setChosen(code)
    
  };
  const clearInput = () => {
    setFilteredAirports([]);
    setQuery("");
    select("")
    setChosen("")
  };
  
  return (
    <div>
      <div className="searchInputs">
        <input
          className="searchInput"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleFilter}
        />
          {(chosen === "") ? (
        <SearchIcon/>
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput}/>
          )}
      </div>
      {filteredAirports.length !== 0 && (
        <div className="searchResult">
          {suggested.length > 0 &&
            suggested.map((airport, index) => {
              return (
                <>
                  <div className="searchResultItem suggested" key={index}>
                    <div
                      onClick={() => {
                        clickItem(airport.iata_code, airport.name);
                      }}
                    >
                      {airport.name} <b>{airport.iata_code}</b>
                      <p className="suggestedText">suggested</p>
                    </div>
                  </div>
                </>
              );
            })}

          {filteredAirports.slice(0, 15).map((airport, index) => {
            return (
              <div className="searchResultItem" key={`${index}-suggested`}>
                <div
                  onClick={() => {
                    clickItem(airport.iata_code, airport.name);
                  }}
                >
                  {airport.name} <b>{airport.iata_code}</b>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
