import React from "react"



function announcementForm()
{

    function eraseText() {
        document.getElementById("littlerbox").value = "";
    }


    render()
    {
        return(
            <div>
            <head>
            <title>SLO Botanical Garden</title>
            <link rel = "stylesheet" href = "announcementForm.css" />

        </head>
        <body>
            <header id = "top">
                <img id = "slobg" src = "images/SLOBG_logo.png"/>
            </header>
            <main>
                <div id = "lilbox">
                    <h3 id = "formtitle">New Message: </h3>
                    <form action="/form/submit" method="GET">
                        <textarea id = "littlerbox" rows="3" cols="60" name="text" placeholder="New Message:"></textarea>
                        <br/>
                        <div id = "lilbuttons">
                            <input id = "cancel" type="button" onclick = {eraseText()} value="Cancel"/>
                            <input id = "publish" type="submit" value="Publish"/>
                        </div>
                    </form>
                </div>
            </main>
        </body>
        </div>
        );
    }

}

export default announcementForm;