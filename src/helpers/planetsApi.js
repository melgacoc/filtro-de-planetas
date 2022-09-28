const fetchPlanetsApi = async () => {
  const fetchApi = await fetch('https://swapi.dev/api/planets');
  const response = await fetchApi.json();
  const data = (response.results).filter((planet) => delete planet.residents);
  return data;
};

export default fetchPlanetsApi;
