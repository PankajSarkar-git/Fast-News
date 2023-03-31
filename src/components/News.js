import React,{useEffect, useState} from 'react';

import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
 



const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const updateNews = async () => {
    props.setProgress(0)
    props.setProgress(40)
    props.setProgress(80)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b9aa9ff9eff04e53926e01943e60e104&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let pasdData = await data.json();
    setArticles(pasdData.articles);
    setTotalResults(pasdData.totalResults);
    setLoading(false);
    props.setProgress(100)
    document.title = `FastNews - ${capitalizeFirstLetter(props.category)}`
  }
  useEffect(() => {
    updateNews();
  }, []);
  

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b9aa9ff9eff04e53926e01943e60e104&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url); 
    let pasdData = await data.json();
    setArticles(articles.concat(pasdData.articles));
    setTotalResults(pasdData.totalResults);
  };
  return (
    <>
      <div className="container my-3">

        <h1 className='text-center' style={{marginTop:"90px"}}> <b>FastNews</b> -  Top {capitalizeFirstLetter(props.category)} Headlines </h1>

        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}>
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title} describtion={element.description} imgUrl={element.urlToImage} newsUrl={element.url} aouthor={element.aouthor} publishedAt={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

      </div>
    </>
  )

}

News.defaultProps = {
  pageSize: 6,
  country: "in",
  category: "general",
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
};

export default News

