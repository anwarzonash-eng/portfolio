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
    console.log('blogs', res?.data);
    setLoadingBlogs(false);
    setBlogsList(res?.data);
  } catch (error) {
    setLoadingBlogs(false);
    console.log('error', error);
  }
};
