import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale, faTimes } from '@fortawesome/free-solid-svg-icons';
import usaFlag from '../imgs/flag-of-United-States-of-America.png';

function User(props) {

  let user = props.user;

  return (
    <div className="m-2 mdc-card position-relative col-md-5" id={user.login.uuid} style={{ minWidth: '22rem', width: '22rem' }}>

      <div className="row" >
        <div className=" col-3 align-self-center">
          <img className="rounded-circle"
            src={user.picture.medium && user.picture.medium}
            alt={user.name.first}></img>
        </div>
        <div className="col-8 m-1">
          <p className="font-weight-bold title pt-1 text-nowrap">{`${user.name.first} ${user.name.last} `}
            {
              user.gender === "female"
                ? <FontAwesomeIcon icon={faFemale} color="pink" />
                : <FontAwesomeIcon icon={faMale} color="blue" />
            }
          </p>
          <p className="text-truncate m-0">
            {`Address: ${user.location.street.number} ${user.location.street.name}`}</p>
          <p className="text-nowrap m-0"> {`${user.location.city}, ${user.location.country}. `}
            {user.location.country === "United States" && <img src={usaFlag} alt="USA" width={20}></img>}
          </p>
          <p className="text-wrap m-0"> {user.email}
          </p>
        </div>
      </div>
      <div className="position-absolute delete-btn">
        <button onClick={() => props.deleteHandler(user)}
          className="btn"><FontAwesomeIcon icon={faTimes} color="black" /></button>
      </div>
    </div>
  );
}

export default User;