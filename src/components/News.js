import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ setProgress, country, category, pageSize }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    setProgress(0);
    setProgress(40);
    setProgress(80);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b9aa9ff9eff04e53926e01943e60e104&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let pasdData = await data.json();
    setArticles(pasdData.articles);
    setTotalResults(pasdData.totalResults);
    setLoading(false);
    setProgress(100);
    document.title = `FastNews - ${capitalizeFirstLetter(category)}`;
  };
  useEffect(() => {
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b9aa9ff9eff04e53926e01943e60e104&page=${
      page + 1
    }&pageSize=${pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let pasdData = await data.json();
    setArticles(articles.concat(pasdData.articles));
    setTotalResults(pasdData.totalResults);
  };
  return (
    <>
      <div className="container my-3">
        <h1 className="text-center" style={{ marginTop: "90px" }}>
          {" "}
          <b>FastNews</b> - Top {capitalizeFirstLetter(category)} Headlines{" "}
        </h1>

        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      describtion={element.description}
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      aouthor={element.aouthor}
                      publishedAt={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default News;
