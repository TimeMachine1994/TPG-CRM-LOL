<script lang="ts">
  import type { PageData } from './$types';
  import { v4 as uuidv4 } from 'uuid';

  export let data: PageData;

  let newCase = {
    caseId: '',
    caseName: '',
    caseTypeId: '',
    startDate: '',
    endDate: '',
    firmId: '',
    courtId: '',
    techAssignedUserId: '',
  };

  let showEditModal = false;
  let editingCase: (typeof data.cases)[number] = {
    caseId: '',
    caseName: '',
    caseTypeId: '',
    startDate: '',
    endDate: '',
    firmId: '',
    courtId: '',
    techAssignedUserId: '',
    lastUpdateTimestamp: '',
    isArchived: false,
  };

  async function createCase() {
    const caseWithId = { ...newCase, caseId: uuidv4() };
    await fetch('/api/cases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(caseWithId),
    });
    // TODO: Refresh data after creation
    newCase = {
      caseId: '',
      caseName: '',
      caseTypeId: '',
      startDate: '',
      endDate: '',
      firmId: '',
      courtId: '',
      techAssignedUserId: '',
    };
  }

  function editCase(caseItem: (typeof data.cases)[number]) {
    editingCase = { ...caseItem };
    showEditModal = true;
  }

  async function updateCase() {
    await fetch(`/api/cases/${editingCase.caseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingCase),
    });
    // TODO: Refresh data after update
    showEditModal = false;
  }

  async function archiveCase(caseId: string) {
    await fetch(`/api/cases/${caseId}`, {
      method: 'DELETE',
    });
    // TODO: Refresh data after archive
  }
</script>

<h1>Cases</h1>

<form on:submit|preventDefault={createCase}>
  <h2>Create New Case</h2>
  <div>
    <label for="caseName">Case Name:</label>
    <input type="text" id="caseName" bind:value={newCase.caseName} required />
  </div>
  <div>
    <label for="caseTypeId">Case Type ID:</label>
    <input type="text" id="caseTypeId" bind:value={newCase.caseTypeId} />
  </div>
  <div>
    <label for="startDate">Start Date:</label>
    <input type="date" id="startDate" bind:value={newCase.startDate} />
  </div>
  <div>
    <label for="endDate">End Date:</label>
    <input type="date" id="endDate" bind:value={newCase.endDate} />
  </div>
  <div>
    <label for="firmId">Firm ID:</label>
    <input type="text" id="firmId" bind:value={newCase.firmId} />
  </div>
  <div>
    <label for="courtId">Court ID:</label>
    <input type="text" id="courtId" bind:value={newCase.courtId} />
  </div>
  <div>
    <label for="techAssignedUserId">Tech Assigned User ID:</label>
    <input type="text" id="techAssignedUserId" bind:value={newCase.techAssignedUserId} />
  </div>
  <button type="submit">Add Case</button>
</form>

<table>
  <thead>
    <tr>
      <th>Case ID</th>
      <th>Case Name</th>
      <th>Type</th>
      <th>End Date/Time</th>
      <th>Firm / Attorney</th>
      <th>Court ID</th>
      <th>Tech Assigned</th>
      <th>Last Update</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each data.cases as caseItem}
      <tr>
        <td>{caseItem.caseId}</td>
        <td>{caseItem.caseName}</td>
        <td>{caseItem.caseTypeId}</td>
        <td>{caseItem.endDate}</td>
        <td>{caseItem.firmId}</td>
        <td>{caseItem.courtId}</td>
        <td>{caseItem.techAssignedUserId}</td>
        <td>{caseItem.lastUpdateTimestamp}</td>
        <td>
          <button>Edit</button>
          <button>Archive</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>