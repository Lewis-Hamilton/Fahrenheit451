import axios from "axios";
const endpoint = "https://susanwabbajacksucks.herokuapp.com/api";

export interface Video {
  _id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  creation_date: string;
}

export interface VideoResults {
  success: boolean;
  body: Video[];
}

export interface VideoByIDResult {
  success: boolean;
  body: Video;
}

export interface VideoBody {
  title: string;
  description: string;
  thumbnail: string;
  quality: number;
  url: string;
}

export async function getVideos() {
  const url = `${endpoint}/video`;

  try {
    const videoResponse = await axios.get<VideoResults>(url);
    return videoResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function getVideoById(_id: string) {
  const url = `${endpoint}/video/${_id}`;

  try {
    const videoResponse = await axios.get<VideoByIDResult>(url);
    return videoResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function createVideo(payload: VideoBody) {
  const url = `${endpoint}/video/upload/manual`;

  try {
    const videoResponse = await axios.post<VideoByIDResult>(url, payload);
    return videoResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function removeVideo(_id: string) {
  const url = `${endpoint}/video/${_id}`;
  try {
    const videoResponse = await axios.delete(url);
    return videoResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function searchVideo(search: string) {
  const url = `${endpoint}/video/search?search=${search}`;

  try {
    const searchResult = await axios.get<VideoResults>(url);
    return searchResult.data;
  } catch (err) {
    throw err;
  }
}
