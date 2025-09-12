const baseUrl = process.env.NEXT_PUBLIC_DEV_APIS_URI;

const apiKeys = {
  // projects
  projects: `${baseUrl}/project`, // get or create
};

export default apiKeys;
