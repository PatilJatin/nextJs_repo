import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { Blog } from "@/models/blog-model";
import { Podcast } from "@/models/podcast-model";
import { Project } from "@/models/project-model";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";

connectDb();

export const GET = asyncHandler(async function (request: NextRequest) {
  //   console.log("inside global-search");
  const searchParams: any = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const query = searchParams.get("query");
  console.log("query8**********************8", query);
  let blogFilter = {};
  let podcastFilter = {};
  let projectFilter = {};

  if (query) {
    // Strip extra double quotes from the query string
    const sanitizedQuery = query.replace(/^"|"$/g, "");

    // Case-insensitive search for blog title
    console.log("inside ");
    blogFilter = {
      title: { $regex: new RegExp(sanitizedQuery, "i") },
      //   title: sanitizedQuery,
    };

    // Case-insensitive search for podcast name
    podcastFilter = {
      name: { $regex: new RegExp(sanitizedQuery, "i") },
    };

    // Case-insensitive search for project name and developer name
    projectFilter = {
      $or: [
        { name: { $regex: new RegExp(sanitizedQuery, "i") } },
        { developerName: { $regex: new RegExp(sanitizedQuery, "i") } },
        { neighborhood: { $regex: new RegExp(sanitizedQuery, "i") } },
        // { name: sanitizedQuery },
        // { developerName: sanitizedQuery },
      ],
    };
  }
  //   console.log(blogFilter);
  //   console.log(blogFilter);

  //     // Case-insensitive search for project name and developer name

  const blogDocs = await Blog.find(blogFilter);
  // .limit(limit)
  // .skip((page - 1) * limit);
  const podcastDocs = await Podcast.find(podcastFilter);
  // .limit(limit)
  // .skip((page - 1) * limit);
  const projectDocs = await Project.find(projectFilter);
  // .limit(limit)
  // .skip((page - 1) * limit);

  const totalBlogDocs = await Blog.countDocuments(blogFilter);
  const totalPodcastDocs = await Podcast.countDocuments(podcastFilter);
  const totalProjectDocs = await Project.countDocuments(projectFilter);

  const totalPagesBlog = Math.ceil(totalBlogDocs / limit);
  const totalPagesPodcast = Math.ceil(totalPodcastDocs / limit);
  const totalPagesProject = Math.ceil(totalProjectDocs / limit);

  const response = {
    blogs: {
      count: totalBlogDocs,
      data: blogDocs,
      totalPages: totalPagesBlog,
    },
    podcasts: {
      count: totalPodcastDocs,
      data: podcastDocs,
      totalPages: totalPagesPodcast,
    },
    projects: {
      count: totalProjectDocs,
      data: projectDocs,
      totalPages: totalPagesProject,
    },
    currentPage: page,
  };

  return ApiResponse(
    "Search results fetched successfully",
    StatusCodes.OK,
    response
  );
});
