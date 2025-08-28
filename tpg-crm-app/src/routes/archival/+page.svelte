<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>Archived Items</h1>

<h2>Archived Cases</h2>
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
    </tr>
  </thead>
  <tbody>
    {#each data.archivedCases as caseItem}
      <tr>
        <td>{caseItem.caseId}</td>
        <td>{caseItem.caseName}</td>
        <td>{caseItem.caseTypeId}</td>
        <td>{caseItem.endDate}</td>
        <td>{caseItem.firmId}</td>
        <td>{caseItem.courtId}</td>
        <td>{caseItem.techAssignedUserId}</td>
        <td>{caseItem.lastUpdateTimestamp}</td>
      </tr>
    {/each}
  </tbody>
</table>

<h2>Archived Courts</h2>
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
    </tr>
  </thead>
  <tbody>
    {#each data.archivedCourts as court}
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
      </tr>
    {/each}
  </tbody>
</table>

<h2>Archived Depositions</h2>
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
    </tr>
  </thead>
  <tbody>
    {#each data.archivedDepositions as deposition}
      <tr>
        <td>{deposition.depositionId}</td>
        <td>{deposition.clientId}</td>
        <td>{deposition.caseId}</td>
        <td>{deposition.deponentName}</td>
        <td>{deposition.depoDate}</td>
        <td>{deposition.editedRuntime}</td>
        <td>{deposition.notes}</td>
      </tr>
    {/each}
  </tbody>
</table>