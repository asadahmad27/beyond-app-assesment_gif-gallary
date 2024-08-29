const fetchGifDetails = async (id) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/${id}?api_key=aQn2gKVZdUXVOuFFNvmQcN9yZscbyJO4`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching GIF details:", error);
  }
};

export { fetchGifDetails };
