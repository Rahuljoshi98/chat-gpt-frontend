const baseUrl = process.env.NEXT_PUBLIC_DEV_APIS_URI;

const apiKeys = {
  // projects
  projects: `${baseUrl}/project`,

  // chats
  chats: `${baseUrl}/chat`,
};

export default apiKeys;
