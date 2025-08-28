<script lang="ts">
  import type { PageData } from './$types';
  import { v4 as uuidv4 } from 'uuid';

  export let data: PageData;

  let newDeposition = {
    depositionId: '',
    clientId: '',
    caseId: '',
    deponentName: '',
    depoDate: '',
    editedRuntime: '',
    notes: '',
  };

  let showEditModal = false;
  let editingDeposition: (typeof data.depositions)[number] = {
    depositionId: '',
    clientId: '',
    caseId: '',
    deponentName: '',
    depoDate: '',
    editedRuntime: '',
    notes: '',
    isArchived: false,
  };

  async function createDeposition() {
    const depositionWithId = { ...newDeposition, depositionId: uuidv4() };
    await fetch('/api/depositions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(depositionWithId),
    });
    // TODO: Refresh data after creation
    newDeposition = {
      depositionId: '',
      clientId: '',
      caseId: '',
      deponentName: '',
      depoDate: '',
      editedRuntime: '',
      notes: '',
    };
  }

  function editDeposition(deposition: (typeof data.depositions)[number]) {
    editingDeposition = { ...deposition };
    showEditModal = true;
  }

  async function updateDeposition() {
    await fetch(`/api/depositions/${editingDeposition.depositionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingDeposition),
    });
    // TODO: Refresh data after update
    showEditModal = false;
  }

  async function archiveDeposition(depositionId: string) {
    await fetch(`/api/depositions/${depositionId}`, {
      method: 'DELETE',
    });
    // TODO: Refresh data after archive
  }
</script>

<h1>Depositions</h1>

<form on:submit|preventDefault={createDeposition}>
  <h2>Create New Deposition</h2>
  <div>
    <label for="clientId">Client ID:</label>
    <input type="text" id="clientId" bind:value={newDeposition.clientId} />
  </div>
  <div>
    <label for="caseId">Case ID:</label>
    <input type="text" id="caseId" bind:value={newDeposition.caseId} />
  </div>
  <div>
    <label for="deponentName">Deponent Name:</label>
    <input type="text" id="deponentName" bind:value={newDeposition.deponentName} />
  </div>
  <div>
    <label for="depoDate">Depo Date:</label>
    <input type="date" id="depoDate" bind:value={newDeposition.depoDate} />
  </div>
  <div>
    <label for="editedRuntime">Edited Runtime:</label>
    <input type="text" id="editedRuntime" bind:value={newDeposition.editedRuntime} />
  </div>
  <div>
    <label for="notes">Notes:</label>
    <textarea id="notes" bind:value={newDeposition.notes}></textarea>
  </div>
  <button type="submit">Add Deposition</button>
</form>

<table>
  <thead>
    <tr>
      <th>Deposition ID</th>
      <th>Client ID</th>
      <th>Case ID</th>
      <th>Deponent Name</th>
      <th>Depo Date</th>
      <th>Edited Runtime</th>
      <th>Notes</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each data.depositions as deposition}
      <tr>
        <td>{deposition.depositionId}</td>
        <td>{deposition.clientId}</td>
        <td>{deposition.caseId}</td>
        <td>{deposition.deponentName}</td>
        <td>{deposition.depoDate}</td>
        <td>{deposition.editedRuntime}</td>
        <td>{deposition.notes}</td>
        <td>
          <button on:click={() => editDeposition(deposition)}>Edit</button>
          <button on:click={() => archiveDeposition(deposition.depositionId)}>Archive</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

{#if showEditModal}
  <div class="modal">
    <div class="modal-content">
      <h2>Edit Deposition</h2>
      <div>
        <label for="editClientId">Client ID:</label>
        <input type="text" id="editClientId" bind:value={editingDeposition.clientId} />
      </div>
      <div>
        <label for="editCaseId">Case ID:</label>
        <input type="text" id="editCaseId" bind:value={editingDeposition.caseId} />
      </div>
      <div>
        <label for="editDeponentName">Deponent Name:</label>
        <input type="text" id="editDeponentName" bind:value={editingDeposition.deponentName} />
      </div>
      <div>
        <label for="editDepoDate">Depo Date:</label>
        <input type="date" id="editDepoDate" bind:value={editingDeposition.depoDate} />
      </div>
      <div>
        <label for="editEditedRuntime">Edited Runtime:</label>
        <input type="text" id="editEditedRuntime" bind:value={editingDeposition.editedRuntime} />
      </div>
      <div>
        <label for="editNotes">Notes:</label>
        <textarea id="editNotes" bind:value={editingDeposition.notes}></textarea>
      </div>
      <button on:click={updateDeposition}>Save</button>
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