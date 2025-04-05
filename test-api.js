const API_KEY = 'c2b43e73063d6f9f5174a3c9a4e5616f';

async function testAPI() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&page=1`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      return;
    }

    const data = await response.json();
    console.log('API Response:', {
      status: response.status,
      totalResults: data.results?.length || 0,
      firstResult: data.results?.[0]?.title || 'No results'
    });
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

testAPI(); 