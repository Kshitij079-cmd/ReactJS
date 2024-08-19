import React, { Component } from "react";
import NestedSection from "./NestedSection";
import PropTypes from "prop-types";

export default class CategorySection extends Component {
  static defaultProps = {
    country: "in",
    category: "business"
  };
  static propTypes = {
    // check here specially
    country: PropTypes.string,
    category: PropTypes.string.isRequired,
  };
  article = [];
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      return array;
    }
  }
  constructor() {
    super();
    console.log(`"I am inside a constructor for Section's section"`);
    this.state = {
      article: this.article,
      totalResults: 0,
      loading: false
    };
  }
  async fetchArticles() {
    const { country, category } = this.props;
    this.setState({
      loading: true,
    });
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=303ef28d80644b3da5d22ec73870c514`;
      let newsData = await fetch(url);
      let parseData = await newsData.json();
    //   let shuffledArticles = this.shuffleArray(parseData.article)
    //   let articlesToDisplay = shuffledArticles.slice(0, Math.floor(Math.random() * 2) + 3); // Random 3-4 articles

      this.setState({
        article: parseData.articles,
   
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
      this.setState({ loading: false });
    }
  }
  async componentDidMount() {
    await this.fetchArticles();
  }
  render() {
    return (
      <div>
       {this.state.article.length > 0 ? (
  this.state.article
    .filter((element) => element.urlToImage)
    .map((element) => {
      return (
        <NestedSection
          key={element.url}
          title={element.title ? element.title.slice(0, 25) : " "}
          imageUrl={element.urlToImage}
          description={element.description ? element.description.slice(0, 50) : " "}
          newsUrl={element.url}
          author={element.author}
          publishedAt={element.publishedAt}
        />
      );
    })
) : (
  <p>No Articles found!!</p>
)}

      </div>
    );
  }
}
