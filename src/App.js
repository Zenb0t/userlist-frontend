import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'simplebar/dist/simplebar.min.css';
import Spinner from 'react-bootstrap/Spinner';
import User from './components/User'
import SimpleBar from 'simplebar-react';
import SearchBar from './components/SearchBar';


function App() {

  const [userList, setUserList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [keyword, setKeyword] = useState("");

  //API address
  const link = 'https://randomuser.me/api/?results=25';

  //Fetch Data from API
  const [isDirty, setDirty] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData(link) {
      setLoading(true);
      try {
        console.debug("Success ");
        const response = await axios.get(link);
        setUserList(response.data.results);
      } catch (error) {
        console.error(`Request Failed: ${error}`);
      } finally {
        setLoading(false);

      }
    };
    fetchData(link);
  }, [isDirty]);

  useEffect(() => {
    const handleSearch = (keyword) => {
      //Split into tokens and ignore whitespace
      let tokens = keyword
        .toLocaleLowerCase()
        .split(" ")
        .filter((token) => token.trim() !== "")

      //check if tokens is not empty
      if (tokens.length) {

        //Define regex term , gim Global Ignore-case Multiline
        let searchTermRegex = new RegExp(tokens.join("|", "gim"));
        let filteredList = userList.filter((user) => {

          //Stringify the user object
          let userString = "";
          let properties = [
            user.name.first,
            user.name.last,
            user.location.country,
            user.location.city,
            user.location.street.number,
            user.location.street.name,
            user.email,
          ];
          properties.forEach(val => userString += `${val} `);
          console.log(tokens);
          console.log(userString.toLocaleLowerCase());

          //Perform match and return 
          return userString.toLocaleLowerCase().match(searchTermRegex);
        });
        setFilteredList(filteredList);
      }
    }
    handleSearch(keyword);
  }, [keyword, userList]);

  //Display list of users
  const displayUserList = () => userList.map(displayUser);

  const displayFilteredList = () => {
    if (filteredList.length === 0) {
      return <p>Sorry, no results =(</p>;
    }
    return filteredList.map(displayUser);
  }

  //Display user component
  function displayUser(user) {
    return (
      <User
        user={user}
        deleteHandler={handleDelete}
        key={user.login.uuid}
      />
    )
  }

  const handleDelete = (e) => {
    //get user uuid
    const userId = e.login.uuid;
    //filter by uuid
    let filteredUsers = userList.filter((user) => {
      return (user.login.uuid !== userId);
    });
    //update list
    setUserList(filteredUsers);
  }

  //reset filtered list and set data as dirty
  const handleRefresh = () => {
    setFilteredList([]);
    setDirty(!isDirty);
  };

  //Render
  return (
    <div className="App ">

      <main className="mdc-card card-position px-1">
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          //handleSearch={handleSearch}
          handleRefresh={handleRefresh}>
        </SearchBar>
        <SimpleBar style={{ maxHeight: 500 }}>
          <div className="list-unstyled container">
            <div className="row justify-content-center">
              {isLoading
                ? <span>Loading... <Spinner
                  as="span"
                  animation="border"
                  role="status">
                </Spinner></span>
                : keyword.length ? displayFilteredList() : displayUserList()}
            </div>
          </div>
        </SimpleBar>

      </main>

    </div >
  );
}
export default App;
