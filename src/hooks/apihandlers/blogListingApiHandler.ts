import { authorBlogIds } from '@/data/JsonData';
import axios from 'axios';

export const blogsListing = async (
  setLoadingBlogs,
  listOfdata,
  setBlogsList
) => {
  try {
    setLoadingBlogs(true);
    const matchingAuthor = authorBlogIds.find(
      (data) => data.authorName === listOfdata?.domain
    );
    const authorId = matchingAuthor ? matchingAuthor.id : 2;
    const res = await axios.get(
      `https://www.blog.cypexsoft.com/wp-json/wp/v2/posts?author=${authorId}&_embed=true`
    );
    setLoadingBlogs(false);
    console.log('res', res);
    setBlogsList(res?.data);
  } catch (error) {
    setLoadingBlogs(false);
    console.log('error', error);
  }
};

export const loadBlogs = async ({
  domain,
  setBlogs,
  setLoading,
  isDetail = false,
}) => {
  // Find the entry with a matching domain
  setLoading(true);
  const author = authorBlogIds.find((item) => item.authorName === domain);
  if (author) {
    // Fetch the JSON file specified by fileName
    const response = await fetch(author?.fileName);
    const data = await response.json();
    setLoading(false);
    // Map the data to include only necessary fields
    const filteredData = await data?.map((blog) => ({
      id: blog.id,
      title: blog?.title?.rendered,
      date: blog?.date,
      excerpt: blog?.excerpt?.rendered,
      featuredImage: blog?._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    }));
    setBlogs(isDetail ? data : filteredData);
  } else {
    setLoading(false);
    console.warn(`No blog file found for the domain ${domain}`);
  }
};
