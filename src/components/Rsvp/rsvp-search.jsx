/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import './rsvp-search.css';
import RSVPModal from './rsvp';

// import Guests from '../../mock-data/guests';
import { getGuestsByFullName } from '../../utils/guests';
import Spinner from '../common/spinner';


class RSVPSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      matchedGuests: [],
      noResults: false,
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const attr = e.target.name;
    const val = e.target.value;
    this.setState({ [attr]: val });
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ noResults: false, isLoading: true });
    const { firstName, lastName } = this.state;
    try {
      const guests = await getGuestsByFullName(firstName, lastName);
      this.setState({ matchedGuests: guests, isLoading: false });
    } catch (err) {
      this.setState({ noResults: true, isLoading: false });
    }
  }

  guestList() {
    const { matchedGuests, noResults } = this.state;
    if (noResults) {
      return (
        <div className="no-guest-list">No Results</div>
      );
    }
    const list = matchedGuests.map(guest => (
      <li className="guest-list-item" key={guest.ref}>
        <div className="guest-name">{guest.full}</div>
        {
          guest.isReserved
            ? <div className="guest-rsvp-btn"><button type="button" disabled className="btn btn-primary">Replied</button></div>
            : <div className="guest-rsvp-btn"><RSVPModal selectedGuest={guest} /></div>
        }
      </li>
    ));
    return <ul className="guest-list-container">{list}</ul>;
  }


  render() {
    const guests = this.guestList();
    const { firstName, lastName, isLoading } = this.state;
    const spinnerStyle = {
      backgroundColor: 'transparent',
      height: '100%',
      width: '100%',
      alignItems: 'flex-start',
    };
    return (
      <div className="non-splash-container">
        <form className="mb-2" onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First Name</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.onChange}
                placeholder="Enter in your first name"
                autoComplete="off"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={lastName}
                onChange={this.onChange}
                placeholder="Enter in your last name"
                autoComplete="off"
              />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">Search</button>
        </form>
        <div className="search-results-container">
          {isLoading ? <Spinner style={spinnerStyle} /> : ''}
          {guests}
        </div>
      </div>
    );
  }
}

export default RSVPSearch;
