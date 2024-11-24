import React, { useEffect } from "react";

const Chatbot = () => {
    useEffect(() => {
        // Set up Chatbase configuration
        window.embeddedChatbotConfig = {
            chatbotId: "ciy_pxLgYonhwQpaBgejD",
            domain: "www.chatbase.co"
        };

        // Load the Chatbase script
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.setAttribute("chatbotId", "ciy_pxLgYonhwQpaBgejD");
        script.setAttribute("domain", "www.chatbase.co");
        script.defer = true;
        document.body.appendChild(script);

        // Cleanup the script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id="chatbot-container">
            {/*<iframe
            src="https://www.chatbase.co/chatbot-iframe/ciy_pxLgYonhwQpaBgejD"
            width="100%"
            style={{ height: "10%", minHeight: "500px" }} // Use an object for the `style` prop
     
            title="Chatbot"
            ></iframe>*/}

        </div>
    );
};

export default Chatbot;





