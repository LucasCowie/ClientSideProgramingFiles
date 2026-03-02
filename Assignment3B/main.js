// IIFE
(() => {

	//Choose an array method to implement for each of the incomplete functions.
	//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

	//Remember, you can chain together array function calls to attain your goals.
	// Ex: array.filter().map()

	//Get data for the TV Show "Friends"
	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then((response) => response.json())
    .then((json) => {

        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        // where the character Gunther is mentioned in the episode summary.
        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);

        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        console.log(getFemaleCastMembers(json));

        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.
        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        console.log(getEpisodeTitles(json, 'Ursula'));

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.
        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        console.log(getCastMembersOver55(json));

        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6
        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name
        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`)
        console.log(getFirstFourSeasons(json));

        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
        console.log('--------------------------------');
        console.log(`Tally of episodes by season:`);
        console.log(getEpisodeTallyBySeason(json));

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        //the name and summary of the episodes.
        console.log('--------------------------------');
        console.log('Capitalized Friends');
        console.log(capitalizeTheFriends(json));

    })

	// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
	// (or a combination) ON THE PROVIDED JSON DATA

	// Define the required ten functions below this line...
    //loops throught json to find Gunther in summarey
   const getGuntherCount = (json) =>
		json._embedded.episodes
			.filter(e => e.summary && e.summary.includes('Gunther')).length;
    //Counts runtime of all episode
	const getTotalRuntimeMinutes = (json) =>
		json._embedded.episodes
			.reduce((total, e) => total + (e.runtime || 0), 0);
    // counts episodes aired in certain year
	const getTotalEpisodesInYear = (json, year) =>
		json._embedded.episodes
			.filter(e => e.airdate && e.airdate.startsWith(year)).length;
    //Get names of all female cast members
	const getFemaleCastMembers = (json) =>
		json._embedded.cast
			.filter(c => c.person && c.person.gender === 'Female')
			.map(c => c.person.name);
    //get episode with the title of the keyword
	const getEpisodeTitles = (json, search) =>
		json._embedded.episodes
			.filter(e => e.summary && e.summary.includes(search))
			.map(e => e.name);
    // get cast member who are over 55 in the current year
	const getCastMembersOver55 = (json) => {
		const currentYear = new Date().getFullYear();
		return json._embedded.cast
			.filter(c => c.person && c.person.birthday)
			.filter(c => currentYear - new Date(c.person.birthday).getFullYear() > 55)
			.map(c => c.person.name);
	};
    //get runtime of all episode that are not in season 6
	const getTotalRuntimeMinutesExcludingSeasonSix = (json) =>
		json._embedded.episodes
			.filter(e => e.season !== 6)
			.reduce((total, e) => total + (e.runtime || 0), 0);
    // Return the name and season of the first 4 seasons
	const getFirstFourSeasons = (json) =>
		json._embedded.episodes
			.filter(e => e.season <= 4)
			.map(e => ({ season: e.season, name: e.name }));
    // make and object of the seaons and how many episode are in them
	const getEpisodeTallyBySeason = (json) =>
		json._embedded.episodes
			.reduce((acc, e) => {
				const key = `Season ${e.season}`;
				acc[key] = (acc[key] || 0) + 1;
				return acc;
			}, {});
    // capitalize the first letter of the regex search in the names and summarey sections
	const capitalizeTheFriends = (json) => {
		const namesRegex = /(joey|chandler|monica|rachel|phoebe|ross)/gi;
		return json._embedded.episodes.map(e => ({
			...e,
			name: e.name ? e.name.replace(namesRegex, m => m.toUpperCase()) : e.name,
			summary: e.summary ? e.summary.replace(namesRegex, m => m.toUpperCase()) : e.summary
		}));
	};
})();

