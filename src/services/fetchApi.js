export const fetchData = async (url) => {

    try {
        const response = await fetch(url);
        
        if(!response.ok) {
            throw new Error(`Couldn't fetch ${url}, status ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error(`Error : ${error}`);
        throw error;
    }
}




