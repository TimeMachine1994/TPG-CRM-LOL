<script lang="ts">
  import type { PageData } from './$types';
  import { v4 as uuidv4 } from 'uuid';

  export let data: PageData;

  let newCourt = {
    courtId: '',
    courtName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    generalPhone: '',
    techSupportPhone: '',
    courtWebsiteLink: '',
    techSupportWebsiteLink: '',
    parkingInfoLink: '',
    googleMapsLink: '',
    distanceFromOfficeMi: 0,
    projectorScreen: false,
    docCamera: false,
  };

  let showEditModal = false;
  let editingCourt: (typeof data.courts)[number] = {
    courtId: '',
    courtName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    generalPhone: '',
    techSupportPhone: '',
    courtWebsiteLink: '',
    techSupportWebsiteLink: '',
    parkingInfoLink: '',
    googleMapsLink: '',
    distanceFromOfficeMi: 0,
    projectorScreen: false,
    docCamera: false,
    isArchived: false,
  };

  async function createCourt() {
    const courtWithId = { ...newCourt, courtId: uuidv4() };
    await fetch('/api/courts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courtWithId),
    });
    // TODO: Refresh data after creation
    newCourt = {
      courtId: '',
      courtName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      generalPhone: '',
      techSupportPhone: '',
      courtWebsiteLink: '',
      techSupportWebsiteLink: '',
      parkingInfoLink: '',
      googleMapsLink: '',
      distanceFromOfficeMi: 0,
      projectorScreen: false,
      docCamera: false,
    };
  }

  function editCourt(court: (typeof data.courts)[number]) {
    editingCourt = { ...court };
    showEditModal = true;
  }

  async function updateCourt() {
    await fetch(`/api/courts/${editingCourt.courtId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingCourt),
    });
    // TODO: Refresh data after update
    showEditModal = false;
  }

  async function archiveCourt(courtId: string) {
    await fetch(`/api/courts/${courtId}`, {
      method: 'DELETE',
    });
    // TODO: Refresh data after archive
  }
</script>

<h1>Courts</h1>

<form on:submit|preventDefault={createCourt}>
  <h2>Create New Court</h2>
  <div>
    <label for="courtName">Court Name:</label>
    <input type="text" id="courtName" bind:value={newCourt.courtName} required />
  </div>
  <div>
    <label for="address">Address:</label>
    <input type="text" id="address" bind:value={newCourt.address} />
  </div>
  <div>
    <label for="city">City:</label>
    <input type="text" id="city" bind:value={newCourt.city} />
  </div>
  <div>
    <label for="state">State:</label>
    <input type="text" id="state" bind:value={newCourt.state} />
  </div>
  <div>
    <label for="zipCode">ZIP Code:</label>
    <input type="text" id="zipCode" bind:value={newCourt.zipCode} />
  </div>
  <div>
    <label for="generalPhone">General Phone:</label>
    <input type="text" id="generalPhone" bind:value={newCourt.generalPhone} />
  </div>
  <div>
    <label for="techSupportPhone">Tech Support Phone:</label>
    <input type="text" id="techSupportPhone" bind:value={newCourt.techSupportPhone} />
  </div>
  <div>
    <label for="courtWebsiteLink">Court Website Link:</label>
    <input type="text" id="courtWebsiteLink" bind:value={newCourt.courtWebsiteLink} />
  </div>
  <div>
    <label for="techSupportWebsiteLink">Tech Support Website Link:</label>
    <input type="text" id="techSupportWebsiteLink" bind:value={newCourt.techSupportWebsiteLink} />
  </div>
  <div>
    <label for="parkingInfoLink">Parking Info Link:</label>
    <input type="text" id="parkingInfoLink" bind:value={newCourt.parkingInfoLink} />
  </div>
  <div>
    <label for="googleMapsLink">Google Maps Link:</label>
    <input type="text" id="googleMapsLink" bind:value={newCourt.googleMapsLink} />
  </div>
  <div>
    <label for="distanceFromOfficeMi">Distance From Office (mi):</label>
    <input type="number" id="distanceFromOfficeMi" bind:value={newCourt.distanceFromOfficeMi} />
  </div>
  <div>
    <label for="projectorScreen">Projector Screen:</label>
    <input type="checkbox" id="projectorScreen" bind:checked={newCourt.projectorScreen} />
  </div>
  <div>
    <label for="docCamera">Doc Camera:</label>
    <input type="checkbox" id="docCamera" bind:checked={newCourt.docCamera} />
  </div>
  <button type="submit">Add Court</button>
</form>

<form on:submit|preventDefault={createCourt}>
  <h2>Create New Court</h2>
  <div>
    <label for="courtName">Court Name:</label>
    <input type="text" id="courtName" bind:value={newCourt.courtName} required />
  </div>
  <div>
    <label for="address">Address:</label>
    <input type="text" id="address" bind:value={newCourt.address} />
  </div>
  <div>
    <label for="city">City:</label>
    <input type="text" id="city" bind:value={newCourt.city} />
  </div>
  <div>
    <label for="state">State:</label>
    <input type="text" id="state" bind:value={newCourt.state} />
  </div>
  <div>
    <label for="zipCode">ZIP Code:</label>
    <input type="text" id="zipCode" bind:value={newCourt.zipCode} />
  </div>
  <div>
    <label for="generalPhone">General Phone:</label>
    <input type="text" id="generalPhone" bind:value={newCourt.generalPhone} />
  </div>
  <div>
    <label for="techSupportPhone">Tech Support Phone:</label>
    <input type="text" id="techSupportPhone" bind:value={newCourt.techSupportPhone} />
  </div>
  <div>
    <label for="courtWebsiteLink">Court Website Link:</label>
    <input type="text" id="courtWebsiteLink" bind:value={newCourt.courtWebsiteLink} />
  </div>
  <div>
    <label for="techSupportWebsiteLink">Tech Support Website Link:</label>
    <input type="text" id="techSupportWebsiteLink" bind:value={newCourt.techSupportWebsiteLink} />
  </div>
  <div>
    <label for="parkingInfoLink">Parking Info Link:</label>
    <input type="text" id="parkingInfoLink" bind:value={newCourt.parkingInfoLink} />
  </div>
  <div>
    <label for="googleMapsLink">Google Maps Link:</label>
    <input type="text" id="googleMapsLink" bind:value={newCourt.googleMapsLink} />
  </div>
  <div>
    <label for="distanceFromOfficeMi">Distance From Office (mi):</label>
    <input type="number" id="distanceFromOfficeMi" bind:value={newCourt.distanceFromOfficeMi} />
  </div>
  <div>
    <label for="projectorScreen">Projector Screen:</label>
    <input type="checkbox" id="projectorScreen" bind:checked={newCourt.projectorScreen} />
  </div>
  <div>
    <label for="docCamera">Doc Camera:</label>
    <input type="checkbox" id="docCamera" bind:checked={newCourt.docCamera} />
  </div>
  <button type="submit">Add Court</button>
</form>

<table>
  <thead>
    <tr>
      <th>Court ID</th>
      <th>Court Name</th>
      <th>Address</th>
      <th>City/State/ZIP</th>
      <th>General Phone</th>
      <th>Tech Support</th>
      <th>Court Website</th>
      <th>Tech Support Website</th>
      <th>Parking Info</th>
      <th>Google Maps</th>
      <th>Distance From Office (mi)</th>
      <th>Projector Screen</th>
      <th>Doc Camera</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each data.courts as court}
      <tr>
        <td>{court.courtId}</td>
        <td>{court.courtName}</td>
        <td>{court.address}</td>
        <td>{court.city}, {court.state} {court.zipCode}</td>
        <td>{court.generalPhone}</td>
        <td>{court.techSupportPhone}</td>
        <td><a href={court.courtWebsiteLink} target="_blank">Link</a></td>
        <td><a href={court.techSupportWebsiteLink} target="_blank">Link</a></td>
        <td><a href={court.parkingInfoLink} target="_blank">Link</a></td>
        <td><a href={court.googleMapsLink} target="_blank">Link</a></td>
        <td>{court.distanceFromOfficeMi}</td>
        <td>{court.projectorScreen ? 'Yes' : 'No'}</td>
        <td>{court.docCamera ? 'Yes' : 'No'}</td>
        <td>
          <button on:click={() => editCourt(court)}>Edit</button>
          <button on:click={() => archiveCourt(court.courtId)}>Archive</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

{#if showEditModal}
  <div class="modal">
    <div class="modal-content">
      <h2>Edit Court</h2>
      <div>
        <label for="editCourtName">Court Name:</label>
        <input type="text" id="editCourtName" bind:value={editingCourt.courtName} />
      </div>
      <div>
        <label for="editAddress">Address:</label>
        <input type="text" id="editAddress" bind:value={editingCourt.address} />
      </div>
      <div>
        <label for="editCity">City:</label>
        <input type="text" id="editCity" bind:value={editingCourt.city} />
      </div>
      <div>
        <label for="editState">State:</label>
        <input type="text" id="editState" bind:value={editingCourt.state} />
      </div>
      <div>
        <label for="editZipCode">ZIP Code:</label>
        <input type="text" id="editZipCode" bind:value={editingCourt.zipCode} />
      </div>
      <div>
        <label for="editGeneralPhone">General Phone:</label>
        <input type="text" id="editGeneralPhone" bind:value={editingCourt.generalPhone} />
      </div>
      <div>
        <label for="editTechSupportPhone">Tech Support Phone:</label>
        <input type="text" id="editTechSupportPhone" bind:value={editingCourt.techSupportPhone} />
      </div>
      <div>
        <label for="editCourtWebsiteLink">Court Website Link:</label>
        <input type="text" id="editCourtWebsiteLink" bind:value={editingCourt.courtWebsiteLink} />
      </div>
      <div>
        <label for="editTechSupportWebsiteLink">Tech Support Website Link:</label>
        <input type="text" id="editTechSupportWebsiteLink" bind:value={editingCourt.techSupportWebsiteLink} />
      </div>
      <div>
        <label for="editParkingInfoLink">Parking Info Link:</label>
        <input type="text" id="editParkingInfoLink" bind:value={editingCourt.parkingInfoLink} />
      </div>
      <div>
        <label for="editGoogleMapsLink">Google Maps Link:</label>
        <input type="text" id="editGoogleMapsLink" bind:value={editingCourt.googleMapsLink} />
      </div>
      <div>
        <label for="editDistanceFromOfficeMi">Distance From Office (mi):</label>
        <input type="number" id="editDistanceFromOfficeMi" bind:value={editingCourt.distanceFromOfficeMi} />
      </div>
      <div>
        <label for="editProjectorScreen">Projector Screen:</label>
        <input type="checkbox" id="editProjectorScreen" bind:checked={editingCourt.projectorScreen} />
      </div>
      <div>
        <label for="editDocCamera">Doc Camera:</label>
        <input type="checkbox" id="editDocCamera" bind:checked={editingCourt.docCamera} />
      </div>
      <button on:click={updateCourt}>Save</button>
      <button on:click={() => (showEditModal = false)}>Cancel</button>
    </div>
  </div>
{/if}

{#if showEditModal}
  <div class="modal">
    <div class="modal-content">
      <h2>Edit Court</h2>
      <div>
        <label for="editCourtName">Court Name:</label>
        <input type="text" id="editCourtName" bind:value={editingCourt.courtName} />
      </div>
      <div>
        <label for="editAddress">Address:</label>
        <input type="text" id="editAddress" bind:value={editingCourt.address} />
      </div>
      <div>
        <label for="editCity">City:</label>
        <input type="text" id="editCity" bind:value={editingCourt.city} />
      </div>
      <div>
        <label for="editState">State:</label>
        <input type="text" id="editState" bind:value={editingCourt.state} />
      </div>
      <div>
        <label for="editZipCode">ZIP Code:</label>
        <input type="text" id="editZipCode" bind:value={editingCourt.zipCode} />
      </div>
      <div>
        <label for="editGeneralPhone">General Phone:</label>
        <input type="text" id="editGeneralPhone" bind:value={editingCourt.generalPhone} />
      </div>
      <div>
        <label for="editTechSupportPhone">Tech Support Phone:</label>
        <input type="text" id="editTechSupportPhone" bind:value={editingCourt.techSupportPhone} />
      </div>
      <div>
        <label for="editCourtWebsiteLink">Court Website Link:</label>
        <input type="text" id="editCourtWebsiteLink" bind:value={editingCourt.courtWebsiteLink} />
      </div>
      <div>
        <label for="editTechSupportWebsiteLink">Tech Support Website Link:</label>
        <input type="text" id="editTechSupportWebsiteLink" bind:value={editingCourt.techSupportWebsiteLink} />
      </div>
      <div>
        <label for="editParkingInfoLink">Parking Info Link:</label>
        <input type="text" id="editParkingInfoLink" bind:value={editingCourt.parkingInfoLink} />
      </div>
      <div>
        <label for="editGoogleMapsLink">Google Maps Link:</label>
        <input type="text" id="editGoogleMapsLink" bind:value={editingCourt.googleMapsLink} />
      </div>
      <div>
        <label for="editDistanceFromOfficeMi">Distance From Office (mi):</label>
        <input type="number" id="editDistanceFromOfficeMi" bind:value={editingCourt.distanceFromOfficeMi} />
      </div>
      <div>
        <label for="editProjectorScreen">Projector Screen:</label>
        <input type="checkbox" id="editProjectorScreen" bind:checked={editingCourt.projectorScreen} />
      </div>
      <div>
        <label for="editDocCamera">Doc Camera:</label>
        <input type="checkbox" id="editDocCamera" bind:checked={editingCourt.docCamera} />
      </div>
      <button on:click={updateCourt}>Save</button>
      <button on:click={() => (showEditModal = false)}>Cancel</button>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    animation-name: animatetop;
    animation-duration: 0.4s;
  }

  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
</style>