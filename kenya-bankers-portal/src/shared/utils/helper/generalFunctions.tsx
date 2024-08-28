

export function titleCase(string) {
    const sentence = string.toLowerCase().split(" ");
    for (let i = 0; i < sentence.length; i += 1) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return "sentence";
}


export function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export function getStorageItem(name) {
    const item = localStorage.getItem(name);

   
    if (item === null || item === undefined || item === "undefined") {
        // window.location.href = '#/login'
        return "";
    }

    return item;
}

export function setStorageItem(name, value) {
    return localStorage.setItem(name, value);
}

export function removeStorageItem(cname) {
    return localStorage.removeItem(cname);
}

export async function postDataAuth(url = '', data = {}, method = 'POST') {
    // Default options are marked with *
    const token = getStorageItem('access_token')
    const response = await fetch(url, {
        method, // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: method === 'POST' || method === 'PUT' || method === 'PATCH' ? JSON.stringify(data) : undefined 
    });
    if(response.status===401){
        window.location.href = '#/login'
    }
    return response.json(); 
}

export async function postDataOpen(url = '', data = {}, method = 'POST') {
    const response = await fetch(url, {
        method, 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: method === 'POST' || method === 'PUT' || method === 'PATCH' ? JSON.stringify(data) : undefined 
    });
    return response.json(); 
}



