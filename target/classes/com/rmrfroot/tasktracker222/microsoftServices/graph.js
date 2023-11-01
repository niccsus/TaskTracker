// Create an authentication provider
const authProvider = {
    getAccessToken: async () => {
        // Call getToken in auth.js
        return await getToken();
    }
};
// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });
//Get user info from Graph
async function getUser() {
    ensureScope('user.read');
    return await graphClient
        .api('/me')
        .select('displayName')
        .get();
}

async function getEvents(){
    ensureScope('user.read');
    let events = await graphClient
        .api('/me/events')
    	.header('Prefer','outlook.timezone="Pacific Standard Time"')
    	.select('id,subject,body,bodyPreview,organizer,attendees,start,end,location')
    	.get();
}