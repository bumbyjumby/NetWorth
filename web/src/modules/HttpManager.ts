export default class HttpManager{
    async get(url: string) {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

    
    async post(url:string, payload: any) {
        const response = await fetch(url, {
                                method: "POST", 
                                headers: {
                                    "Content-Type": "application/json",                                   
                                },
                                body: JSON.stringify(payload), // body data type must match "Content-Type" header
                            })
        const json = await response.json();
        return json;
    }
}

/*return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json());*/