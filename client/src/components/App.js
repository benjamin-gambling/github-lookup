import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "../styles/App.css";

const GET_USER = gql`
  query User($filter: String!) {
    search(filter: $filter) {
      id
      login
      avatar_url
      name
    }
  }
`;

const User = ({ user: { login, avatar_url, name } }) => {
  return (
    <div className="Card">
      <div>
        <img alt="avatar" className="Card--avatar" src={avatar_url} />
      </div>
      <h1 className="Card--name">{name}</h1>
      <a href={`https://github.com/${login}`} className="Card--link">
        {`https://github.com/${login}`}
      </a>
    </div>
  );
};

const Search = (filter) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: filter,
  });
  if (error) return <h1>Something went wrong!</h1>;
  if (loading) return <h1>Loading...</h1>;
  return <User user={data.search} />;
};

class App extends Component {
  state = {
    filter: "",
    search: "",
  };

  render() {
    return (
      <main className="App">
        <h1>Github | LookUp</h1>
        {this.state.search !== "" ? (
          <Search filter={this.state.search} />
        ) : (
          <h4>Look up a Guthub user by searching their username below!</h4>
        )}
        <input
          type="text"
          placeholder="Search Github User..."
          onChange={(e) => this.setState({ filter: e.target.value })}
        />
        <button
          onClick={() => {
            this.setState({ search: this.state.filter });
          }}
        >
          SEARCH
        </button>
      </main>
    );
  }
}

export default App;
