import { BLOG_MODEL, BLOG_RESPONSE } from "@/types/blogs.types";

export const mapBlogToModel = (data: BLOG_RESPONSE): BLOG_MODEL => {
  const model: BLOG_MODEL = {
    blogId: data?._id,
    blogAuthor: {
      authorId: data?.authorId?._id,
      authorImg: data?.authorId?.image,
      authorName: data?.authorId?.name,
    },
    blogBanner: data.bannerUrl,
    blogCreated: data.createdAt,
    blogDescription: data.about,
    blogTitle: data.title,
    blogUpdated: data.updatedAt,
    isRelatedToHowToScreen: data.isRelatedToHowToScreen,
  };
  return model;
};
