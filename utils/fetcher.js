import axios from "axios";

const fetcher = async (url, token) => {
  const res = await axios.get(url, { headers: { token } });
  return res.data;
};

export default fetcher;
