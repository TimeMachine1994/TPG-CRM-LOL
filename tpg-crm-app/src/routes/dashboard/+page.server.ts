import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    const now = new Date();

    // Fetch all cases for total and recent cases
    const casesResponse = await fetch('/api/cases');
    const allCases = await casesResponse.json();

    // Fetch all depositions for upcoming depositions
    const depositionsResponse = await fetch('/api/depositions');
    const allDepositions = await depositionsResponse.json();

    // Calculate Total Cases
    const totalCases = allCases.length;

    // For Active Cases, we'll use total cases for now as per instructions
    const activeCases = totalCases; // Placeholder

    // Filter Upcoming Depositions
    const upcomingDepositions = allDepositions
        .filter((depo: any) => new Date(depo.depo_date) > now)
        .sort((a: any, b: any) => new Date(a.depo_date).getTime() - new Date(b.depo_date).getTime());

    // Sort Recent Cases by last_update_timestamp and limit to 5
    const recentCases = allCases
        .sort((a: any, b: any) => new Date(b.last_update_timestamp).getTime() - new Date(a.last_update_timestamp).getTime())
        .slice(0, 5);

    return {
        totalCases,
        activeCases,
        upcomingDepositions,
        recentCases
    };
};