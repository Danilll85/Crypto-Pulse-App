export const fetchKrakenToken = async () => {
  const res = await fetch("http://localhost:4000/api/token");
  const data = await res.json();
  console.log(data);
  
  return data.token;
};
