"use client";
import React, { useEffect, useState } from "react";
import TableContainer from "../shared/tables/TableContainer";
import Link from "next/link";
import { PODCAST_MODEL } from "@/types/podcast.types";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import {
  deletePodcastAction,
  podcastSelector,
} from "@/redux/features/adminpanel/podcasts/podcasts.slice";
import { BLOG_MODEL } from "@/types/blogs.types";
import {
  deleteBlogAction,
  updateBlogAction,
} from "@/redux/features/adminpanel/blog/blogs.slice";
import Modal from "../shared/modal/Modal";
import { debounce } from "lodash";

const BlogsTable = ({ blogs }: { blogs: BLOG_MODEL[] }) => {
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentBlog, setCurrentBlog] = useState<BLOG_MODEL | undefined>(
    undefined
  );
  const [blogList, setBlogList] = useState<BLOG_MODEL[]>(blogs);
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentBlog(() => undefined);
  };
  useEffect(() => {
    setBlogList(blogs);
  });
  const { status } = useAppSelector(podcastSelector);
  const deleteBlogHandler = async (id: string) => {
    await dispatch(deleteBlogAction(id));
    handleCloseDeleteModal();
  };
  const handleStatus = debounce(
    (id: string, isRelatedToHowToScreen: boolean) => {
      console.log(id, isRelatedToHowToScreen);
      const updated = blogList.map((property) =>
        property.blogId === id
          ? { ...property, isRelatedToHowToScreen }
          : property
      );
      console.log(updated);

      setBlogList(updated);
      dispatch(updateBlogAction({ id, data: { isRelatedToHowToScreen } }));

      // dispatch(getAllPropertiesAction());
    },
    200
  );
  return (
    <>
      <TableContainer>
        {/* <div className=" h-[78vh] overflow-auto scrollbar-prop  border border-tertiary rounded-lg py-6 px-4 mt-5"> */}
        <table className="w-full ">
          <thead className="w-full">
            <tr className="font-medium text-base leading-7">
              <th className="text-left">Sr. No.</th>
              <th className="text-left">Date</th>
              <th className="text-left">Blog Title</th>
              <th className="text-left">Author Name</th>
              <th></th>
              <th></th>
              <th className="text-left">is How-To-Screen</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {blogList.map((blog, index) => {
              if (blogList.length <= 0) {
                return (
                  <tr>
                    <td>No data found</td>
                  </tr>
                );
              }

              return (
                <tr key={index} className="text-sm leading-5">
                  <td className="text-left tableData">{index + 1}</td>
                  <td className="text-left tableData">
                    {blog.blogCreated.split("T")[0]}
                  </td>
                  <td className="text-left tableData capitalize">
                    {blog.blogTitle}
                  </td>
                  <td className="text-left tableData capitalize">
                    {blog.blogAuthor.authorName || "NA"}
                  </td>
                  <td></td>
                  <td></td>
                  <td className="tableData">
                    <div className="flex justify-center items-center">
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          id="switch"
                          type="checkbox"
                          checked={blog.isRelatedToHowToScreen}
                          className="peer sr-only"
                          onChange={(e) =>
                            handleStatus(blog.blogId, e.target.checked)
                          }
                        />
                        <label htmlFor="switch" className="hidden"></label>
                        <div className="peer h-6 w-9 rounded-full border bg-[#C0CAD5] after:absolute after:left-[2px] after:top-1/2 after:bottom-1/2 after:-translate-y-1/2 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-green peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                      </label>
                    </div>
                  </td>

                  <td></td>

                  <td></td>

                  <td className="font-medium text-base text-right underline text-primary leading-6 capitalize">
                    <Link href={`/adminpanel/blogs/edit/${blog.blogId}`}>
                      Edit
                    </Link>
                  </td>
                  <td className="font-medium text-base  text-center underline text-primary-red leading-6 ">
                    <button
                      type="button"
                      // onClick={() => deleteBlogHandler(blog.blogId)}
                      onClick={() => {
                        setCurrentBlog(() => blog);
                        setIsDeleteModalOpen(true);
                      }}
                      className="underline capitalize"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableContainer>
      {currentBlog && (
        <Modal visible={isDeleteModalOpen} closeModal={handleCloseDeleteModal}>
          <div className="flex flex-col justify-between items-center gap-5 py-10">
            <h5 className="text-3xl ">Are You Sure?</h5>
            <p>
              {"Are you sure you want to delete this blog data permanently?"}
            </p>
            <div className="flex justify-between items-center gap-3 mt-4">
              <button
                type="button"
                className="bg-tertiary text-white text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:px-5 rounded basis-1/3"
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="bg-primary-red text-white text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:px-5 rounded basis-1/3"
                onClick={() => deleteBlogHandler(currentBlog.blogId)}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BlogsTable;
