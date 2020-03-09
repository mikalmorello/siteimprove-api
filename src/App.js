import React from 'react';
import logo from './logo.svg';
import './App.css';

	var request = require('request');
	var api_user = process.env.REACT_APP_API_USER;
	var api_key = process.env.REACT_APP_API_KEY;

	const fetchSites= async (setSiteList) => {
	//	const api_user = "mikal_morello@harvard.edu",
	//				api_key = "7d67c8da52f2fc944971bbabf9ac6a27",
	//				url = "https://api.siteimprove.com/v2/sites?page=1&page_size=600"
	//  const fetchUrl=`https://api.siteimprove.com/v2/sites?page=1&page_size=600`
	//  const response = await fetch(fetchUrl);
	//  const json = await response.json();
	//  return json;
		var url = "https://api.siteimprove.com/v2/sites?page=1&page_size=25"
		var response = request.get({
			url: url,
			auth: {
				user: api_user,
				pass: api_key    
			}, 
			json: true
		},function (error, data) {
			setSiteList(data.body.items);
		});
	};

	const fetchSiteData = async (siteList) => {
		console.log(siteList);
		siteList.map((site, index) => {
//			console.log(site);
				var url = `https://api.siteimprove.com/v2/sites/${site.id}/policy/policies/19535982458/content`;
				var response = request.get({
					url: url,
					auth: {
						user: api_user,
						pass: api_key    
					}, 
					json: true
				},function (error, data) {
					console.log('site pages equal ' + site.pages);
					console.log(data);
					console.log(site.site_name);
					console.log(data.body.total_items);
				});
		});
	}

function App() {
	
  const [siteList, setSiteList] = React.useState();
	
	React.useEffect(() => {
    if(!siteList){
      (async () => {
        const incomingData = await fetchSites(setSiteList);
      })();
    }
  }, []);	
	
	
	React.useEffect(() => {
    if(siteList){
      (async () => {
        const incomingData = await fetchSiteData(siteList);
      })();
    }
  }, [siteList]);	
	

	
	
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reactz
        </a>
      </header>
    </div>
  );
}

export default App;
