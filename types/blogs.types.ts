export type BLOG_RESPONSE = {
  _id: string;
  title: string;
  authorId: {
    _id: string;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  about: string;
  bannerUrl: string;
  createdAt: string;
  updatedAt: string;
  isRelatedToHowToScreen: boolean;
  __v: number;
};

export type BLOG_MODEL = {
  blogId: string;
  blogTitle: string;
  blogAuthor: {
    authorId: string;
    authorName: string;
    authorImg: string;
  };
  blogDescription: string;
  blogBanner: string;
  blogCreated: string;
  blogUpdated: string;
  isRelatedToHowToScreen: boolean;
};

export type BLOG_FORM_FIELDS = {
  title: string;
  authorId: {
    value: string;
    label: string;
  };
  description: string;
  bannerImgInput: string;
  bannerUrl: string;
  isRelatedToHowToScreen: boolean;
};
