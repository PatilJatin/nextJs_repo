"use client";
import PodcastCart from "@/components/podcasts/PodcastCart";
import GlobalSearch from "@/components/reusable/GlobalSearch";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import {
  getAllPodcastListByCategoryAction,
  getAllPodcastsAction,
  getPodcastAction,
} from "@/redux/features/adminpanel/podcasts/podcasts.slice";
import { useAppDispatch } from "@/redux/features/hook";
import { getAllPodcasts } from "@/services/podcasts/podcastService";
import axios from "axios";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

type Podcast = {
  _id: string;
  name: string;
  category: string;
  about: string;
  bannerUrl: string;
  audioTitle: string;
  audioUrl: string;
  spotifyPodcastLink?: string;
  appleMusicPodcastLink?: string;
  googleMusicPodcastLink?: string;
  stitcherPodcastLink?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const PodcastDetailedPage = ({ id }: { id: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [speed, setSpeed] = useState(1.0);
  const [progress, setProgress] = useState(0);
  const [podcast, setPodcast] = useState<Podcast>();
  const [isOpenPlayingTab, setIsOpenPlayingTab] = useState<Boolean>(true);
  const [isSoundConVisible, setIsSoundConVisible] = useState<Boolean>(false);
  const [podcastList, setPodcastList] = useState<Podcast[]>([]);
  const [playedPodcast, setPlayedPodcast] = useState<Podcast>();
  const [relatedPodcastList, setRelatedPodcastList] = useState<Podcast[]>([]);
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrPage] = useState<number>(1);
  const [searchName, setSearchName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [playingIndex, setPlayingIndex] = useState<number>(-1);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch the action and wait for its completion
        // const response = await dispatch(getPodcastAction(id));
        await dispatch(getPodcastAction(id)).then(async (res: any) => {
          console.log(res.payload.data);
          if (!res.payload.data) {
            router.push("/not-found"); // Replace '/not-found' with the actual path to your not-found page
          }
          setPodcast(res.payload.data);
          setPlayedPodcast(res.payload.data);
          const podcastList = await dispatch(
            getAllPodcastListByCategoryAction(res.payload.data.category)
          );
          console.log(podcastList.payload.data);
          setRelatedPodcastList(() => podcastList.payload.data.podcasts);
        });

        const podcastListWithPagination = await axios.get(
          `/api/v1/podcasts/paginate?name=${searchName}&page=${currentPage}&limit=10`
        );
        console.log(podcastListWithPagination.data.data);
        setCurrPage(() => podcastListWithPagination.data.data.currentPage);
        setTotalPage(() => podcastListWithPagination.data.data.totalPages);
        setPodcastList(() => podcastListWithPagination.data.data.podcasts);
      } catch (error) {
        console.error("Error fetching podcast data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const updateProgress = () => {
        const duration = audioElement.duration;
        const currentTime = audioElement.currentTime;

        const progressPercent = (currentTime / duration) * 100 || 0;
        console.log(progressPercent);
        setProgress(progressPercent);
      };

      audioElement.addEventListener("timeupdate", updateProgress);

      return () => {
        audioElement.removeEventListener("timeupdate", updateProgress);
      };
    }
  });
  useEffect(() => {
    console.log(searchName);

    const fetchData = async () => {
      setLoading(() => true);

      const podcastListWithPagination = await axios.get(
        `/api/v1/podcasts/paginate?name=${searchName}&page=${currentPage}&limit=10`
      );
      console.log(podcastListWithPagination.data.data);
      setCurrPage(() => podcastListWithPagination.data.data.currentPage);
      setTotalPage(() => podcastListWithPagination.data.data.totalPages);
      setPodcastList(() => podcastListWithPagination.data.data.podcasts);
      setLoading(() => false);
    };

    fetchData();
  }, [currentPage, searchName]);

  useEffect(() => {
    if (playingIndex > -1 || playingIndex < 11) {
      setPlayedPodcast(podcastList[playingIndex]);
    }
  }, [playingIndex]);
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const handleSpeedControlClick = () => {
    const speeds = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0];
    const currentIndex = speeds.indexOf(speed);
    const newIndex = currentIndex === speeds.length - 1 ? 0 : currentIndex + 1;
    handleSpeedChange(speeds[newIndex]);
  };
  console.log(playingIndex, podcastList.length);

  return (
    <section className="section-padding">
      <GlobalSearch />
      {podcast && playedPodcast && (
        <div className="flex flex-col  justify-start gap-8">
          <h3 className="text-2xl font-medium leading-8 capitalize text-primary">
            {podcast.name}
          </h3>
          <div className="w-full h-[269px] lg:h-[512px] object-cover">
            <Image
              src={podcast.bannerUrl || "/assets/temp/blogImg.svg"}
              alt="banner"
              width={358}
              height={269}
              className="w-full h-full "
            />
          </div>

          <div>
            <div className="md:hidden  bg-tertiary bg-opacity-40 w-full flex justify-between items-center">
              <button
                type="button"
                className={`text-black text-sm leading-5 font-medium border border-transparent py-3 text-center w-[49.5%] ${
                  isOpenPlayingTab && "border-b-black border-b-2"
                } `}
                onClick={() => setIsOpenPlayingTab(() => !isOpenPlayingTab)}
              >
                Now Playing
              </button>
              <button
                type="button"
                className={`text-black text-sm leading-5 font-medium border border-transparent py-3 text-center w-[49.5%] ${
                  !isOpenPlayingTab && "border-b-black border-b-2"
                } `}
                onClick={() => setIsOpenPlayingTab(() => !isOpenPlayingTab)}
              >
                More Episodes
              </button>
            </div>
            <div>
              {isOpenPlayingTab ? (
                <div className="w-full md:flex mt-5 md:mt-8 lg::mt-12 justify-center md:px-14 md:gap-5 lg:gap-10 lg:px-24">
                  <div className="w-full md:w-[50%] lg:w-[60%] ">
                    <div className="flex justify-start items-center gap-4 lg:gap-10">
                      <div className="w-[90px] h-[90px] ">
                        <Image
                          src={
                            playedPodcast.bannerUrl ||
                            "/assets/temp/blogImg.svg"
                          }
                          alt="img"
                          width={90}
                          height={90}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex  flex-col gap-1 justify-start items-start ">
                        <p className="text-xs md:text-xl leading-5 md:leading-7 font-normal">
                          Condo kharido Podcast
                        </p>
                        <h4 className="capitalize text-primary text-base md:text-2xl leading-6 md:leading-9 line-clamp-3">
                          {playedPodcast.name}
                        </h4>
                      </div>
                    </div>
                    <hr className="bg-tertiary border-[1px] border-tertiary w-full my-8" />
                    <p className="line-clamp-6 text-sm md:text-base leading-6 md:leading-6 font-normal text-gray-600 tracking capitalize">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: playedPodcast.about.replace(
                            /<img[^>]*>|<video[^>]*>/g,
                            ""
                          ),
                        }}
                      />
                    </p>
                    <div className=" pt-32 ">
                      <audio ref={audioRef} src={playedPodcast.audioUrl} />
                      <div className="controller flex justify-between items-center  ">
                        <div
                          className="speed-controller bg-tertiary bg-opacity-50 w-8 h-8  lg:w-12 lg:h-12 flex justify-center items-center rounded-full"
                          onClick={handleSpeedControlClick}
                        >
                          {speed}x
                        </div>
                        <div className="song-control flex justify-between items-center gap-6">
                          <button
                            type="button"
                            onClick={() => {
                              setPlayingIndex((prev) =>
                                prev === 0 ? prev : prev - 1
                              );
                              handlePlayPause();
                            }}
                            disabled={playingIndex === 0}
                            className="bg-tertiary bg-opacity-50 w-8 h-8  lg:w-12 lg:h-12 flex justify-center items-center rounded-full"
                          >
                            <Image
                              src={"/audio/controller/skip-forward.svg"}
                              alt="img"
                              className="rotate-180"
                              width={20}
                              height={20}
                            />
                          </button>
                          <div
                            onClick={handlePlayPause}
                            className="bg-tertiary bg-opacity-50 w-[60px] lg:w-20 lg:h-20 m h-[60px] flex justify-center items-center rounded-full"
                          >
                            <Image
                              src={
                                isPlaying
                                  ? "/audio/controller/pause.png"
                                  : "/audio/controller/play.svg"
                              }
                              alt="img"
                              className=""
                              width={45}
                              height={45}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setPlayingIndex((prev) =>
                                prev === 10 ? prev : prev + 1
                              );
                              handlePlayPause();
                            }}
                            disabled={
                              playingIndex ===
                              Math.min(10, podcastList.length - 1)
                            }
                            className="bg-tertiary bg-opacity-50 w-8 h-8 lg:w-12 lg:h-12 flex justify-center items-center rounded-full"
                          >
                            <Image
                              src={"/audio/controller/skip-forward.svg"}
                              alt="img"
                              className=""
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                        <div
                          onClick={() =>
                            setIsSoundConVisible(() => !isSoundConVisible)
                          }
                          className="relative bg-tertiary bg-opacity-50 w-8 h-8 lg:w-12 lg:h-12 flex justify-center items-center rounded-full"
                        >
                          <Image
                            src={"/audio/controller/volume.svg"}
                            alt="img"
                            className=""
                            width={20}
                            height={20}
                          />
                          {isSoundConVisible && (
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={volume}
                              onChange={handleVolumeChange}
                              className="-rotate-90 absolute -top-[227%]"
                            />
                          )}
                        </div>
                      </div>
                      <div className="w-full h-2 bg-tertiary bg-opacity-50 mt-8 rounded">
                        <div
                          className="h-full bg-black"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:w-[40%] md:block h-[470px] md:h-[480px] lg:h-[550px] overflow-auto scrollbar-thin ">
                    <div className="bg-tertiary overflow-clip bg-opacity-20 h-[90%] py-5 px-8">
                      <div className=" p-3 bg-white flex justify-start items-center gap-2 border-[1px] border-tertiary rounded my-6 lg:my-10 relative">
                        <div className="w-5 h-5 object-cover ">
                          <Image
                            src={"/assets/other/search-icon.svg"}
                            alt="search-icon"
                            width={20}
                            height={20}
                            className="w-full h-full"
                          />
                        </div>
                        <input
                          type="text"
                          name="podcast-search"
                          id=""
                          placeholder="Search"
                          className="outline-none w-full placeholder:text-sm placeholder:leading-5 placeholder:font-normal md:placeholder:text-base"
                          value={searchName}
                          onChange={(e) => {
                            e.preventDefault();
                            setCurrPage(1);
                            setSearchName(() => e.target.value);
                          }}
                        />
                      </div>
                      {podcastList.map((podcast, index) => (
                        <div
                          onClick={() => {
                            setPlayedPodcast(podcast);
                            setPlayingIndex(index);
                            handlePlayPause();
                          }}
                          className={`text-black cursor-pointer text-base leading-7 line-clamp-2  my-3 flex justify-start item-center gap-4 ${
                            playingIndex === index && " bg-primary text-white "
                          } hover:bg-primary hover:text-white`}
                        >
                          <p>{index + 1}</p>
                          <p>{podcast.name}</p>
                        </div>
                      ))}
                    </div>
                    <div className="h-[10%] bg-tertiary bg-opacity-70 text-black font-medium text-base leading-6 flex justify-center items-center gap-2">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() =>
                          setCurrPage((prev) => (prev === 1 ? prev : prev - 1))
                        }
                        className="w-8 h-8 rounded-full  border-black border-[0.5px] flex justify-center items-center "
                      >
                        &lt;
                      </button>
                      <div>
                        {currentPage.toString()} of {totalPage.toString()}
                      </div>

                      <button
                        type="button"
                        disabled={currentPage === totalPage}
                        onClick={() =>
                          setCurrPage((prev) =>
                            prev === totalPage ? prev : prev + 1
                          )
                        }
                        className="w-8 h-8 rounded-full  border-black border-[0.5px] flex justify-center items-center "
                      >
                        <p>&gt;</p>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" md:hidden h-[500px] md:h-[550px] lg:w-[600px] bg-tertiary bg-opacity-50 ">
                  <div className="bg-tertiary overflow-clip bg-opacity-30 h-[90%] py-5 px-8">
                    <div className=" p-3 bg-white flex justify-start items-center gap-2 border-[1px] border-tertiary rounded my-6 lg:my-10 relative">
                      <div className="w-5 h-5 object-cover ">
                        <Image
                          src={"/assets/other/search-icon.svg"}
                          alt="search-icon"
                          width={20}
                          height={20}
                          className="w-full h-full"
                        />
                      </div>
                      <input
                        type="text"
                        name="podcast-search"
                        id=""
                        placeholder="Search"
                        className="outline-none w-full placeholder:text-sm placeholder:leading-5 placeholder:font-normal md:placeholder:text-base"
                        value={searchName}
                        onChange={(e) => {
                          e.preventDefault();
                          setCurrPage(1);
                          setSearchName(() => e.target.value);
                        }}
                      />
                    </div>
                    {podcastList.map((podcast, index) => (
                      <div
                        onClick={() => setPlayedPodcast(podcast)}
                        className={`text-black cursor-pointer text-base leading-7 line-clamp-2  my-3 flex justify-start item-center gap-4 ${
                          playingIndex === index && " bg-primary text-white "
                        } hover:bg-primary hover:text-white`}
                      >
                        <p>{index + 1}</p>
                        <p>{podcast.name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-[10%] text-black font-medium text-base leading-6 flex justify-center items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrPage((prev) => (prev === 1 ? prev : prev - 1))
                      }
                      className="w-5 h-5 rounded-full  border-black border-[0.5px] flex justify-center items-center"
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </button>
                    <div>
                      {currentPage.toString()} of {totalPage.toString()}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrPage((prev) =>
                          prev === totalPage ? prev : prev + 1
                        )
                      }
                      disabled={currentPage === totalPage}
                      className="w-5 h-5 rounded-full  border-black border-[0.5px] flex justify-center items-center"
                    >
                      <p>&gt;</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-2 w-full flex flex-col justify-start items-start gap-3 sm:gap-4 md:gap-8 lg:gap-10 md:px-10 lg:px-16">
            {(playedPodcast.appleMusicPodcastLink ||
              playedPodcast.googleMusicPodcastLink ||
              playedPodcast.spotifyPodcastLink ||
              playedPodcast.stitcherPodcastLink) && (
              <h4 className="font-medium text-xl sm:text-2xl  md:text-3xl lg:text-[32px] leading-8 text-primary">
                Subscribe and Listen to the Condo kharido Podcast
              </h4>
            )}
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-10 gap-6">
              {playedPodcast.appleMusicPodcastLink && (
                <Link
                  href={playedPodcast.appleMusicPodcastLink}
                  // href="/"
                  className="podcast-link "
                  target="_blank"
                >
                  <Image
                    src={"/assets/podcast/applePodcast.svg"}
                    alt="img"
                    width={247}
                    height={60}
                  />
                </Link>
              )}
              {playedPodcast.googleMusicPodcastLink && (
                <Link
                  href={playedPodcast.googleMusicPodcastLink}
                  // href="/"
                  target="_blank"
                  className="podcast-link"
                >
                  <Image
                    src={"/assets/podcast/gogoolePlay.svg"}
                    alt="img"
                    width={247}
                    height={60}
                    className=""
                  />
                </Link>
              )}
              {playedPodcast.spotifyPodcastLink && (
                <Link
                  target="_blank"
                  href={playedPodcast.spotifyPodcastLink}
                  className="podcast-link "
                >
                  <Image
                    src={"/assets/podcast/spotify.svg"}
                    alt="img"
                    width={247}
                    height={60}
                  />
                </Link>
              )}
              {playedPodcast.stitcherPodcastLink && (
                <Link
                  target="_blank"
                  href={playedPodcast.stitcherPodcastLink}
                  className="podcast-link"
                >
                  <Image
                    src={"/assets/podcast/stitcher.svg"}
                    alt="img"
                    width={247}
                    height={60}
                  />
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-start gap-3 lg:gap-10 mt-24">
            <h4 className="text-xl text-primary lg:text-[32px]  leading-7 lg:leading-10 font-medium">
              Read about this Episode
            </h4>
            <p className="text-sm lg:text-xl leading-5  lg:leading-7 font-normal text-gray-600 tracking-wide">
              <span dangerouslySetInnerHTML={{ __html: podcast.about }} />
            </p>
          </div>
        </div>
      )}
      {loading && (
        <div className="w-full flex justify-center items-center">
          <PrimarySpinner />
        </div>
      )}
      {!loading && (
        <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-[120px] flex flex-col justify-start gap-3 lg:gap-10 items-start">
          <h4 className="text-xl   text-primary lg:text-[32px]  leading-7 lg:leading-10 font-medium">
            Related Podcasts
          </h4>
          <div className=" hidden grid-container">
            {relatedPodcastList.slice(0, 4).map((podcast, index) => (
              <PodcastCart
                podcastDescription={podcast.about}
                podcastId={podcast._id}
                podcastImg={podcast.bannerUrl}
                key={index}
              />
            ))}
          </div>
          <div className="w-full md:hidden relative flex flex-col justify-center items-center gap-2">
            <div className="w-full transition-all	delay-200 ease-in-out duration-500">
              {relatedPodcastList.length >= 3 && (
                <PodcastCart
                  podcastDescription={relatedPodcastList[sliderIndex].about}
                  podcastId={relatedPodcastList[sliderIndex]._id}
                  podcastImg={relatedPodcastList[sliderIndex].bannerUrl}
                />
              )}
            </div>
            <div className="flex self-start justify-start items-center gap-3 p-2">
              <div
                className={`${
                  sliderIndex === 0 ? " bg-primary " : " bg-tertiary "
                }  rounded-full w-2 h-2`}
                onClick={() => setSliderIndex(0)}
              />
              <div
                className={`${
                  sliderIndex === 1 ? " bg-primary " : " bg-tertiary "
                }  rounded-full w-2 h-2`}
                onClick={() => setSliderIndex(1)}
              />
              <div
                className={`${
                  sliderIndex === 2 ? " bg-primary " : " bg-tertiary "
                }  rounded-full w-2 h-2`}
                onClick={() => setSliderIndex(2)}
              />
              <div
                className={`${
                  sliderIndex === 3 ? " bg-primary " : " bg-tertiary "
                }  rounded-full w-2 h-2`}
                onClick={() => setSliderIndex(3)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PodcastDetailedPage;
