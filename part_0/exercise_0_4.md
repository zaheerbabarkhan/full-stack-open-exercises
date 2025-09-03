sequenceDiagram
    participant browser
    participant server

    Note right of browser: Contains text of the note as formdata 
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server

    Note left of server: Server will add the note to the notes list
    Note left of server: Server will return redirect response
    server-->>browser: Redirect Response (Location: https://studies.cs.helsinki.fi/exampleapp/notes)
    deactivate server

    Note right of browser: the browser will redirect to the page and will fetch linked(stylesheets, scripts)
    Note right of browser: the browser will execute the scripts fetched
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes