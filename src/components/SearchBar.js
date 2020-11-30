import React from 'react';


const SearchBar = ({ keyword, setKeyword, handleRefresh }) => {

    return <div className="d-flex p-1">
        <input
            id="search-input"
            className="flex-grow-1 border-bottom searchInput px-1 mt-2"
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Seach user list">
        </input>
        
        <button onClick={handleRefresh} className="btn-sm btn-primary mx-1">Refresh</button>
    </div>

}

export default SearchBar;