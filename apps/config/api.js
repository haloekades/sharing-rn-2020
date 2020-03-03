// export const BASE_URL   = `https://jsonplaceholder.typicode.com`;
export const BASE_URL = 'http://www.mocky.io';
export const API_URL    = BASE_URL;
export const API        = {
    //user
    // users: `${API_URL}/users`,
    users: `/v2/5e3e360b33000080008b09a7`,

    //task
    allTask: `/v2/5e3e2ca033000080008b0993`,
    pendingTask: `/v2/5e3e2f6a3300002b008b0999`,
    approvedTask: `/v2/5e3e2fa433000063008b099b`,
    rejectedTask: `/v2/5e3e2fd5330000e7068b099d`,

    //approval
    allApproval: `/v2/5e3e32da3300006e008b09a3`,
    pendingApproval: `/v2/5e3e32b33300006e008b09a2`,
    approvedApproval: `/v2/5e3e323e330000e7068b09a1`,
    rejectedApproval: `/v2/5e3e320e330000e7068b09a0`,

}