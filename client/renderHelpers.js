import { addNewPlayer, fetchAllPlayers, fetchSinglePlayer, removePlayer } from './ajaxHelpers';

const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

export const renderAllPlayers = (playerList) => {
  // First check if we have any data before trying to render it!
  if (!playerList || !playerList.length) {
    playerContainer.innerHTML = '<h3>No players to display!</h3>';
    return;
  }

  // Loop through the list of players, and construct some HTML to display each one
  let playerContainerHTML = '';
  for (let i = 0; i < playerList.length; i++) {
    const pup = playerList[i];
    let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <button class = "remove-info" data-id=${pup.id}>Remove</button>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
      </div>
    `;
    playerContainerHTML += pupHTML;
  }

  // After looping, fill the `playerContainer` div with the HTML we constructed above
  playerContainer.innerHTML = playerContainerHTML;

  // Now that the HTML for all players has been added to the DOM,
  // we want to grab those "See details" buttons on each player
  // and attach a click handler to each one
  let detailButtons = [...document.getElementsByClassName('detail-button')];
  for (let i = 0; i < detailButtons.length; i++) {
    const button = detailButtons[i];
    button.addEventListener('click', async () => {
      fetchSinglePlayer(button.dataset.id)
      console.log(button.dataset.id);
    });
  }

  let deleteBtn = document.getElementsByClassName("remove-info");
  for (let j = 0; j < deleteBtn.length; j++) {
    const deleteButton = deleteBtn[j];
    deleteButton.addEventListener("click", async () => {
      // console.log(deleteButton.dataset.id);
    removePlayer(deleteButton.dataset.id);
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
    });
  }
};

export const renderSinglePlayer = (playerObj) => {
  if (!playerObj || !playerObj.id) {
    playerContainer.innerHTML = "<h3>Couldn't find data for this player!</h3>";
    return;
  }

  let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img src="${playerObj.imageUrl}" alt="photo of ${
    playerObj.name
  } the puppy">
      <button id="see-all">Back to all players</button>
    </div>
  `;

  playerContainer.innerHTML = pupHTML;

  // below is the code of back to all players
  // let backPlayers = document.getElementById("see-all");
  // backPlayers.addEventListener("click", () => {
  //   const players = await fetchAllPlayers();
  //   renderAllPlayers(players);

  document.getElementById("see-all").addEventListener('click', async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
      })
    };
    

export const renderNewPlayerForm = () => {
  let formHTML = `
    <form>
      <label for="name">Name:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
  newPlayerFormContainer.innerHTML = formHTML;

  let form = document.querySelector('#new-player-form > form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    let playerData = {
      name: form.elements.name.value, //  name: document.querySelector('input[name=name]').value,
      breed: form.elements.breed.value // breed: document.querySelector('input[name=breed]').value
    }
    addNewPlayer(playerData);

  const players = await fetchAllPlayers();
  renderAllPlayers(players);
  
  document.querySelector("input[name=name]").value = "";
  document.querySelector("input[name=breed]").value = "";
  
  });
 
};
