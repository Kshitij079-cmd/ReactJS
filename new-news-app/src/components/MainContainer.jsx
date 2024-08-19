import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import NewsItems from "./NewsItems";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./loading";

export default function MainArea({ country = "us",
  category = "general",
  pagesize = 10,
  searchQuery = "",
  setProgress,
  apiKey }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchArticles = useCallback(async (page) => {
    setProgress(10);
    setLoading(true);

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pagesize}`;
    if (searchQuery) {
      url = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pagesize}&apiKey=${apiKey}`;
    }

    let response = await fetch(url);
    setProgress(30);
    let parseData = await response.json();
    setProgress(70);
    setArticles((prevArticles) => (page === 1 ? parseData.articles : prevArticles.concat(parseData.articles)));//add new articles in previous articles
    setTotalResults(parseData.totalResults);
    setLoading(false);
    setProgress(100);
  }, [apiKey, category, country, pagesize, searchQuery, setProgress]);

  useEffect(() => {//componentdidMount wala function
    document.title = `Quick News - ${capitalizeFirstLetter(category)}`;
    fetchArticles(1);
  }, [category, country, searchQuery, fetchArticles]);

  const fetchMoreData = async () => {
    setPage((prevPage) => prevPage + 1);
    fetchArticles(page + 1);
  };

  return (
    <div className="container text-center">
      <h1 className="m-3 text-center">Top {capitalizeFirstLetter(category)} News</h1>
      <div className="container scroller-container">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h4>Loading<Loading /></h4>}
        >
          <div className="container main-area">
            {articles.length > 0 ? (
              articles
                .filter((element) => element.urlToImage)
                .map((element) => (
                  <NewsItems
                    key={element.url}
                    title={element.title ? element.title.slice(0, 34) : " "}
                    imageUrl={element.urlToImage}
                    description={
                      element.description
                        ? element.description.slice(0, 86)
                        : " "
                    }
                    newsUrl={element.url}
                    publishedAt={element.publishedAt}
                    author={element.author}
                  />
                ))
            ) : (
              <p>No news articles available.</p> // Fallback message
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};



MainArea.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  searchQuery: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired
};


