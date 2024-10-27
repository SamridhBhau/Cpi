const options = {
	method: 'GET',
	headers: {
        'x-rapidapi-key': 'f2db18b5c5msh2d348b5f8d16abfp138d33jsn51bbe829e867',
		'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com'
	}
};

export async function getActiveStock(){
    const url = 'https://yahoo-finance166.p.rapidapi.com/api/market/get-most-actives?quote_type=EQUITY&offset=0&count=30&region=US&language=en-US';

    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const quotes = result.finance.result[0].quotes.splice(0,10);
        return quotes;
    } catch (error) {
        console.error(error);
    }

}

export async function getDayGainers(){
    const url = 'https://yahoo-finance166.p.rapidapi.com/api/market/get-day-gainers?offset=0&region=US&count=30&language=en-US&quote_type=EQUITY';
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const quotes = result.finance.result[0].quotes.splice(0,10);
        return quotes;
    } catch (error) {
        console.error(error);
    }
}


export async function getDayLosers(){
    const url = 'https://yahoo-finance166.p.rapidapi.com/api/market/get-day-losers?offset=0&language=en-US&region=US&count=30&quote_type=EQUITY';
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const quotes = result.finance.result[0].quotes.splice(0,10);
        return quotes;
    } catch (error) {
        console.error(error);
    }

}
