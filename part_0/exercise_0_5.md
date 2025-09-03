sequenceDiagram
    participant browser
    participant server


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    Note right of browser: This time we have spa.js
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server

    
    server-->>browser: the JavaScript file
    Note right of browser: This file attach submit handler event to the form
    Note right of browser: Form will not submit data in traditional way
    deactivate server

    Note right of browser: The file have the code code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server
