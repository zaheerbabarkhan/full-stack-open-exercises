sequenceDiagram
    participant browser
    participant server

    Note right of browser: there is submit handler attached to the for
    Note right of browser: it prevents default behavior (action and method way)
    Note right of browser: it sends the data to the server itself  
    Note right of browser: Contains data as json in the body
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON Body ({"message":"note created"})
    deactivate server

    Note right of browser: the data to the UI is updated in the browser directly without refresh
    