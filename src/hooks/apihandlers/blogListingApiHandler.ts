import { authorBlogIds } from "@/data/JsonData";
import type { BlogSummary, ProfileReport, WpPost } from "@/types/api";
import axios from "axios";

export const blogsListing = async (
  setLoadingBlogs: (loading: boolean) => void,
  listOfdata: ProfileReport | null,
  setBlogsList: (blogs: unknown) => void
) => {
  try {
    setLoadingBlogs(true);
    const matchingAuthor = authorBlogIds.find(
      (data) => data.authorName === listOfdata?.domain
    );
    const authorId = matchingAuthor ? matchingAuthor.id : 2;
    const res = await axios.get<WpPost[]>(
      `https://www.blog.cypexsoft.com/wp-json/wp/v2/posts?author=${authorId}&_embed=true`
    );
    setLoadingBlogs(false);
    setBlogsList(res?.data);
  } catch {
    setLoadingBlogs(false);
  }
};

interface LoadBlogsArgs {
  domain: string | undefined;
  /** Accepts a React state setter for either the raw or trimmed blog shape. */
  setBlogs: (blogs: unknown) => void;
  setLoading: (loading: boolean) => void;
  isDetail?: boolean;
}

export const loadBlogs = async ({
  domain,
  setBlogs,
  setLoading,
  isDetail = false,
}: LoadBlogsArgs) => {
  // Find the entry with a matching domain
  setLoading(true);
  const author = authorBlogIds.find((item) => item.authorName === domain);
  if (author) {
    // Fetch the JSON file specified by fileName
    const response = await fetch(author?.fileName);
    const data: WpPost[] = await response.json();
    setLoading(false);
    // Map the data to include only necessary fields
    const filteredData: BlogSummary[] = data?.map((blog) => ({
      id: blog.id,
      title: blog?.title?.rendered,
      date: blog?.date,
      excerpt: blog?.excerpt?.rendered,
      featuredImage: blog?._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
    }));
    setBlogs(isDetail ? data : filteredData);
  } else {
    setLoading(false);
    console.warn(`No blog file found for the domain ${domain}`);
  }
};
