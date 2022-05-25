/* global chrome */
// import bodyParser from "body-parser";
// import { data } from "browserslist";
import React, { Component, useEffect, useState, Fragment } from "react";
import { createApi } from "unsplash-js";

const api = createApi({

  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

const setBackground = (photo) => {
  chrome.storage.sync.set({ manuscript: photo });
  let message = JSON.stringify(["search-term", photo]);
  chrome.runtime.sendMessage(message, (d) => {
    console.log(d.res);
  });
};

const PhotoComp = ({ photo }) => {
  const { user, urls } = photo;

  return (
    <Fragment>
      <img className="img" alt="" src={urls.regular} />
      <a
        rel="noreferrer"
        className="credit"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a>
    </Fragment>
  );
};

const Body = ({ manuscript }) => {
  const [data, setPhotosResponse] = useState(null);

  useEffect(() => {
    api.search
      .getPhotos({ query: manuscript, orientation: "landscape" })
      .then((result) => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [manuscript]);

  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <div className="feed">
        <ul className="columnUl">
          {data.response.results.map((photo) => (
            <li
              key={photo.id}
              className="li"
              onClick={() => {
                setBackground(photo);
              }}
            >
              <PhotoComp photo={photo} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    // let message = getImageObject(this.state.value);
    // chrome.storage.sync.set({ image: message });
    // message = JSON.stringify(["search-term", message]);
    // chrome.runtime.sendMessage(message, (d) => {
    //   console.log(d.res);
    // });
    event.preventDefault();
    // manuscript = this.state.value;
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Splash:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Body manuscript={this.state.value} />
      </>
    );
  }
}

export default App;
