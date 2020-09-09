import { API, Auth } from 'aws-amplify';

// This function is called immediately when the page loads, before populating the table with this data
export async function getUserItems() {
    // Get logged-in user's data
    const userData = await Auth.currentAuthenticatedUser()

    // Fetch all the items in the database associated with the logged-in user
    const data = await API.get(
      'mainAPI', 
      '/items/' + userData.username, 
      {}
    )

    return data
}

// This function is called when a user clicks the button 'Add'
export async function addItem(itemName) {
        // Get logged-in user's data
    const userData = await Auth.currentAuthenticatedUser()

    // Create a new item in the database
    const response = await API.post(
        'mainAPI', 
        '/items', 
        {
          body: {
              timestamp: new Date().getTime(),
              user: userData.username,
              itemName
          }
        }
    )

    return response
}

// This function is called when a user deletes an existing item in the table
export async function deleteItem(timestamp) {
    // Get logged-in user's data
    const userData = await Auth.currentAuthenticatedUser()

    // Delete the specified item from the database
    const response = await API.del(
      'mainAPI', 
      '/items/object/' + userData.username + '/' + timestamp, 
      {}
    )

    return response
}
