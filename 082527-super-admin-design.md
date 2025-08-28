# Super Admin Page Design for Trial Organizer

This document outlines the design for a "master debugger/super admin" page, providing comprehensive CRUD (Create, Read, Update, Delete) capabilities for all data entities defined in the `082527-plan-for-data.md` schema.

## 1. Conceptual Layout and Navigation

The super admin page will feature a clear, persistent sidebar navigation on the left, allowing users to switch between managing different data entities. The main content area will display the selected entity's data.

**Navigation Elements (Sidebar):**

*   **Courts**
*   **Courtroom Technology**
*   **Courtroom Technology Junction**
*   **Firms**
*   **Attorneys**
*   **Users**
*   **Case Types**
*   **Cases**
*   **Case Attorneys Junction**
*   **Archival**
*   **Workflow Steps**
*   **Case Workflow Status**
*   **Trials**
*   **Equipment**
*   **Archival Equipment Junction**
*   **Trial Equipment Junction**
*   **Clients**
*   **Depositions**
*   **Deposition Files**

## 2. Data Presentation and CRUD Actions

For each data entity, the main content area will present a list/table view of existing records. Clicking on a record or an "Add New" button will transition to a detailed form view for creating or editing a single record.

### General Presentation (List/Table View)

*   **Table Structure:** Each entity will be displayed in a sortable, filterable table.
*   **Key Columns:** Essential identifying columns (e.g., `court_name`, `case_id`, `firm_name`) will be visible by default.
*   **Pagination:** For entities with many records, pagination will be implemented.
*   **Search/Filter:** A search bar and filter options will allow users to quickly find specific records.

### General CRUD Actions

*   **Create:** "Add New [Entity]" button (e.g., "Add New Court") will navigate to an empty form for new record creation.
*   **Read/Update:** Clicking on a row in the table or an "Edit" button will navigate to a pre-filled form for viewing/editing the selected record.
*   **Delete:** A "Delete" button (often an icon) will be available for each record in the table view, with a confirmation dialog to prevent accidental deletion.

### Entity-Specific Details

#### 1. Courts
*   **Presentation:** Table with `court_id`, `court_name`, `city`, `state`.
*   **Form:** Fields for all columns, including boolean toggles for courtroom technology.
*   **CRUD:** Add New Court, View/Edit Court Details, Delete Court.

#### 2. Courtroom_Technology
*   **Presentation:** Table with `tech_id`, `tech_name`, `description`.
*   **Form:** Fields for `tech_id`, `tech_name`, `description`.
*   **CRUD:** Add New Technology, View/Edit Technology Details, Delete Technology.

#### 3. Courtroom_Technology_Junction
*   **Presentation:** Table with `court_id`, `tech_id`, `quantity`, `notes`.
*   **Form:** Dropdowns for `court_id` and `tech_id`, input for `quantity`, textarea for `notes`.
*   **CRUD:** Add New Court-Tech Link, View/Edit Court-Tech Link, Delete Court-Tech Link.

#### 4. Firms
*   **Presentation:** Table with `firm_id`, `firm_name`, `phone`, `website`.
*   **Form:** Fields for all columns.
*   **CRUD:** Add New Firm, View/Edit Firm Details, Delete Firm.

#### 5. Attorneys
*   **Presentation:** Table with `attorney_id`, `attorney_name`, `firm_id` (displaying firm name).
*   **Form:** Fields for `attorney_id`, `attorney_name`, dropdown for `firm_id`, input for `contact_info`.
*   **CRUD:** Add New Attorney, View/Edit Attorney Details, Delete Attorney.

#### 6. Users
*   **Presentation:** Table with `user_id`, `username`, `full_name`, `role`.
*   **Form:** Fields for all columns.
*   **CRUD:** Add New User, View/Edit User Details, Delete User.

#### 7. Case_Types
*   **Presentation:** Table with `case_type_id`, `type_name`, `description`.
*   **Form:** Fields for all columns.
*   **CRUD:** Add New Case Type, View/Edit Case Type Details, Delete Case Type.

#### 8. Cases
*   **Presentation:** Table with `case_id`, `case_name`, `case_type_id` (displaying type name), `start_date`, `end_date`, `firm_id` (displaying firm name), `court_id` (displaying court name), `tech_assigned_user_id` (displaying user name).
*   **Form:** Fields for all columns, including dropdowns for foreign keys.
*   **CRUD:** Add New Case, View/Edit Case Details, Delete Case.

#### 9. Case_Attorneys_Junction
*   **Presentation:** Table with `case_id`, `attorney_id`.
*   **Form:** Dropdowns for `case_id` and `attorney_id`.
*   **CRUD:** Add New Case-Attorney Link, View/Edit Case-Attorney Link, Delete Case-Attorney Link.

#### 10. Archival
*   **Presentation:** Table with `archival_id`, `case_id`, `date_case_concluded`, `outcome`.
*   **Form:** Fields for all columns, dropdown for `case_id` and `concluding_attorney_id`.
*   **CRUD:** Add New Archival Record, View/Edit Archival Record, Delete Archival Record.

#### 11. Workflow_Steps
*   **Presentation:** Table with `step_id`, `step_name`, `description`, `step_order`.
*   **Form:** Fields for all columns.
*   **CRUD:** Add New Workflow Step, View/Edit Workflow Step Details, Delete Workflow Step.

#### 12. Case_Workflow_Status
*   **Presentation:** Table with `archival_id`, `step_id`, `is_completed`, `completion_date`, `completed_by_user_id`.
*   **Form:** Dropdowns for `archival_id`, `step_id`, `completed_by_user_id`, checkbox for `is_completed`, date picker for `completion_date`.
*   **CRUD:** Add New Workflow Status, View/Edit Workflow Status, Delete Workflow Status.

#### 13. Trials
*   **Presentation:** Table with `trial_id`, `case_id`, `trial_name_description`, `start_date`, `end_date`, `judge`, `outcome`.
*   **Form:** Fields for all columns, dropdowns for `case_id` and `court_id`.
*   **CRUD:** Add New Trial, View/Edit Trial Details, Delete Trial.

#### 14. Equipment
*   **Presentation:** Table with `equipment_id`, `equipment_name`, `type`, `description`.
*   **Form:** Fields for all columns.
*   **CRUD:** Add New Equipment, View/Edit Equipment Details, Delete Equipment.

#### 15. Archival_Equipment_Junction
*   **Presentation:** Table with `archival_id`, `equipment_id`, `quantity_used`, `notes`.
*   **Form:** Dropdowns for `archival_id` and `equipment_id`, input for `quantity_used`, textarea for `notes`.
*   **CRUD:** Add New Archival Equipment Link, View/Edit Archival Equipment Link, Delete Archival Equipment Link.

#### 16. Trial_Equipment_Junction
*   **Presentation:** Table with `trial_id`, `equipment_id`, `quantity_used`, `notes`.
*   **Form:** Dropdowns for `trial_id` and `equipment_id`, input for `quantity_used`, textarea for `notes`.
*   **CRUD:** Add New Trial Equipment Link, View/Edit Trial Equipment Link, Delete Trial Equipment Link.

#### 17. Clients
*   **Presentation:** Table with `client_id`, `client_name`, `contact_person`, `firm_id` (displaying firm name).
*   **Form:** Fields for all columns, dropdown for `firm_id`.
*   **CRUD:** Add New Client, View/Edit Client Details, Delete Client.

#### 18. Depositions
*   **Presentation:** Table with `deposition_id`, `client_id`, `case_id`, `deponent_name`, `depo_date`.
*   **Form:** Fields for all columns, dropdowns for `client_id` and `case_id`.
*   **CRUD:** Add New Deposition, View/Edit Deposition Details, Delete Deposition.

#### 19. Deposition_Files
*   **Presentation:** Table with `file_id`, `deposition_id`, `file_type`, `file_url`.
*   **Form:** Fields for all columns, dropdown for `deposition_id`.
*   **CRUD:** Add New Deposition File, View/Edit Deposition File Details, Delete Deposition File.

## 3. High-Level Security and Access Control Considerations

Given the powerful nature of this "master debugger/super admin" page, robust security and access control are paramount.

*   **Role-Based Access Control (RBAC):** Only users with a designated "Super Admin" role should have access to this page. This role should be distinct and granted with extreme caution.
*   **Authentication:** Strong authentication mechanisms (e.g., multi-factor authentication) should be enforced for super admin accounts.
*   **Auditing and Logging:** All CRUD operations performed on this page should be meticulously logged, including the user who performed the action, the timestamp, and the specific changes made. This is crucial for accountability and troubleshooting.
*   **Least Privilege:** Even within the super admin role, consider if certain sub-sections or actions can be further restricted if a more granular "master debugger" role is introduced in the future.
*   **Environment Separation:** This page should ideally only be accessible in development and staging environments, with extremely limited or no access in production, or behind very strict network/VPN controls.
*   **Input Validation:** Despite being an admin interface, all user inputs should still be validated to prevent data corruption or injection attacks.

## 4. Mermaid Diagram (Conceptual Page Flow)

```mermaid
graph TD
    A[Super Admin Dashboard] --> B{Select Data Entity}

    B --> C1[Courts List View]
    B --> C2[Courtroom Technology List View]
    B --> C3[Courtroom Technology Junction List View]
    B --> C4[Firms List View]
    B --> C5[Attorneys List View]
    B --> C6[Users List View]
    B --> C7[Case Types List View]
    B --> C8[Cases List View]
    B --> C9[Case Attorneys Junction List View]
    B --> C10[Archival List View]
    B --> C11[Workflow Steps List View]
    B --> C12[Case Workflow Status List View]
    B --> C13[Trials List View]
    B --> C14[Equipment List View]
    B --> C15[Archival Equipment Junction List View]
    B --> C16[Trial Equipment Junction List View]
    B --> C17[Clients List View]
    B --> C18[Depositions List View]
    B --> C19[Deposition Files List View]

    C1 --> D1_1[Add New Court Form]
    C1 --> D1_2[View/Edit Court Form]
    C1 --> D1_3[Delete Court Confirmation]

    C2 --> D2_1[Add New Courtroom Technology Form]
    C2 --> D2_2[View/Edit Courtroom Technology Form]
    C2 --> D2_3[Delete Courtroom Technology Confirmation]

    C3 --> D3_1[Add New Court-Tech Link Form]
    C3 --> D3_2[View/Edit Court-Tech Link Form]
    C3 --> D3_3[Delete Court-Tech Link Confirmation]

    C4 --> D4_1[Add New Firm Form]
    C4 --> D4_2[View/Edit Firm Form]
    C4 --> D4_3[Delete Firm Confirmation]

    C5 --> D5_1[Add New Attorney Form]
    C5 --> D5_2[View/Edit Attorney Form]
    C5 --> D5_3[Delete Attorney Confirmation]

    C6 --> D6_1[Add New User Form]
    C6 --> D6_2[View/Edit User Form]
    C6 --> D6_3[Delete User Confirmation]

    C7 --> D7_1[Add New Case Type Form]
    C7 --> D7_2[View/Edit Case Type Form]
    C7 --> D7_3[Delete Case Type Confirmation]

    C8 --> D8_1[Add New Case Form]
    C8 --> D8_2[View/Edit Case Form]
    C8 --> D8_3[Delete Case Confirmation]

    C9 --> D9_1[Add New Case-Attorney Link Form]
    C9 --> D9_2[View/Edit Case-Attorney Link Form]
    C9 --> D9_3[Delete Case-Attorney Link Confirmation]

    C10 --> D10_1[Add New Archival Record Form]
    C10 --> D10_2[View/Edit Archival Record Form]
    C10 --> D10_3[Delete Archival Record Confirmation]

    C11 --> D11_1[Add New Workflow Step Form]
    C11 --> D11_2[View/Edit Workflow Step Form]
    C11 --> D11_3[Delete Workflow Step Confirmation]

    C12 --> D12_1[Add New Workflow Status Form]
    C12 --> D12_2[View/Edit Workflow Status Form]
    C12 --> D12_3[Delete Workflow Status Confirmation]

    C13 --> D13_1[Add New Trial Form]
    C13 --> D13_2[View/Edit Trial Form]
    C13 --> D13_3[Delete Trial Confirmation]

    C14 --> D14_1[Add New Equipment Form]
    C14 --> D14_2[View/Edit Equipment Form]
    C14 --> D14_3[Delete Equipment Confirmation]

    C15 --> D15_1[Add New Archival Equipment Link Form]
    C15 --> D15_2[View/Edit Archival Equipment Link Form]
    C15 --> D15_3[Delete Archival Equipment Link Confirmation]

    C16 --> D16_1[Add New Trial Equipment Link Form]
    C16 --> D16_2[View/Edit Trial Equipment Link Form]
    C16 --> D16_3[Delete Trial Equipment Link Confirmation]

    C17 --> D17_1[Add New Client Form]
    C17 --> D17_2[View/Edit Client Form]
    C17 --> D17_3[Delete Client Confirmation]

    C18 --> D18_1[Add New Deposition Form]
    C18 --> D18_2[View/Edit Deposition Form]
    C18 --> D18_3[Delete Deposition Confirmation]

    C19 --> D19_1[Add New Deposition File Form]
    C19 --> D19_2[View/Edit Deposition File Form]
    C19 --> D19_3[Delete Deposition File Confirmation]

    D1_1, D1_2, D1_3 --> C1
    D2_1, D2_2, D2_3 --> C2
    D3_1, D3_2, D3_3 --> C3
    D4_1, D4_2, D4_3 --> C4
    D5_1, D5_2, D5_3 --> C5
    D6_1, D6_2, D6_3 --> C6
    D7_1, D7_2, D7_3 --> C7
    D8_1, D8_2, D8_3 --> C8
    D9_1, D9_2, D9_3 --> C9
    D10_1, D10_2, D10_3 --> C10
    D11_1, D11_2, D11_3 --> C11
    D12_1, D12_2, D12_3 --> C12
    D13_1, D13_2, D13_3 --> C13
    D14_1, D14_2, D14_3 --> C14
    D15_1, D15_2, D15_3 --> C15
    D16_1, D16_2, D16_3 --> C16
    D17_1, D17_2, D17_3 --> C17
    D18_1, D18_2, D18_3 --> C18
    D19_1, D19_2, D19_3 --> C19