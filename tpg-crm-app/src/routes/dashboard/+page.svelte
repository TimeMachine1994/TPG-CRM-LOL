<script lang="ts">
  import type { PageData } from './$types';
  let { data }: PageData = $props();

  // Helper function to format dates
  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
</script>

<style>
  /* Custom Scrollbar for a sleeker look */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>

<!-- Dashboard Container -->
<div class="flex flex-col md:flex-row min-h-screen">
  
  <!-- Sidebar - Fixed on desktop, collapsible on mobile -->
  <aside class="bg-gray-900 text-white w-full md:w-64 p-6 md:p-8 space-y-8 flex-shrink-0 shadow-xl md:sticky md:top-0 md:h-screen overflow-y-auto">
    <div class="flex items-center justify-between md:justify-start">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-400 mr-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9h-3M8 21h8m-4 0v-5m-5 0h8a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span class="text-2xl font-extrabold text-blue-200">CourtConnect</span>
      </div>
      <!-- Mobile menu button (optional, for future JS implementation) -->
      <button class="md:hidden text-white focus:outline-none">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <nav class="mt-8">
      <ul class="space-y-3">
        <li>
          <a href="/dashboard" class="flex items-center p-3 text-lg font-medium text-blue-100 bg-blue-700/50 hover:bg-blue-600 rounded-xl transition-all duration-200 ease-in-out shadow-md transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm14 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm14 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </a>
        </li>
        <li>
          <a href="/cases" class="flex items-center p-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl transition-all duration-200 ease-in-out transform hover:translate-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16h.01" />
            </svg>
            Cases
          </a>
        </li>
        <li>
          <a href="/courts" class="flex items-center p-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl transition-all duration-200 ease-in-out transform hover:translate-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Courts
          </a>
        </li>
        <li>
          <a href="/depositions" class="flex items-center p-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl transition-all duration-200 ease-in-out transform hover:translate-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7v.01M12 7v.01M16 7v.01M12 12v.01M12 16v.01M16 12v.01M16 16v.01M8 12v.01M8 16v.01" />
            </svg>
            Depositions
          </a>
        </li>
        <li>
          <a href="/archival" class="flex items-center p-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl transition-all duration-200 ease-in-out transform hover:translate-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            Archival
          </a>
        </li>
      </ul>
    </nav>
  </aside>

  <!-- Main Content Area -->
  <main class="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-8 pb-2 border-b-4 border-blue-500">Dashboard Overview</h1>

    <!-- Stats Cards Section -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <!-- Card 1: Total Cases -->
      <div class="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center justify-between border border-gray-100 transform hover:-translate-y-1">
        <div>
          <p class="text-base font-medium text-gray-600">Total Cases</p>
          <p class="mt-2 text-4xl font-extrabold text-blue-700">{data.totalCases}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-blue-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16h.01" />
        </svg>
      </div>
      
      <!-- Card 2: Active Cases -->
      <div class="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center justify-between border border-gray-100 transform hover:-translate-y-1">
        <div>
          <p class="text-base font-medium text-gray-600">Active Cases</p>
          <p class="mt-2 text-4xl font-extrabold text-green-700">{data.activeCases}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-green-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8m-2-5a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      <!-- Card 3: Upcoming Depositions -->
      <div class="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center justify-between border border-gray-100 transform hover:-translate-y-1">
        <div>
          <p class="text-base font-medium text-gray-600">Upcoming Depositions</p>
          <p class="mt-2 text-4xl font-extrabold text-yellow-700">{data.upcomingDepositions.length}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-yellow-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h8m-10 4h.01M15 16h.01M9 16h.01" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      <!-- Card 4: Archived Cases -->
      <div class="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center justify-between border border-gray-100 transform hover:-translate-y-1">
        <div>
          <p class="text-base font-medium text-gray-600">Archived Cases</p>
          <p class="mt-2 text-4xl font-extrabold text-red-700">0</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-red-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      </div>
    </section>

    <!-- Recent Activity / Data Tables Section -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- Recent Cases Table -->
      <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Recent Cases</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-blue-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tl-xl">Case Name</th>
                <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Court</th>
                <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tr-xl">Last Updated</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              {#each data.recentCases as caseItem}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{caseItem.case_name}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.court_name}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      {caseItem.status === 'Open' ? 'bg-green-100 text-green-800' :
                       caseItem.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                       'bg-red-100 text-red-800'}">
                      {caseItem.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(caseItem.last_update_timestamp)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Upcoming Depositions / Calendar Placeholder -->
      <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Upcoming Depositions</h2>
        <div class="h-64 overflow-y-auto border-2 border-dashed border-gray-300 rounded-lg p-4">
          {#if data.upcomingDepositions.length > 0}
            <ul class="space-y-3">
              {#each data.upcomingDepositions as deposition}
                <li class="bg-blue-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
                  <div>
                    <p class="text-sm font-semibold text-gray-800">{deposition.depo_type} - {deposition.case_name}</p>
                    <p class="text-xs text-gray-600">{formatDate(deposition.depo_date)} at {deposition.depo_time}</p>
                  </div>
                  <span class="text-xs font-medium text-blue-600">{deposition.court_name}</span>
                </li>
              {/each}
            </ul>
          {:else}
            <div class="flex items-center justify-center h-full text-gray-500 text-lg">
              <p>No upcoming depositions.</p>
            </div>
          {/if}
        </div>
        <button class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-colors duration-200 transform hover:scale-105">
          View All Depositions
        </button>
      </div>

    </section>

    <!-- Workflow Status Section (Placeholder) -->
    <section class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mt-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Workflow Status Overview</h2>
      <div class="h-48 flex items-center justify-center text-gray-500 text-lg border-2 border-dashed border-gray-300 rounded-lg p-4">
        <p>Workflow tracking and progress bars will be displayed here</p>
      </div>
    </section>

  </main>

</div>