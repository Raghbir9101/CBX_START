// src/components/NewsFeed.js
import React, { useState, useEffect } from 'react';
import { parseStringPromise } from 'xml2js';
import HTTP from "../../HTTP"
import { Box } from '@mui/material';
import { ElementWrapper } from "../Page/Page";

const NewsFeed = ({ provided, item, handleDelete, onChange, data, pageMetaData }) => {
  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState(data?.collapsed);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await HTTP.get("googlenews");
        setArticles(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);



  useEffect(() => {
    onChange({ collapsed });
  }, [collapsed]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching news: {error.message}</p>;
  return (
    <ElementWrapper editable={(pageMetaData.role == "OWNER" || pageMetaData.role == "EDITOR")} handleDelete={handleDelete} provided={provided} item={item} collapsed={data?.collapsed} setCollapsed={setCollapsed}>
      <Box  pl={"20px"} display={"flex"} flexDirection={"column"} gap="10px" overflow={"hidden"} maxHeight={"50vh"} sx={{ overflowY: "scroll" }}>
        {/* <h1>Technology News</h1> */}
        {articles.map((article, index) => {
          return (
            // <li key={index}>
              <h6><a target='_blank' href={article.link[0]}>{article.title[0]}</a></h6>
            // </li>
          )
        })}
        {/* <ul>
          
        </ul> */}
      </Box>
    </ElementWrapper>
  );
};

export default NewsFeed;
