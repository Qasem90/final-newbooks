// src/routes/+page.server.js
// Server-only code. Connects to Postgres. Never sent to the browser.

import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';

const sql = neon(DATABASE_URL);
git add .
git commit -m "3.5 - final commit, app complete"
git push origin main// SvelteKit calls this function whenever the page is requested.
// Whatever object we return becomes available to +page.svelte as `data`.
export async function load() {
  // Add this BELOW your load() function in +page.server.js.
  // 
  export const actions = {
  // 'default' runs when a form on the page is submitted with no action= attribute.
  default: async ({ request }) => {
    // 1. Get the form data the browser sent.
    const formData = await request.formData();
    const date        = formData.get('date');
    const description = formData.get('description');
    const debit       = formData.get('debit');
    const credit      = formData.get('credit');
    const amount      = formData.get('amount');

    // 2. TODO — write an INSERT that adds one row to the transactions table.
    //    Use the five values above. The id column auto-fills.

     await sql`
     INSERT INTO transactions (date, description, debit, credit, amount)
     VALUES (${date}, ${description}, ${debit}, ${credit}, ${amount})
`;

 // 3. Return success. SvelteKit will re-run load() automatically,
    //    so the page picks up the new row.
    return { success: true };
  }
};