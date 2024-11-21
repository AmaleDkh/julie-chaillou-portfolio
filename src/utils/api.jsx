const apiUrl = process.env.REACT_APP_API_URL;

// Fetch all posts tags
export const fetchTags = async () => {
  try {
    const response = await fetch(`${apiUrl}/tags`);

    if (!response.ok) {
      throw new Error("Erreur lors de la requête fetch");
    }

    const tags = await response.json();
    return tags;
  } catch (error) {
    console.error("Erreur lors de la récupération des tags : ", error);
    throw error;
  }
};

// Fetch posts with a tag id
export const fetchPostsByTagId = async (tagId) => {
  try {
    if (tagId) {
      const response = await fetch(`${apiUrl}/posts?tags=${tagId}`);

      if (!response.ok) {
        throw new Error("Erreur lors de la requête fetch");
      }

      const posts = await response.json();
      return posts;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des posts : ", error);
    throw error;
  }
};

// Fetch a post with an id
export const fetchPostById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${id}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la requête fetch");
    }

    const post = await response.json();
    return post;
  } catch (error) {
    console.error("Erreur lors de la récupération du post : ", error);
    throw error;
  }
};
